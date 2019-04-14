import { apiService, ApiService } from './ApiService';
import { Employee } from '../api/dto/employee';
import { EmployeeModel } from '../api/dto/employee.model';
import { EmployeeBaseModel } from '../api/dto/employee.base.model';
import { EmployeeRequestModel } from '../api/dto/employee.request.model';
import { RoleEnum } from '../api/role.enum';
import { Contract } from '../api/dto/contract';
import { ContractModel } from '../api/dto/contract.model';
import { ContractBaseModel } from '../api/dto/contract.base.model';
import { ContractRequestModel } from '../api/dto/contract.request.model';

class EmployeeService {
  private static instance: EmployeeService;

  private constructor(private api: ApiService) {}

  public create(employee: EmployeeBaseModel, password: string, role: RoleEnum): Promise<EmployeeModel> {
    const params = {
      password,
      role,
    };

    return this.api.post<Employee>('/api/employee', new EmployeeRequestModel(employee), params)
      .then((response: Employee) => new EmployeeModel(response));
  }

  public getAll(role?: RoleEnum): Promise<EmployeeModel[]> {
    const params = {
      role,
    };

    return this.api.get<Employee[]>('/api/employee', params)
      .then((list: Employee[]) => list.map(e => new EmployeeModel(e)));
  }

  public get(id: string): Promise<EmployeeModel> {
    return this.api.get<Employee>(`/api/employee/${id}`)
      .then((response: Employee) => new EmployeeModel(response));
  }

  public update(employee: EmployeeBaseModel, id: string): Promise<EmployeeModel> {
    return this.api.put<Employee>(`/api/employee/${id}`, new EmployeeRequestModel(employee))
      .then((response: Employee) => new EmployeeModel(response));
  }

  public delete(id: string): Promise<void> {
    return this.api.delete<void>(`/api/employee/${id}`)
      .then(() => {});
  }

  public createContract(contract: ContractBaseModel): Promise<ContractModel> {
    return this.api.post<Contract>('/api/contract', new ContractRequestModel(contract))
      .then((response: Contract) => new ContractModel(response));
  }

  public updateContract(contract: ContractBaseModel, id: string): Promise<ContractModel> {
    return this.api.put<Contract>(`/api/contract/${id}`, new ContractRequestModel(contract))
      .then((response: Contract) => new ContractModel(response));
  }

  public deleteContract(id: string): Promise<void> {
    return this.api.delete<void>(`/api/contract/${id}`)
      .then(() => {});
  }

  public getAllContracts(fromDate?: string, toDate?: string): Promise<ContractModel[]> {
    const params = {
      fromDate,
      toDate,
    };

    return this.api.get<ContractModel[]>('/api/contract', params)
      .then((list: Contract[]) => list.map(e => new ContractModel(e)));
  }

  public getContract(id: string): Promise<ContractModel> {
    return this.api.get<ContractModel>(`/api/contract/${id}`)
      .then(e => new ContractModel(e));
  }

  public filterListByRole(employees: EmployeeModel[] | null, role: RoleEnum): EmployeeModel[] {
    return (null === employees) ? [] : employees.filter(e => e.role === role);
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
