import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FacebookDataDeletionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signed_request: string;
}
