import { BaseError } from './base.error';
import { ErrorType } from './error.type';

export class DuplicateEmailError extends BaseError {
  constructor(message = 'This email already exists.', details?: string) {
    super(ErrorType.InvalidDataError, message, details);
  }
}
