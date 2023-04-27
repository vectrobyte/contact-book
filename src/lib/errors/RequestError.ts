import AppError from './AppError';

type Response<T> = Partial<{
  data: Partial<{
    message: string;
    errors: Record<keyof T, string>;
  }>;
}>;

type ErrorResponse<T> = {
  message: string;
  statusCode: number;
  response?: Response<T>;
};

export default class RequestError<T> extends AppError {
  public message: string;
  public statusCode?: number;
  public response?: Response<T>;

  constructor(options: ErrorResponse<T>) {
    super(options.message);
    this.isExpected = false;

    if (options.response) {
      this.response = options.response;
    }

    if (options.statusCode) {
      this.statusCode = options.statusCode;
    }
  }

  public toJson() {
    return { ...this };
  }

  public getResponseData<T>(): T {
    if (this.response && this.response.data) {
      return this.response.data as T;
    }

    throw new AppError('Error is missing response data');
  }
}
