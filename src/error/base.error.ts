import { ErrorType, StatusCode } from './error.type';

export const BaseErrorToken = Symbol();

export class BaseError extends Error {
  code: ErrorType | StatusCode;
  details?: string;

  constructor(type: ErrorType | StatusCode, message: string, additionalInfo?: string) {
    super(message);

    this.code = type;
    this.message = message;
    this.details = additionalInfo;
  }
}
export function isBaseError(error: any): error is BaseError {
  return error?.[BaseErrorToken] ?? false;
}
