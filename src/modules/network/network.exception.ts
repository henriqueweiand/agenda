import { MappedExceptionItem } from 'nestjs-mapped-exception';
import { HttpStatus } from '@nestjs/common';

export class NetworkException {
    ALREADY_EXISTS: MappedExceptionItem = {
        message: 'already exists',
        code: 1,
        statusCode: HttpStatus.CONFLICT,
    };

    NOT_FOUND: MappedExceptionItem = {
        message: 'not found',
        code: 2,
        statusCode: HttpStatus.NOT_FOUND,
    };
}
