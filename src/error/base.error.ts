import { ErrorType, StatusCode } from './error.type';

export const BaseErrorToken = Symbol();
export class BaseError<Details = string> extends Error {
  [BaseErrorToken] = true;

  code: ErrorType | StatusCode;
  message: string;
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
