import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, TokensDto } from './dto/auth.dto';
import { UsersService } from '@users/users.service';
import { RedisService } from 'src/redis/redis.service';
import { User } from '@users/schemas/user.schema';
export declare class AuthService {
    private jwtService;
    private configService;
    private userService;
    private redisService;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UsersService, redisService: RedisService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<TokensDto>;
    handleOAuthLogin(profile: any): Promise<TokensDto>;
    refreshTokens(user: User): Promise<TokensDto>;
    logout(userId: string, provider?: string): Promise<void>;
    generateTokens(user: any): Promise<TokensDto>;
}
