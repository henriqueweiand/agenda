import { HttpStatus } from '@nestjs/common';
import { AppExceptionItem } from '../app.exception';
import { Errors } from '../errors';

export const DATABASE = {
  DEFAULT: {
    message: 'There was an database error',
    code: 'ERR0001DTB',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    throw: () => {
      throw new Errors(DATABASE.DEFAULT);
    },
  } as AppExceptionItem,
};
