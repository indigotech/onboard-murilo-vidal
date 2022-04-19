import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ArgumentValidationError } from 'type-graphql';
import { DuplicateEmailError } from './duplicate-email.error';
import { InternalServerError } from './internal-server.error';
import { InvalidPasswordError } from './invalid-password.error';

export interface ServerError extends GraphQLFormattedError {
  code: number;
  message: string;
  details?: ArgumentValidationError | string;
}
export function ErrorHandler(error: GraphQLError): ServerError {
  if (/(duplicate key)[\s\S]/.test(error.message)) {
    return new DuplicateEmailError();
  } else if (error.originalError instanceof ArgumentValidationError) {
    if (error.originalError.validationErrors[0].property == 'password') {
      return new InvalidPasswordError();
    }
    else {
      return new InternalServerError()
    }
  } else {
    return new InternalServerError()
  }
}
