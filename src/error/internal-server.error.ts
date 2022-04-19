import { BaseError } from './base.error';
import { ErrorType } from './error.type';

export class InternalServerError extends BaseError {
  constructor(message = 'Internal server error', code: '502', details?: string) {
    super(ErrorType.ServerError, message, details);
  }
}
