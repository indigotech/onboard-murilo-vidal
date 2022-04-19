import { BaseError } from './base.error';
import { ErrorType } from './error.type';

export class InvalidPasswordError extends BaseError {
  constructor(message = 'Password must be at least 6 characters long and alphanumeric', details?: string) {
    super(ErrorType.InvalidDataError, message, details);
  }
}
