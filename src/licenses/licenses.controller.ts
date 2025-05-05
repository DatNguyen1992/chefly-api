import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { LicenseService } from './licenses.service';

@Controller('licenses')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  async getLicenseViolations(@Query('licensePlate') licensePlate: string) {
    if (!licensePlate) {
      throw new HttpException(
        'License plate is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const violations = await this.licenseService.getViolations(licensePlate);
      if (violations) {
        return { licensePlate, violations };
      } else {
        throw new HttpException('No violations found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
