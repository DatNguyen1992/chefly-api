import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokensDto } from './dto/auth.dto';
import { SocialAuthDto } from './dto/social-auth.dto';
import { SocialAuthService } from './social-auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.auth';
import { GetUser } from '@common/decorators/get-user.decorator';
import { User } from '@users/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminAuthDto } from './dto/admin-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly socialAuthService: SocialAuthService,
  ) {}

  @Post('social/login')
  @ApiOperation({
    summary: 'Login with social provider token, except IOS facebook login',
  })
  async socialLogin(@Body() socialAuthDto: SocialAuthDto) {
    return this.socialAuthService.validateSocialLogin(
      socialAuthDto.provider,
      socialAuthDto.token,
    );
  }

  @Post('admin/login')
  @ApiOperation({
    summary: 'Login with admin credentials',
  })
  async adminLogin(@Body() adminAuthDto: AdminAuthDto) {
    return this.socialAuthService.validateAdminLogin(adminAuthDto);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    return this.authService.handleOAuthLogin(req.user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, type: TokensDto })
  async refreshTokens(@GetUser() user: User): Promise<TokensDto> {
    return this.authService.refreshTokens(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user from any authentication method' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  async logout(@GetUser() user: User) {
    await this.authService.logout(user.id, user.provider);
    return { message: 'Logged out successfully' };
  }
}
