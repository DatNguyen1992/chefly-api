import {
  Model,
  Document,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import type { BulkWriteResult } from 'mongodb';
import { PaginationData } from '../interfaces/data.interface';
import { DataFilter } from '../interfaces/data.interface';

export abstract class BaseRepository<T> {
  private _model: Model<Document>;
  private LIMIT_DEFAULT = 25;

  constructor(schemaModel) {
    this._model = schemaModel;
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this._model(data);
    return (await entity.save()) as T;
  }

  async insert(createDto: Partial<T>): Promise<T> {
    const createdEntity = new this._model(createDto);
    return (await createdEntity.save()).toJSON() as T;
  }

  async updateMany(condition: Partial<T>, updateDto: Partial<T>) {
    return await this._model.updateMany(condition, updateDto, { new: true });
  }

  async saveAll(entities: Document[]): Promise<BulkWriteResult> {
    return await this._model.bulkSave(entities);
  }

  async update(id: string, updateDto: any): Promise<T> {
    return await this._model.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true },
  ): Promise<T> {
    return this._model.findOneAndUpdate(filter, update, options);
  }

  async updateById(
    id: string,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true },
  ): Promise<T> {
    return this._model.findByIdAndUpdate(id, update, options);
  }

  async findById(id: string): Promise<T> {
    return await this._model.findById(id);
  }

  async findOne(condition: Partial<T>): Promise<T> {
    return await this._model.findOne(condition);
  }

  async findAll(): Promise<T[]> {
    return await this._model.find();
  }

  async findBy(condition: Partial<T>): Promise<T[]> {
    return await this._model.find(condition);
  }

  async find(where: FilterQuery<T>): Promise<T[]> {
    return await this._model.find(where);
  }

  async delete(id: string): Promise<T> {
    return await this._model.findByIdAndDelete(id);
  }

  async softDelete(id: string): Promise<T> {
    return await this._model.findByIdAndDelete(id, { new: true });
  }

  async findPage(filter: DataFilter<T>): Promise<PaginationData<T>> {
    try {
      // eslint-disable-next-line prefer-const
      let { condition, page, limit, selectCols, population, sort } = filter;
      if (!sort || !Object.keys(sort).length) {
        sort = {
          // _id: -1,
          createdAt: -1,
        };
      }
      if (!limit) {
        limit = this.LIMIT_DEFAULT;
      }
      if (!page) {
        page = 1;
      }
      limit = limit != 0 ? limit : limit;
      const skip = page != 0 && page != 1 ? (page - 1) * limit : page - 1;
      const totalCount = await this._model.countDocuments(condition);
      const totalPage = Math.ceil(totalCount / limit);
      const query = this._model.find(condition);
      if (selectCols && selectCols.length) {
        query.select(selectCols);
      }
      if (population && population.length) {
        query.populate(population);
      }
      const documents = await query.sort(sort).skip(skip).limit(limit).exec();
      return this.createTableObject(
        page,
        limit,
        documents as T[],
        totalCount,
        totalPage,
      );
    } catch (error) {
      throw error;
    }
  }

  async getByAggregate(aggregate: any[]) {
    let documents = [];
    if (aggregate && aggregate.length) {
      documents = await this._model.aggregate(aggregate).exec();
    }
    return documents;
  }

  createTableObject(
    page: number,
    limit: number,
    documents: T[],
    totalCount: number,
    totalPage: number,
  ): PaginationData<T> {
    const objectListData: PaginationData<T> = {
      page: page,
      limit,
      totalCount: totalCount,
      totalInList: documents.length,
      data: documents,
      totalPage,
    };
    return objectListData;
  }
}
