import { GraphQLFormattedError } from 'graphql';
import { ArgumentValidationError } from 'type-graphql';
import { DuplicateEmailError } from './duplicate-email.error';
import { InvalidPasswordError } from './invalid-password.error';

export interface ServerError extends GraphQLFormattedError {
  code?: number;
  requestId?: string;
  name?: string;
  details?: ArgumentValidationError | string;
}
export function ErrorHandler(error: { message: string }): ServerError {
  if (/(duplicate key)[\s\S]/.test(error.message)) {
    return new DuplicateEmailError();
  } else {
    return new InvalidPasswordError();
  }
}
