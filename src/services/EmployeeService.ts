import { apiService, ApiService } from './ApiService';
import { Employee } from '../api/dto/employee';
import { EmployeeModel } from '../api/dto/employee.model';
import { RoleEnum } from '../api/role.enum';

class EmployeeService {
  private static instance: EmployeeService;

  private constructor(private api: ApiService) {}

  public create(employee: Employee, password: string, role: RoleEnum): Promise<EmployeeModel> {
    const params = {
      password,
      role,
    };

    return this.api.post<Employee>('/api/employee', employee, params)
      .then((response: Employee) => new EmployeeModel(response));
  }

  public getList(): Promise<EmployeeModel[]> {
    return this.api.get<Employee[]>('/api/employee')
      .then((list: Employee[]) => list.map(e => new EmployeeModel(e)));
  }

  public static getInstance(): EmployeeService {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService(apiService);
    }

    return EmployeeService.instance;
  }
}

export const employeeService = EmployeeService.getInstance();
export default employeeService;
