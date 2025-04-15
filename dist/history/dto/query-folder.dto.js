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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFolderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const folder_type_enum_1 = require("../enums/folder-type.enum");
const base_query_interface_1 = require("../../shared/interfaces/base-query.interface");
class QueryFolderDto extends base_query_interface_1.BaseQuery {
}
exports.QueryFolderDto = QueryFolderDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: folder_type_enum_1.FolderType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(folder_type_enum_1.FolderType, { message: 'type must be either NOTE or DIARY' }),
    __metadata("design:type", typeof (_a = typeof folder_type_enum_1.FolderType !== "undefined" && folder_type_enum_1.FolderType) === "function" ? _a : Object)
], QueryFolderDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: folder_type_enum_1.SortType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(folder_type_enum_1.SortType, { message: 'sort must be either ASC or DESC' }),
    __metadata("design:type", typeof (_b = typeof folder_type_enum_1.SortType !== "undefined" && folder_type_enum_1.SortType) === "function" ? _b : Object)
], QueryFolderDto.prototype, "sort", void 0);
//# sourceMappingURL=query-folder.dto.js.map