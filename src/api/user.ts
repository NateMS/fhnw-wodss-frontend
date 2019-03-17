export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export class UserModel implements User {
  public readonly userId: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;

  constructor(user: User) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.emailAddress = user.emailAddress;
  }
}
