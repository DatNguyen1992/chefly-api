"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const swagger_1 = require("@nestjs/swagger");
const crypto = __importStar(require("crypto"));
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async generateEmail() {
        return { email: await this.emailService.generateEmail() };
    }
    async getMessages(email) {
        return await this.emailService.getMessages(email);
    }
    async getMessage(email, messageId) {
        return await this.emailService.getMessage(email, messageId);
    }
    async extendEmail(email) {
        await this.emailService.extendEmail(email);
        return { message: 'Email extended' };
    }
    async deleteEmail(email) {
        await this.emailService.deleteEmail(email);
        return { message: 'Email deleted' };
    }
    async handleWebhook(body) {
        try {
            if (!body || typeof body !== 'object') {
                throw new common_1.BadRequestException('Invalid webhook payload');
            }
            if (!body.signature ||
                !body.signature.timestamp ||
                !body.signature.token ||
                !body.signature.signature) {
                throw new common_1.BadRequestException('Missing or invalid signature');
            }
            const apiKey = '943400ecf659fd87022197efa4bd1a24-17c877d7-a972715e';
            const signature = body.signature;
            console.log('Signature:', signature);
            const data = `${signature.timestamp}${signature.token}`;
            const hmac = crypto
                .createHmac('sha256', apiKey)
                .update(data)
                .digest('hex');
            if (hmac !== signature.signature) {
                throw new common_1.BadRequestException('Invalid webhook signature');
            }
            const { recipient, sender, subject, 'stripped-text': content } = body;
            if (!recipient || !sender || !subject) {
                throw new common_1.BadRequestException('Missing required fields: recipient, sender, or subject');
            }
            await this.emailService.receiveEmail(recipient, {
                from: sender,
                subject,
                content: content || '',
            });
            return { status: 'received' };
        }
        catch (error) {
            console.error('Webhook error:', error);
            throw error;
        }
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('generate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "generateEmail", null);
__decorate([
    (0, common_1.Get)(':email/messages'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)(':email/messages/:messageId'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getMessage", null);
__decorate([
    (0, common_1.Post)(':email/extend'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "extendEmail", null);
__decorate([
    (0, common_1.Delete)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "deleteEmail", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "handleWebhook", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('email'),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map