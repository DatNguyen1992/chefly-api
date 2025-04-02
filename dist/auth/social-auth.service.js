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
exports.SocialAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const google_auth_library_1 = require("google-auth-library");
const auth_service_1 = require("./auth.service");
const user_schema_1 = require("../users/schemas/user.schema");
const social_auth_dto_1 = require("./dto/social-auth.dto");
const users_service_1 = require("../users/users.service");
let SocialAuthService = class SocialAuthService {
    constructor(userModel, userService, configService, authService) {
        this.userModel = userModel;
        this.userService = userService;
        this.configService = configService;
        this.authService = authService;
        this.googleClient = new google_auth_library_1.OAuth2Client(this.configService.get('oauth.google.clientID'));
    }
    async validateSocialLogin(provider, token) {
        let socialUser;
        switch (provider) {
            case social_auth_dto_1.SocialProvider.GOOGLE:
                socialUser = await this.verifyGoogleToken(token);
                break;
            default:
                throw new common_1.UnauthorizedException('Invalid provider');
        }
        if (!socialUser) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        let user = await this.userModel.findOne({
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
        return this.authService.generateTokens(user);
    }
    async verifyGoogleToken(token) {
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid Google token');
        }
    }
};
exports.SocialAuthService = SocialAuthService;
exports.SocialAuthService = SocialAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        config_1.ConfigService,
        auth_service_1.AuthService])
], SocialAuthService);
//# sourceMappingURL=social-auth.service.js.map