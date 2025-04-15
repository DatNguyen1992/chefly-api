import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { QueryHistoryDto } from './dto/query-history.dto';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    create(id: string, createHistoryDto: CreateHistoryDto): Promise<import("./schemas/history.schema").History>;
    getList(id: string, query: QueryHistoryDto): Promise<import("../shared/interfaces/data.interface").PaginationData<import("./schemas/history.schema").History>>;
    deleteAll(userId: string): Promise<void>;
    delete(id: string, userId: string): Promise<import("mongodb").DeleteResult>;
}
