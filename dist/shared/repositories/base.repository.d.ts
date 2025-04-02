import { Document, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import type { BulkWriteResult } from 'mongodb';
import { PaginationData } from '../interfaces/data.interface';
import { DataFilter } from '../interfaces/data.interface';
export declare abstract class BaseRepository<T> {
    private _model;
    private LIMIT_DEFAULT;
    constructor(schemaModel: any);
    create(data: Partial<T>): Promise<T>;
    insert(createDto: Partial<T>): Promise<T>;
    updateMany(condition: Partial<T>, updateDto: Partial<T>): Promise<import("mongoose").UpdateWriteOpResult>;
    saveAll(entities: Document[]): Promise<BulkWriteResult>;
    update(id: string, updateDto: any): Promise<T>;
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions): Promise<T>;
    updateById(id: string, update: UpdateQuery<T>, options?: QueryOptions): Promise<T>;
    findById(id: string): Promise<T>;
    findOne(condition: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findBy(condition: Partial<T>): Promise<T[]>;
    find(where: FilterQuery<T>): Promise<T[]>;
    delete(id: string): Promise<T>;
    softDelete(id: string): Promise<T>;
    findPage(filter: DataFilter<T>): Promise<PaginationData<T>>;
    getByAggregate(aggregate: any[]): Promise<any[]>;
    createTableObject(page: number, limit: number, documents: T[], totalCount: number, totalPage: number): PaginationData<T>;
}
