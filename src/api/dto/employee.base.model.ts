import { Employee } from './employee';

export class EmployeeBaseModel implements Employee {
  public readonly active?: boolean | undefined;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;

  constructor(employee: Employee) {
    this.active = employee.active;

    if (employee.firstName) {
      this.firstName = employee.firstName;
    } else {
      throw new Error(`The field 'firstName' is missing.`);
    }

    if (employee.lastName) {
      this.lastName = employee.lastName;
    } else {
      throw new Error(`The field 'lastName' is missing.`);
    }

    if (employee.emailAddress) {
      this.emailAddress = employee.emailAddress;
    } else {
      throw new Error(`The field 'emailAddress' is missing.`);
    }
  }
}
