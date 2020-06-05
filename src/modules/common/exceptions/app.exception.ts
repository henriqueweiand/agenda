import { HttpStatus } from '@nestjs/common';
import { Errors } from './errors';

export class AppExceptionItem {
  readonly message: string;
  readonly code: number | string;
  readonly statusCode: number;
  throw?(): void;
}

export class AppException extends Errors {
  constructor(
    exception?: AppExceptionItem,
    exceptionClass?: AppException | Errors,
  ) {
    super();

    // When the throw function is called from module's exception class, this code will be executed
    if (exception && exceptionClass) {
      this._exception = this.generateCode(exception, exceptionClass);
    }
  }

  // This method will generate the code using the following rule:
  // 1 - This will use ERROR_CODE environment variable
  // 2 - This will use the code from the exception called and transform that on a string of four digits
  // 3 - This will use the name of exception class called and transform that on a string of three digits with the first letters of the class name
  generateCode(
    exception: AppExceptionItem,
    exceptionClass: AppException | Errors,
  ): AppExceptionItem {
    if (typeof exception.code === 'number') {
      let suffix = exceptionClass.constructor.name
        .toString()
        .substring(0, 3)
        .toUpperCase()
        .padStart(3, '_');

      const code: string = `${
        process.env.ERROR_CODE
      }${exception.code.toString().padStart(4, '0')}${suffix}`;

      return { ...exception, code };
    }

    return exception;
  }

  // It is used to put throw function inside module's exception class
  protected initExceptions(exceptionClass) {
    Object.getOwnPropertyNames(exceptionClass).map((prop: any) => {
      if (typeof exceptionClass[prop] === 'object') {
        exceptionClass[prop].throw = this.generateThrowFunction(
          exceptionClass,
          prop,
        );
      }
    });
  }

  // Throw function of module's exception class
  private generateThrowFunction(exceptionClass: AppException, prop: string) {
    return () => {
      throw new AppException(exceptionClass[prop], exceptionClass);
    };
  }
}
