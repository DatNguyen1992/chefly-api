import { AuthService } from './auth.service';
import { TokensDto } from './dto/auth.dto';
import { SocialAuthDto } from './dto/social-auth.dto';
import { SocialAuthService } from './social-auth.service';
import { User } from '@users/schemas/user.schema';
export declare class AuthController {
    private readonly authService;
    private readonly socialAuthService;
    constructor(authService: AuthService, socialAuthService: SocialAuthService);
    socialLogin(socialAuthDto: SocialAuthDto): Promise<TokensDto>;
    googleAuthCallback(req: any): Promise<TokensDto>;
    refreshTokens(user: User): Promise<TokensDto>;
    logout(user: User): Promise<{
        message: string;
    }>;
}
