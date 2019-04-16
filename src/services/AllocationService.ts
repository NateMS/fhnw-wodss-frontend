import { apiService, ApiService } from './ApiService';
import { AllocationModel } from '../api/dto/allocation.model';
import { Allocation } from '../api/dto/allocation';
import { AllocationBaseModel } from '../api/dto/allocation.base.model';
import { AllocationRequestModel } from '../api/dto/allocation.request.model';
import { ServiceError } from './ServiceError';
import { ResponseStatusCode } from '../api/response-status-code.enum';

class AllocationService {
  private static instance: AllocationService;

  private constructor(private api: ApiService) {}

  public create(allocation: AllocationBaseModel): Promise<AllocationModel> {
    return this.api.post<Allocation>('/api/allocation', new AllocationRequestModel(allocation))
      .then(e => new AllocationModel(e))
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to create allocation');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Employee or Project not found');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for creating allocation failed');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public getAll(employeeId?: string, projectId?: string, fromDate?: string, toDate?: string): Promise<AllocationModel[]> {
    const params = {
      employeeId,
      projectId,
      fromDate,
      toDate,
    };

    return this.api.get<Allocation[]>('/api/allocation', params)
      .then((list: Allocation[]) => list.map(e => new AllocationModel(e)))
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to view allocation');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Employee or Project not found');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public get(id: string): Promise<AllocationModel> {
    return this.api.get<Allocation>(`/api/allocation/${id}`)
      .then(e => new AllocationModel(e))
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to view allocation');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Allocation not found');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public update(allocation: AllocationBaseModel, id: string): Promise<AllocationModel> {
    return this.api.put<Allocation>(`/api/allocation/${id}`, new AllocationRequestModel(allocation))
     .then(e => new AllocationModel(e))
     .catch((error) => {
       if (error.status === ResponseStatusCode.Unauthorized) {
         throw new ServiceError('Unauthenticated or invalid token');
       }

       if (error.status === ResponseStatusCode.Forbidden) {
         throw new ServiceError('Not allowed to update allocation');
       }

       if (error.status === ResponseStatusCode.NotFound) {
         throw new ServiceError('Allocation, Employee or Project not found');
       }

       if (error.status === ResponseStatusCode.PreconditionFailed) {
         throw new ServiceError('Precondition for updateing allocation failed');
       }

       if (error.status === ResponseStatusCode.InternalServerError) {
         throw new ServiceError('Internal server error');
       }

       if (error.status === ResponseStatusCode.NetworkError) {
         throw new ServiceError('Error contacting server');
       }

       throw error;
     });
  }

  public delete(id: string): Promise<void> {
    return this.api.delete<Allocation>(`/api/allocation/${id}`)
      .then(() => {})
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to delete allocation');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Allocation not found');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public filterByProject(allocations: AllocationModel[] | null, projectId: string): AllocationModel[] {
    return (null === allocations) ? [] : allocations.filter(e => e.projectId === projectId);
  }

  public static getInstance(): AllocationService {
    if (!AllocationService.instance) {
      AllocationService.instance = new AllocationService(apiService);
    }

    return AllocationService.instance;
  }
}

export const allocationService = AllocationService.getInstance();
export default AllocationService;
