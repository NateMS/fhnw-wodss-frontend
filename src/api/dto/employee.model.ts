import { Employee } from "./employee";

export class EmployeeModel implements Employee {
  public readonly active?: boolean | undefined;  
  public readonly id?: number | undefined;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;
  public readonly role?: import("../role.enum").Employee.RoleEnum | undefined;

  constructor(employee : Employee) {
    this.active = employee.active;
    this.id = employee.id;

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

    if (employee.role) {
      this.role = employee.role;
    } else {
      throw new Error(`The field 'role' is missing.`);
    }
  }
}