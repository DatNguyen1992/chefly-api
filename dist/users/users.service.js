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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const base_repository_1 = require("../shared/repositories/base.repository");
const date_utils_1 = require("../common/utils/date.utils");
let UsersService = class UsersService extends base_repository_1.BaseRepository {
    constructor(userModel) {
        super(userModel);
        this.userModel = userModel;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({
            email,
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        });
        if (!user) {
            return null;
        }
        return user;
    }
    async findAllUser() {
        const user = await this.userModel.find({
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        });
        if (!user) {
            return null;
        }
        return user;
    }
    async create(entities) {
        const user = await this.userModel.create(entities);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, { ...updateUserDto, updatedAt: (0, date_utils_1.getCurrentDate)() }, { new: true });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async remove(id) {
        const result = await this.userModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async findAll() {
        const users = await this.userModel.find({
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        });
        if (!users) {
            throw new common_1.NotFoundException('User not found');
        }
        return users;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map