import { BaseError } from './base.error';
import { ErrorType } from './error.type';

export class InternalServerError extends BaseError {
  constructor(message = 'Internal server error', details?: string) {
    super(ErrorType.ServerError, message, details);
  }
}
