import { Injectable } from '@nestjs/common';
import { ApiCallerService } from './api-caller.service';
import { VehicleType } from './enums/vehicle-type.enum';

@Injectable()
export class LicenseService {
    constructor(private readonly apiCallerService: ApiCallerService) { }

    async getViolations(licensePlate: string, type: VehicleType): Promise<any> {
        return await this.apiCallerService.callAPI(licensePlate, type);
    }
}
