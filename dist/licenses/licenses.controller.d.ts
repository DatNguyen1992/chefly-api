import { LicenseService } from './licenses.service';
export declare class LicenseController {
    private readonly licenseService;
    constructor(licenseService: LicenseService);
    getLicenseViolations(licensePlate: string): Promise<{
        licensePlate: string;
        violations: any;
    }>;
}
