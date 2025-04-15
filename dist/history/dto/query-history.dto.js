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
exports.QueryHistoryDto = void 0;
const constants_1 = require("../../common/constants");
const swagger_1 = require("@nestjs/swagger");
const base_query_interface_1 = require("../../shared/interfaces/base-query.interface");
const class_validator_1 = require("class-validator");
class QueryHistoryDto extends base_query_interface_1.BaseQuery {
}
exports.QueryHistoryDto = QueryHistoryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.QRType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.QRType, {
        message: 'type must be either URL, PHONE, APPSTORE, CHPLAY or TEXT',
    }),
    __metadata("design:type", String)
], QueryHistoryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.SortType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.SortType, { message: 'sort must be either ASC or DESC' }),
    __metadata("design:type", String)
], QueryHistoryDto.prototype, "sort", void 0);
//# sourceMappingURL=query-history.dto.js.map