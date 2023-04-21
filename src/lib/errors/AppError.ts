export default class AppError extends Error {
  isExpected: boolean;

  constructor(message: string) {
    super(message);

    this.isExpected = true;
  }
}
