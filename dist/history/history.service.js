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
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("../shared/repositories/base.repository");
const history_schema_1 = require("./schemas/history.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const data_interface_1 = require("../shared/interfaces/data.interface");
const constants_1 = require("../common/constants");
let HistoryService = class HistoryService extends base_repository_1.BaseRepository {
    constructor(historyModel) {
        super(historyModel);
        this.historyModel = historyModel;
    }
    async findHistoryPage(user, query) {
        const dataFilter = new data_interface_1.DataFilter();
        if (query?.limit) {
            dataFilter.limit = query?.limit;
        }
        if (query?.page) {
            dataFilter.page = query?.page;
        }
        dataFilter.condition = {
            user,
            ...(query?.type && {
                type: query?.type,
            }),
            ...(query?.search && {
                name: { $regex: query?.search, $options: 'i' },
            }),
        };
        if (query?.sort) {
            dataFilter.sort = {
                createdAt: query?.sort === constants_1.SortType.ASC ? 'asc' : 'desc',
            };
        }
        return this.findPage(dataFilter);
    }
    async createHistory(user, createHistoryDto) {
        const history = await this.historyModel.create({
            user,
            ...createHistoryDto,
        });
        if (!history) {
            throw new common_1.NotFoundException('History not found');
        }
        return history;
    }
    async remove(id, user) {
        const history = await this.historyModel.deleteOne({
            _id: id,
            user,
        });
        return history;
    }
    async removeAll(user) {
        await this.historyModel.deleteMany({
            user,
        });
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(history_schema_1.History.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], HistoryService);
//# sourceMappingURL=history.service.js.map