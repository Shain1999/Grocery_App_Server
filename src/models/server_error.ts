export enum ErrorType {
  Unauthorize,
  ServerError,
}
class ServerError extends Error {
  errorType: ErrorType;
  innerError: string;
  constructor(errorType: ErrorType, message: string, innerError: string) {
    super(message);
    this.errorType = errorType;
    this.innerError = innerError;
  }
}
module.exports = ServerError;
