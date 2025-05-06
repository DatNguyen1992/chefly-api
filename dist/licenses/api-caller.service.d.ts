import { VehicleType } from './enums/vehicle-type.enum';
export declare class ApiCallerService {
    private readonly logger;
    private createAxiosInstance;
    private getCaptcha;
    private postFormData;
    private getViolationResults;
    callAPI(plate: string, type: VehicleType, retries?: number): Promise<any>;
}
