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
exports.LicenseController = void 0;
const common_1 = require("@nestjs/common");
const licenses_service_1 = require("./licenses.service");
let LicenseController = class LicenseController {
    constructor(licenseService) {
        this.licenseService = licenseService;
    }
    async getLicenseViolations(licensePlate) {
        if (!licensePlate) {
            throw new common_1.HttpException('License plate is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const violations = await this.licenseService.getViolations(licensePlate);
            if (violations) {
                return { licensePlate, violations };
            }
            else {
                throw new common_1.HttpException('No violations found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LicenseController = LicenseController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('licensePlate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "getLicenseViolations", null);
exports.LicenseController = LicenseController = __decorate([
    (0, common_1.Controller)('licenses'),
    __metadata("design:paramtypes", [licenses_service_1.LicenseService])
], LicenseController);
//# sourceMappingURL=licenses.controller.js.map