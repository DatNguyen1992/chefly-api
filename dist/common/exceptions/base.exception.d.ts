import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BaseException extends HttpException {
    constructor(message?: string, status?: HttpStatus);
}
export declare class BadRequestException extends HttpException {
    constructor(message?: string, status?: HttpStatus);
}
export declare class UnauthorizedException extends BaseException {
    constructor(message?: string);
}
export declare class NotFoundException extends BaseException {
    constructor(resource: string);
}
export declare class InvalidFileUploadException extends BaseException {
    constructor();
}
