import { status } from "../assets/constants"
import { AxiosResponse } from "axios";

export default class Result<T> {
  private readonly headers: object;
  private readonly status: number;
  private readonly failed: boolean;
  private readonly data: T;

  private constructor(headers: object, status: number, failed: boolean, data: T) {
    this.headers = headers;
    this.status = status;
    this.failed = failed;
    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public hasFailed(): boolean {
    return this.failed;
  }

  public static handleResult(response: AxiosResponse) {
    if (response.status >= status.OK && response.status <= status.SUCCESS_LIMIT) {
      return new Result(response.headers, response.status, false, response.data);
    }
    return new Result(null as any, response.status, true, null as any);
  }

  public static failure(status: number) {
    return new Result(null as any, status, true, null as any);
  }
}