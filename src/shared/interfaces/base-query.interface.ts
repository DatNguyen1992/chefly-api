import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class BaseQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  filter?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  sort?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (value) return value.trim();
  })
  @IsOptional()
  search?: string;
}
