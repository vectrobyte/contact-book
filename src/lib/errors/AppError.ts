export default class AppError extends Error {
  public isExpected: boolean;

  constructor(message: string) {
    super(message);

    this.isExpected = true;
  }
}
