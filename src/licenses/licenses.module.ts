import { Module } from '@nestjs/common';
import { LicenseService } from './licenses.service';
import { LicenseController } from './licenses.controller';
import { ApiCallerService } from './api-caller.service';
import { ExtractTrafficViolationsService } from './extract-traffic-violations.service';

@Module({
  providers: [
    LicenseService,
    ApiCallerService,
    ExtractTrafficViolationsService,
  ],
  controllers: [LicenseController],
})
export class LicensesModule {}
