import { HttpStatus } from '@nestjs/common';
import { AppExceptionItem, AppException } from './app.exception';
import { DATABASE } from './errors/database.errors';
import { VALIDATIONS } from './errors/validation.errors';
import { OPERATIONS } from './errors/operation.errors';

export const DEFAULT_ERRORS = {
  DATABASE,
  VALIDATIONS,
  OPERATIONS,
  DEFAULT: {
    message: 'There was an unknown error',
    code: 'ERR0001DFT',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    throw: () => {
      throw new Errors(this.DEFAULT_ERRORS.DEFAULT);
    },
  } as AppExceptionItem,
};

export class Errors extends Error {
  protected _exception: AppExceptionItem;

  public DEFAULT_ERRORS = DEFAULT_ERRORS;

  constructor(exception?: AppExceptionItem) {
    super();

    if (exception) {
      this._exception = exception;
    }
  }

  get exception(): AppExceptionItem {
    return this._exception;
  }
}
