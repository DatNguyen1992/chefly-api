import { BaseRepository } from '@shared/repositories/base.repository';
import { History } from './schemas/history.schema';
import { DeleteResult, Model } from 'mongoose';
import { PaginationData } from '@shared/interfaces/data.interface';
import { QueryHistoryDto } from './dto/query-history.dto';
import { CreateHistoryDto } from './dto/create-history.dto';
export declare class HistoryService extends BaseRepository<History> {
    private historyModel;
    constructor(historyModel: Model<History>);
    findHistoryPage(user: string, query: QueryHistoryDto): Promise<PaginationData<History>>;
    createHistory(user: string, createHistoryDto: CreateHistoryDto): Promise<History>;
    remove(id: string, user: string): Promise<DeleteResult>;
    removeAll(user: string): Promise<void>;
}
