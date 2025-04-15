import { AuthService } from './auth.service';
import { TokensDto } from './dto/auth.dto';
import { SocialAuthDto } from './dto/social-auth.dto';
import { SocialAuthService } from './social-auth.service';
import { User } from '@users/schemas/user.schema';
import { AdminAuthDto } from './dto/admin-auth.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly socialAuthService;
    constructor(authService: AuthService, socialAuthService: SocialAuthService);
    socialLogin(socialAuthDto: SocialAuthDto): Promise<TokensDto>;
    adminLogin(adminAuthDto: AdminAuthDto): Promise<TokensDto>;
    login(loginDto: LoginDto): Promise<any>;
    googleAuthCallback(req: any): Promise<TokensDto>;
    refreshTokens(user: User): Promise<TokensDto>;
    logout(user: User): Promise<{
        message: string;
    }>;
}
