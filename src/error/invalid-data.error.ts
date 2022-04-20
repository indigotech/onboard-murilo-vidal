import { BaseError } from './base.error';
import { ErrorType } from './error.type';

export class InvalidDataError extends BaseError {
  constructor(message = 'Invalid data error.', details?: string) {
    super(ErrorType.InvalidDataError, message, details);
  }
}
