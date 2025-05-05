export declare class ApiCallerService {
    private readonly logger;
    private createAxiosInstance;
    private getCaptcha;
    private postFormData;
    private getViolationResults;
    callAPI(plate: string, retries?: number): Promise<any>;
}
