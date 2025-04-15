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
exports.HistoryController = void 0;
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const history_service_1 = require("./history.service");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const create_history_dto_1 = require("./dto/create-history.dto");
const query_history_dto_1 = require("./dto/query-history.dto");
let HistoryController = class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    create(id, createHistoryDto) {
        return this.historyService.createHistory(id, createHistoryDto);
    }
    getList(id, query) {
        return this.historyService.findHistoryPage(id, query);
    }
    deleteAll(userId) {
        return this.historyService.removeAll(userId);
    }
    delete(id, userId) {
        return this.historyService.remove(id, userId);
    }
};
exports.HistoryController = HistoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create history' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_history_dto_1.CreateHistoryDto]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get list history' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_history_dto_1.QueryHistoryDto]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "getList", null);
__decorate([
    (0, common_1.Delete)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete all history' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete current history' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "delete", null);
exports.HistoryController = HistoryController = __decorate([
    (0, swagger_1.ApiTags)('history'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('history'),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryController);
//# sourceMappingURL=history.controller.js.map