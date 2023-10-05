import { ErrorType } from "./server_error";

export class ResponseError extends Error {
  errorType: ErrorType;
  isSuccess: boolean;
  constructor(errorType: ErrorType, message: string, isSuccess: boolean) {
    super(message);
    this.isSuccess = isSuccess;
    this.errorType = errorType;
  }
}
