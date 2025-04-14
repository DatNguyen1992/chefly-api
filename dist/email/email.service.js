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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const email_schema_1 = require("./schemas/email.schema");
let EmailService = class EmailService {
    constructor(tempEmailModel) {
        this.tempEmailModel = tempEmailModel;
        this.mg = (0, mailgun_js_1.default)({
            apiKey: '943400ecf659fd87022197efa4bd1a24-17c877d7-a972715e',
            domain: 'diaty.com',
        });
    }
    async generateEmail() {
        const randomId = Math.random().toString(36).substring(2, 10);
        const email = `${randomId}@diaty.com`;
        const newEmail = new this.tempEmailModel({ email, messages: [] });
        await newEmail.save();
        return email;
    }
    async getMessages(email) {
        const tempEmail = await this.tempEmailModel.findOne({ email });
        return tempEmail ? tempEmail.messages : [];
    }
    async getMessage(email, messageId) {
        const tempEmail = await this.tempEmailModel.findOne({ email });
        return tempEmail ? tempEmail.messages[parseInt(messageId)] : null;
    }
    async extendEmail(email) {
        await this.tempEmailModel.updateOne({ email }, { $set: { createdAt: new Date() } });
    }
    async deleteEmail(email) {
        await this.tempEmailModel.deleteOne({ email });
    }
    async receiveEmail(email, message) {
        await this.tempEmailModel.updateOne({ email }, { $push: { messages: { ...message, receivedAt: new Date() } } }, { upsert: true });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(email_schema_1.Email.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmailService);
//# sourceMappingURL=email.service.js.map