import AppError from './AppError';

type Response<T> = Partial<{
  data: Partial<{
    message: string;
    errors: Record<keyof T, string>;
  }>;
}>;

export default class RequestError<T> extends AppError {
  public message: string;
  public statusCode?: number;
  public response?: Response<T>;

  constructor(options: { message: string; statusCode?: number; response?: Response<T> }) {
    super(options.message);
    this.isExpected = false;
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.response = options.response;
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
