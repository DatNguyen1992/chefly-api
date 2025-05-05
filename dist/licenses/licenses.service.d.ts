import { ApiCallerService } from './api-caller.service';
export declare class LicenseService {
    private readonly apiCallerService;
    constructor(apiCallerService: ApiCallerService);
    getViolations(licensePlate: string): Promise<any>;
}
