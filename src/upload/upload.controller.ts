import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  // API upload file
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const url = await this.uploadService.uploadFile(file);
    return { url };
  }

  // API upload base64
  @Post('base64')
  async uploadBase64(@Body('base64') base64: string): Promise<{ url: string }> {
    if (!base64) {
      throw new BadRequestException('No base64 string provided');
    }
    const url = await this.uploadService.uploadBase64(base64);
    return { url };
  }
}
