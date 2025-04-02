import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from './auth.service';
import { User } from '@users/schemas/user.schema';
import { SocialProvider } from './dto/social-auth.dto';
import { UsersService } from '@users/users.service';
import { AdminAuthDto } from './dto/admin-auth.dto';

@Injectable()
export class SocialAuthService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UsersService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get('oauth.google.clientID'),
    );
  }

  async validateSocialLogin(provider: SocialProvider, token: string) {
    let socialUser;

    switch (provider) {
      case SocialProvider.GOOGLE:
        socialUser = await this.verifyGoogleToken(token);
        break;
      default:
        throw new UnauthorizedException('Invalid provider');
    }
    if (!socialUser) {
      throw new UnauthorizedException('Invalid token');
    }
    // Find existing user or create new one
    let user: User = await this.userModel.findOne({
      providerId: socialUser.id || socialUser.sub,
      provider,
    });
    if (!user) {
      user = await this.userService.create({
        email: socialUser.email ?? '',
        name: socialUser.name || 'Apple User',
        provider,
        providerId: socialUser.id || socialUser.sub,
      });
    }
    // Generate JWT tokens
    return this.authService.generateTokens(user);
  }

  async validateAdminLogin(adminAuthDto: AdminAuthDto) {
    // Find existing user or create new one
    const user: User = await this.userModel.findOne({
      email: adminAuthDto.email,
      password: adminAuthDto.password,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // Generate JWT tokens
    return this.authService.generateTokens(user);
  }

  private async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
      });
      const payload = ticket.getPayload();
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
