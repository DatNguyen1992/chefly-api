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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_query_interface_1 = require("../../shared/interfaces/base-query.interface");
const user_active_enum_1 = require("../enums/user-active.enum");
const class_validator_1 = require("class-validator");
class QueryUserDto extends base_query_interface_1.BaseQuery {
}
exports.QueryUserDto = QueryUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_active_enum_1.UserActive, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)({ each: true, message: 'active must be either active or inactive' }),
    __metadata("design:type", String)
], QueryUserDto.prototype, "active", void 0);
//# sourceMappingURL=query-user.dto.js.map