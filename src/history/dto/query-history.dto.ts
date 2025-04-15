import { QRType, SortType } from '@common/constants';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQuery } from '@shared/interfaces/base-query.interface';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryHistoryDto extends BaseQuery {
  @ApiPropertyOptional({ enum: QRType })
  @IsOptional()
  @IsEnum(QRType, {
    message: 'type must be either URL, PHONE, APPSTORE, CHPLAY or TEXT',
  })
  type: QRType;

  @ApiPropertyOptional({ enum: SortType })
  @IsOptional()
  @IsEnum(SortType, { message: 'sort must be either ASC or DESC' })
  sort?: SortType;
}
