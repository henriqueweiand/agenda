import { HttpStatus } from '@nestjs/common';
import { AppExceptionItem } from '../app.exception';
import { Errors } from '../errors';

export const VALIDATIONS = {
  DEFAULT: {
    message: 'There was an error',
    code: 'ERR0001VAL',
    statusCode: HttpStatus.BAD_REQUEST,
    throw: () => {
      throw new Errors(VALIDATIONS.DEFAULT);
    },
  } as AppExceptionItem,
};
