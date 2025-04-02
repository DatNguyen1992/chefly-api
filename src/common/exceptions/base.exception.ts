import { ERROR_CODE } from '@common/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string = 'INTERNAL_SERVER_ERROR',
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status);
  }
}

export class BadRequestException extends HttpException {
  constructor(
    message: string = 'BAD_REQUEST',
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, status);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'UNAUTHORIZED') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundException extends BaseException {
  constructor(resource: string) {
    super(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
}

export class InvalidFileUploadException extends BaseException {
  constructor() {
    super(ERROR_CODE.INVALID_FILE_UPLOAD, HttpStatus.BAD_REQUEST);
  }
}
