import { Employee } from './employee';
import { Role, roleNameMap } from '../role';
import { EmployeeBaseModel } from './employee.base.model';
import { ContractModel } from './contract.model';

export class EmployeeModel extends EmployeeBaseModel {
  public readonly id: string;
  public readonly role: Role;

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

  /**
   * Filters a list of employees containing only employees that have contracts.
   * @param employees
   * @param contracts
   */
  public static filterByContracts(employees: EmployeeModel[], contracts: ContractModel[]): EmployeeModel[] {
    const employeeIdsWithContracts: Set<string> = new Set();

    contracts.forEach((contract) => {
      employeeIdsWithContracts.add(contract.employeeId);
    });

    return employees.filter(employee => employeeIdsWithContracts.has(employee.id));
  }
}
