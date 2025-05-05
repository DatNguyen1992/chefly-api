interface ResolutionPlace {
    name: string;
    address?: string;
}
interface TrafficViolation {
    licensePlate?: string;
    plateColor?: string;
    vehicleType?: string;
    violationTime?: string;
    violationLocation?: string;
    violationBehavior?: string;
    status?: string;
    detectionUnit?: string;
    resolutionPlaces?: ResolutionPlace[];
}
export declare class ExtractTrafficViolationsService {
    private readonly logger;
    extractTrafficViolations(html: string): TrafficViolation[];
}
export {};
