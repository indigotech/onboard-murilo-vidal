export enum StatusCode {
  Success = 200,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

export enum ErrorType {
  DataSourceError = StatusCode.ServerError,
  InvalidDataError = StatusCode.BadRequest,
  NotFoundError = StatusCode.NotFound,
  ServerError = StatusCode.ServerError,
}
