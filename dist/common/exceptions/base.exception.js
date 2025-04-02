"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidFileUploadException = exports.NotFoundException = exports.UnauthorizedException = exports.BadRequestException = exports.BaseException = void 0;
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(message = 'INTERNAL_SERVER_ERROR', status = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message, status);
    }
}
exports.BaseException = BaseException;
class BadRequestException extends common_1.HttpException {
    constructor(message = 'BAD_REQUEST', status = common_1.HttpStatus.BAD_REQUEST) {
        super(message, status);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends BaseException {
    constructor(message = 'UNAUTHORIZED') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class NotFoundException extends BaseException {
    constructor(resource) {
        super(`${resource} not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class InvalidFileUploadException extends BaseException {
    constructor() {
        super(constants_1.ERROR_CODE.INVALID_FILE_UPLOAD, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidFileUploadException = InvalidFileUploadException;
//# sourceMappingURL=base.exception.js.map