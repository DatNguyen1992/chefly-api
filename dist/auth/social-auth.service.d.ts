import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { User } from '@users/schemas/user.schema';
import { SocialProvider } from './dto/social-auth.dto';
import { UsersService } from '@users/users.service';
import { AdminAuthDto } from './dto/admin-auth.dto';
import { LoginDto } from './dto/login.dto';
export declare class SocialAuthService {
    private userModel;
    private userService;
    private configService;
    private authService;
    private googleClient;
    constructor(userModel: Model<User>, userService: UsersService, configService: ConfigService, authService: AuthService);
    validateSocialLogin(provider: SocialProvider, token: string): Promise<import("./dto/auth.dto").TokensDto>;
    validateAdminLogin(adminAuthDto: AdminAuthDto): Promise<import("./dto/auth.dto").TokensDto>;
    validateLogin(loginDto: LoginDto): Promise<any>;
    private verifyGoogleToken;
}
