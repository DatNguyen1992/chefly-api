import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto, TokensDto } from './dto/auth.dto';
import { UsersService } from '@users/users.service';
import { RedisService } from 'src/redis/redis.service';
import { User } from '@users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
    private redisService: RedisService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async handleOAuthLogin(profile: any): Promise<TokensDto> {
    let user = await this.userService.findOne({
      email: profile.email,
      provider: profile.provider,
    });

    if (!user) {
      user = await this.userService.create({
        email: profile.email,
        name: profile.name,
        provider: profile.provider,
        providerId: profile.providerId,
      });
      //TODO: create default folder
    }
    return this.generateTokens(user);
  }

  async refreshTokens(user: User): Promise<TokensDto> {
    const provider = user.provider || 'local';
    const tokenKeyPrefix = `${provider}_user`;

    await Promise.all([
      this.redisService.del(`${tokenKeyPrefix}:${user._id}:refresh_token`),
      this.redisService.del(`${tokenKeyPrefix}:${user._id}:access_token`),
    ]);

    return this.generateTokens(user);
  }

  async logout(userId: string, provider: string = 'local'): Promise<void> {
    const tokenKeyPrefix = `${provider}_user`;

    await Promise.all([
      this.redisService.del(`${tokenKeyPrefix}:${userId}:refresh_token`),
      this.redisService.del(`${tokenKeyPrefix}:${userId}:access_token`),
    ]);
  }

  async generateTokens(user: any): Promise<TokensDto> {
    const payload = {
      email: user.email,
      sub: user._id,
      provider: user.provider || 'local',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.accessToken.secret'),
        expiresIn: this.configService.get('jwt.accessToken.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.refreshToken.secret'),
        expiresIn: this.configService.get('jwt.refreshToken.expiresIn'),
      }),
    ]);

    // Store tokens in Redis with expiration
    const refreshTokenExpiry = this.configService.get(
      'jwt.refreshToken.expiresInSeconds',
    );
    const accessTokenExpiry = this.configService.get(
      'jwt.accessToken.expiresInSeconds',
    );

    // Use a consistent key format for all providers
    const tokenKeyPrefix = `${user.provider || 'local'}_user`;
    await Promise.all([
      this.redisService.set(
        `${tokenKeyPrefix}:${user._id}:refresh_token`,
        refreshToken,
        refreshTokenExpiry,
      ),
      this.redisService.set(
        `${tokenKeyPrefix}:${user._id}:access_token`,
        accessToken,
        accessTokenExpiry,
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
