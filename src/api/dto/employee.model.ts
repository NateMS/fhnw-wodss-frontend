import { Employee } from './employee';
import { RoleEnum } from '../role.enum';

export class EmployeeModel implements Employee {
  public readonly active?: boolean | undefined;
  public readonly id?: number | undefined;
  public readonly role?: RoleEnum | undefined;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(employee: Employee) {
    this.active = employee.active;
    this.id = employee.id;
    this.role = employee.role;

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
