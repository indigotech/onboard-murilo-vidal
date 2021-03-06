import { formatError, GraphQLError, GraphQLFormattedError } from 'graphql';
import { ArgumentValidationError } from 'type-graphql';
import { isBaseError } from './base.error';
import { StatusCode } from './error.type';

export interface ServerError extends GraphQLFormattedError {
  code?: number;
  message: string;
  details?: ArgumentValidationError | string;
}

export function ErrorHandler(error: GraphQLError): ServerError {
  let data: ServerError = defaultErrorFormatter(error);
  const { originalError } = error;

  if (isBaseError(originalError)) {
    return (data = {
      code: originalError.code,
      message: originalError.message,
    });
  }

  if (originalError instanceof ArgumentValidationError) {
    const firstMessageParsed = Object.values(
      originalError.validationErrors?.[0].constraints as { [type: string]: string },
    )?.[0];

    return (data = {
      code: StatusCode.BadRequest,
      message: firstMessageParsed ?? 'Internal server error.',
    });
  }

  return (data = {
    code: StatusCode.ServerError,
    message: 'Internal server error.',
  });
}

function defaultErrorFormatter(error: any): ServerError {
  const data: ServerError = formatError(error);

  if (error?.originalError?.result?.errors?.length === 1) {
    const originalError = error.originalError.result.errors[0];

    if (originalError.message === error.message && originalError.code) {
      data.code = originalError.code;
    }
  }

  return data;
}
