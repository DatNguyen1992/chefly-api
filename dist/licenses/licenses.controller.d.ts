import { LicenseService } from './licenses.service';
import { VehicleType } from './enums/vehicle-type.enum';
export declare class LicenseController {
    private readonly licenseService;
    constructor(licenseService: LicenseService);
    getLicenseViolations(licensePlate: string, type: VehicleType): Promise<{
        licensePlate: string;
        violations: any;
    }>;
}
