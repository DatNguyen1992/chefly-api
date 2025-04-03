import { ApiProperty } from '@nestjs/swagger';
import { BaseQuery } from '@shared/interfaces/base-query.interface';
import { UserActive } from '@users/enums/user-active.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryUserDto extends BaseQuery {
  @ApiProperty({ enum: UserActive, required: false })
  @IsOptional()
  @IsEnum({ each: true, message: 'active must be either active or inactive' })
  active?: string;
}
