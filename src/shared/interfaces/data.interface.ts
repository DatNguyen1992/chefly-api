import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PaginationData<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  totalInList: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ description: 'Data' })
  @IsArray()
  data: T[];
}

export class DataFilter<T> {
  condition?: Partial<T> | object;
  limit?: number = 20;
  page?: number = 1;
  selectCols?: string[];
  sort?: any;
  population?: PopulationQuery[];
}

export class PopulationQuery {
  path: string;
  select?: string;
  populate?: PopulationQuery[];
  match?: any;
}
