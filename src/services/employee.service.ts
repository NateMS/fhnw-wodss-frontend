import { apiService, ApiService } from './api.service';
import { Employee } from '../api/dto/employee';
import { EmployeeModel } from '../api/dto/employee.model';
import { EmployeeRequestModel } from '../api/dto/employee.request.model';
import { Role } from '../api/role';
import { Contract } from '../api/dto/contract';
import { ContractModel } from '../api/dto/contract.model';
import { ContractRequestModel } from '../api/dto/contract.request.model';
import { ServiceError } from './service-error';
import { ResponseStatusCode } from '../api/response-status-code.enum';

class EmployeeService {
  private static instance: EmployeeService;

  private constructor(private api: ApiService) {}

  public create(employee: EmployeeRequestModel, password: string, role: Role): Promise<EmployeeModel> {
    const params = {
      password,
      role,
    };

    return this.api.post<Employee>('/api/employee', employee, params)
      .then((response: Employee) => new EmployeeModel(response))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for creating employee failed');
        }

        throw error;
      });
  }

  public getAll(role?: Role): Promise<EmployeeModel[]> {
    const params = {
      role,
    };

    return this.api.get<Employee[]>('/api/employee', params)
      .then((list: Employee[]) => list.map(e => new EmployeeModel(e)))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        throw error;
      });
  }

  public get(id: string): Promise<EmployeeModel> {
    return this.api.get<Employee>(`/api/employee/${id}`)
      .then((response: Employee) => new EmployeeModel(response))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Employee not found');
        }

        throw error;
      });
  }

  public update(employee: EmployeeRequestModel, id: string): Promise<EmployeeModel> {
    return this.api.put<Employee>(`/api/employee/${id}`, employee)
      .then((response: Employee) => new EmployeeModel(response))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to update employees');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Employee not found');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for updateing employee failed');
        }

        throw error;
      });
  }

  public delete(id: string): Promise<void> {
    return this.api.delete<void>(`/api/employee/${id}`)
      .then(() => {})
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to delete employees');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Employee not found');
        }

        throw error;
      });
  }

  public createContract(contract: ContractRequestModel): Promise<ContractModel> {
    return this.api.post<Contract>('/api/contract', contract)
      .then((response: Contract) => new ContractModel(response))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to create contracts');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Contract not found');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for creating contract failed');
        }

        throw error;
      });
  }

  public updateContract(contract: ContractRequestModel, id: string): Promise<ContractModel> {
    return this.api.put<Contract>(`/api/contract/${id}`, contract)
      .then((response: Contract) => new ContractModel(response))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to update contracts');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Contract not found');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for updateing contract failed');
        }

        throw error;
      });
  }

  public deleteContract(id: string): Promise<void> {
    return this.api.delete<void>(`/api/contract/${id}`)
      .then(() => {})
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to delete contracts');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Contract not found');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for deleting contract failed');
        }

        throw error;
      });
  }

  public getAllContracts(fromDate?: string, toDate?: string): Promise<ContractModel[]> {
    const params = {
      fromDate,
      toDate,
    };

    return this.api.get<ContractModel[]>('/api/contract', params)
      .then((list: Contract[]) => list.map(e => new ContractModel(e)))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        throw error;
      });
  }

  public getContract(id: string): Promise<ContractModel> {
    return this.api.get<ContractModel>(`/api/contract/${id}`)
      .then(e => new ContractModel(e))
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to view contract');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Contract not found');
        }

        throw error;
      });
  }

  public filterListByRole(employees: EmployeeModel[] | null, role: Role): EmployeeModel[] {
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
