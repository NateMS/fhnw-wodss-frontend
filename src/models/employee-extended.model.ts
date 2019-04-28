import { EmployeeModel } from '../api/dto/employee.model';
import { Employee } from '../api/dto/employee';
import { ProjectExtendedModel } from './project-extended.model';

export class EmployeeExtendedModel extends EmployeeModel {
  public readonly projects: ProjectExtendedModel[];

  constructor(employee: Employee, projects: ProjectExtendedModel[]) {
    super(employee);

    this.projects = projects;
  }
}
