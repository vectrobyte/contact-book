export default class ServerError extends Error {
  public isExpected: boolean;
  public code: number;

  constructor(message: string, code: number) {
    super(message);

    this.isExpected = true;
    this.code = code;
  }
}
