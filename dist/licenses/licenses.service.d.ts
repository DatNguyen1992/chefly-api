import { ApiCallerService } from './api-caller.service';
import { VehicleType } from './enums/vehicle-type.enum';
export declare class LicenseService {
    private readonly apiCallerService;
    constructor(apiCallerService: ApiCallerService);
    getViolations(licensePlate: string, type: VehicleType): Promise<any>;
}
