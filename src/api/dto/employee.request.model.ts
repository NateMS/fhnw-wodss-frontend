import { Employee } from './employee';
import { EmployeeModel } from './employee.model';
import { EmployeeBaseModel } from './employee.base.model';

export class EmployeeRequestModel implements Employee {
  public readonly active?: boolean | undefined;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;

  constructor(employee: EmployeeBaseModel | EmployeeModel) {
    this.active = employee.active;

    if (employee.firstName != null) {
      this.firstName = employee.firstName;
    } else {
      throw new Error(`'First name' is missing`);
    }

    if (employee.lastName != null) {
      this.lastName = employee.lastName;
    } else {
      throw new Error(`'Last name' is missing`);
    }

    if (employee.emailAddress != null) {
      this.emailAddress = employee.emailAddress;
    } else {
      throw new Error(`'Email address' is missing`);
    }
  }
}
