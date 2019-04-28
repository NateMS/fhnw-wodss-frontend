export enum ResponseStatusCode {
  NoContent = 204,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  PreconditionFailed = 412,
  InternalServerError = 500,
  NetworkError = 999,
}
