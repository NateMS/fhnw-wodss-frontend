export class ServiceError extends Error {
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public toString(): string {
    return this.message;
  }
}
