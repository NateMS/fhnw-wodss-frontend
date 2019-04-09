import { Employee } from './employee';
import { RoleEnum, roleNameMap } from '../role.enum';
import { EmployeeBaseModel } from './employee.base.model';

export class EmployeeModel extends EmployeeBaseModel {
  public readonly id: number;
  public readonly role: RoleEnum;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public get roleName(): string {
    return roleNameMap[this.role];
  }

  constructor(employee: Employee) {
    super(employee);

    if (employee.id != null) {
      this.id = employee.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }

    if (employee.role != null) {
      this.role = employee.role;
    } else {
      throw new Error(`The field 'role' is missing.`);
    }
  }
}
