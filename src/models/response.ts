export class ResponseBody {
  isSuccess: boolean;
  data: any;
  status: number;
  constructor(isSuccess: boolean, data: any, status: number) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.status = status;
  }
}
