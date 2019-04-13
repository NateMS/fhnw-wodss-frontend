import { apiService, ApiService } from './ApiService';
import { AllocationModel } from '../api/dto/allocation.model';
import { Allocation } from '../api/dto/allocation';
import { AllocationRequestModel } from '../api/dto/allocation.request.model';

class AllocationService {
  private static instance: AllocationService;

  private constructor(private api: ApiService) {}

  public create(allocation: AllocationModel): Promise<AllocationModel> {
    return this.api.post<Allocation>("/api/allocation", new AllocationRequestModel(allocation))
      .then(e => new AllocationModel(e));
  }

  public getAll(employeeId?: number, projectId?: number, fromDate?: string, toDate?: string): Promise<AllocationModel[]> {
    const params = {
      employeeId,
      projectId,
      fromDate,
      toDate,
    };

    return this.api.get<Allocation[]>('/api/allocation', params)
      .then((list: Allocation[]) => list.map(e => new AllocationModel(e)));
  }

  public get(id: number): Promise<AllocationModel> {
    return this.api.get<Allocation>(`/api/allocation/${id}`)
      .then(e => new AllocationModel(e));
  }

  public update(allocation: AllocationModel): Promise<AllocationModel> {
    return this.api.put<Allocation>(`/api/allocation/${allocation.id}`, new AllocationRequestModel(allocation))
     .then(e => new AllocationModel(e))
  }

  public delete(id: number): Promise<void> {
    return this.api.delete<Allocation>(`/api/allocation/${id}`)
      .then(() => {});
  }

  public filterByProject(allocations: AllocationModel[] | null, projectId: number): AllocationModel[] {
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
