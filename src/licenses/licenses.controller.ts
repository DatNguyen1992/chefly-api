import {
    Controller,
    Get,
    Query,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { LicenseService } from './licenses.service';
import { ApiQuery } from '@nestjs/swagger';
import { VehicleType } from './enums/vehicle-type.enum';

@Controller('licenses')
export class LicenseController {
    constructor(private readonly licenseService: LicenseService) { }

    @Get()
    @ApiQuery({
        name: 'licensePlate',
        type: String,
        description: 'License plate number',
        required: true,
    })
    @ApiQuery({
        name: 'type',
        enum: VehicleType,
        description: 'Vehicle type (1 for Xe Hoi, 2 for Xe May)',
        required: true,
    })
    async getLicenseViolations(@Query('licensePlate') licensePlate: string, @Query('type') type: VehicleType,) {
        if (!licensePlate) {
            throw new HttpException(
                'License plate is required',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!type || !Object.values(VehicleType).includes(type)) {
            throw new HttpException(
                'Vehicle type must be 1 (Xe Hoi) or 2 (Xe May)',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const violations = await this.licenseService.getViolations(licensePlate, type);
            if (violations) {
                return { licensePlate, violations };
            } else {
                throw new HttpException('No violations found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
