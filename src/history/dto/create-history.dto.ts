import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QRType } from '@common/constants';

export class CreateHistoryDto {
  @ApiPropertyOptional({ enum: QRType })
  @IsNotEmpty()
  @IsEnum(QRType, {
    message: 'type must be either URL, PHONE, APPSTORE, CHPLAY or TEXT',
  })
  type: QRType;

  @ApiPropertyOptional({ required: true })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiPropertyOptional({ required: true })
  @IsNotEmpty()
  @IsString()
  qr: string;
}
