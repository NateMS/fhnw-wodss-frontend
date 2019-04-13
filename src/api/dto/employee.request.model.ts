import { Employee } from './employee';
import { EmployeeModel } from './employee.model';

export class EmployeeRequestModel implements Employee {
  public readonly active?: boolean | undefined;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;

  constructor(employee: EmployeeModel) {
    this.active = employee.active;

    if (employee.firstName != null) {
      this.firstName = employee.firstName;
    } else {
      throw new Error(`The field 'firstName' is missing.`);
    }

    if (employee.lastName != null) {
      this.lastName = employee.lastName;
    } else {
      throw new Error(`The field 'lastName' is missing.`);
    }

    if (employee.emailAddress != null) {
      this.emailAddress = employee.emailAddress;
    } else {
      throw new Error(`The field 'emailAddress' is missing.`);
    }
  }
}
