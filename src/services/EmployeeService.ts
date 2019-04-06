import { apiService, ApiService } from './ApiService';
import { Employee } from '../api/dto/employee';
import { EmployeeModel } from '../api/dto/employee.model';
import { RoleEnum } from '../api/role.enum';
import { ContractModel } from '../api/dto/contract.model';
import { Contract } from '../api/dto/contract';

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

  public getAll(): Promise<EmployeeModel[]> {
    return this.api.get<Employee[]>('/api/employee')
      .then((list: Employee[]) => list.map(e => new EmployeeModel(e)));
  }

  public get(id: string): Promise<EmployeeModel> {
    return this.api.get<Employee>(`/api/employee/${id}`)
      .then((response: Employee) => new EmployeeModel(response));
  }

  public update(employee: Employee, id: string): Promise<EmployeeModel> {
    const params = {
      id
    };

    return this.api.put<Employee>('/api/employee', employee, params)
      .then((response: Employee) => new EmployeeModel(response));
  }
  
  public delete(id: string): void {
    this.api.delete(`/api/employee/${id}`)
      .then();
  }

  public createContract(contract: Contract): Promise<ContractModel> {
    return this.api.post<Contract>('/api/contract', contract)
      .then((response: Contract) => new ContractModel(response));
  }

  public updateContract(contract: Contract, id: string): Promise<ContractModel> {
    const params = {
      id
    };

    return this.api.put<Contract>('/api/contract', contract, params)
      .then((response: Contract) => new ContractModel(response));
  }

  public deleteContract(id: string): void {
    this.api.delete(`/api/contract/${id}`)
      .then();
  }

  public getAllContracts(): Promise<ContractModel[]> {
    return this.api.get<ContractModel[]>('/api/contract')
      .then((list: Contract[]) => list.map(e => new ContractModel(e)));
  }

  public getContract(id: string): Promise<ContractModel> {
    return this.api.get<ContractModel>(`/api/contract/${id}`)
      .then(e => new ContractModel(e))
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
