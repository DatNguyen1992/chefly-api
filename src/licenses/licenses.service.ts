import { Injectable } from '@nestjs/common';
import { ApiCallerService } from './api-caller.service';

@Injectable()
export class LicenseService {
  constructor(private readonly apiCallerService: ApiCallerService) {}

  async getViolations(licensePlate: string): Promise<any> {
    return await this.apiCallerService.callAPI(licensePlate);
  }
}
