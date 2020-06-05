import { HttpStatus } from '@nestjs/common';
import { AppExceptionItem } from '../app.exception';
import { Errors } from '../errors';

export const OPERATIONS = {
  DEFAULT: {
    message: 'There was an error',
    code: 'ERR0001OPE',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    throw: () => {
      throw new Errors(OPERATIONS.DEFAULT);
    },
  } as AppExceptionItem,
  REGISTER_NOT_FOUND: {
    message: 'There was an error find register',
    code: 'ERR0002OPE',
    statusCode: HttpStatus.NOT_FOUND,
    throw: () => {
      throw new Errors(OPERATIONS.REGISTER_NOT_FOUND);
    },
  } as AppExceptionItem,
};
