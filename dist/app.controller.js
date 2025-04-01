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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppController = class AppController {
    constructor(connection, configService) {
        this.connection = connection;
        this.configService = configService;
    }
    testConnection() {
        try {
            const isConnected = this.connection.readyState === 1;
            if (isConnected) {
                return {
                    status: 'success',
                    message: 'Successfully connected to MongoDB Atlas',
                    connectionState: this.connection.readyState,
                };
            }
            else {
                return {
                    status: 'error',
                    message: 'Failed to connect to MongoDB Atlas',
                    connectionState: this.connection.readyState,
                };
            }
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Error connecting to MongoDB Atlas',
                error: error.message,
            };
        }
    }
    getHome() {
        return { message: 'API is running!' };
    }
    getEnvCheck() {
        return {
            database_username: this.configService.get('DB_USERNAME'),
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testConnection", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)('/env-check'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getEnvCheck", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        config_1.ConfigService])
], AppController);
//# sourceMappingURL=app.controller.js.map