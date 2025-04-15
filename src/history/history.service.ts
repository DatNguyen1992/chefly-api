import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from '@shared/repositories/base.repository';
import { History } from './schemas/history.schema';
import { DeleteResult, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DataFilter, PaginationData } from '@shared/interfaces/data.interface';
import { QueryHistoryDto } from './dto/query-history.dto';
import { SortType } from '@common/constants';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService extends BaseRepository<History> {
  constructor(@InjectModel(History.name) private historyModel: Model<History>) {
    super(historyModel);
  }

  async findHistoryPage(
    user: string,
    query: QueryHistoryDto,
  ): Promise<PaginationData<History>> {
    const dataFilter = new DataFilter<History>();
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
        createdAt: query?.sort === SortType.ASC ? 'asc' : 'desc',
      };
    }

    return this.findPage(dataFilter);
  }

  async createHistory(
    user: string,
    createHistoryDto: CreateHistoryDto,
  ): Promise<History> {
    const history = await this.historyModel.create({
      user,
      ...createHistoryDto,
    });

    if (!history) {
      throw new NotFoundException('History not found');
    }
    return history;
  }

  async remove(id: string, user: string): Promise<DeleteResult> {
    const history = await this.historyModel.deleteOne({
      _id: id,
      user,
    });

    return history;
  }

  async removeAll(user: string): Promise<void> {
    await this.historyModel.deleteMany({
      user,
    });
  }
}
