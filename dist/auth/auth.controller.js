"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const social_auth_dto_1 = require("./dto/social-auth.dto");
const social_auth_service_1 = require("./social-auth.service");
const jwt_refresh_auth_1 = require("./guards/jwt-refresh.auth");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const admin_auth_dto_1 = require("./dto/admin-auth.dto");
const login_dto_1 = require("./dto/login.dto");
let AuthController = class AuthController {
    constructor(authService, socialAuthService) {
        this.authService = authService;
        this.socialAuthService = socialAuthService;
    }
    async socialLogin(socialAuthDto) {
        return this.socialAuthService.validateSocialLogin(socialAuthDto.provider, socialAuthDto.token);
    }
    async adminLogin(adminAuthDto) {
        return this.socialAuthService.validateAdminLogin(adminAuthDto);
    }
    async login(loginDto) {
        return this.socialAuthService.validateLogin(loginDto);
    }
    async googleAuthCallback(req) {
        return this.authService.handleOAuthLogin(req.user);
    }
    async refreshTokens(user) {
        return this.authService.refreshTokens(user);
    }
    async logout(user) {
        await this.authService.logout(user.id, user.provider);
        return { message: 'Logged out successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('social/login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login with social provider token, except IOS facebook login',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [social_auth_dto_1.SocialAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "socialLogin", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login with admin credentials',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_auth_dto_1.AdminAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login with admin credentials',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_auth_1.JwtRefreshGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token using refresh token' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: auth_dto_1.TokensDto }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user from any authentication method' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User logged out successfully' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        social_auth_service_1.SocialAuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map