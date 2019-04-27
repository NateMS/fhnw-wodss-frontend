import { Project } from './project';
import { ProjectBaseModel } from './project.base.model';
import { AllocationModel } from './allocation.model';
import { getDaysOfDateRange } from '../../utils';

export class ProjectModel extends ProjectBaseModel {
  public readonly id: string;

  constructor(project: Project) {
    super(project);

    if (project.id) {
      this.id = project.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }
  }

  public getAllocations(allocations: AllocationModel[]): AllocationModel[] {
    return allocations.filter(a => a.projectId === this.id);
  }

  public getTotalAllocatedPercentage(allocations: AllocationModel[], ...ignoreAllocations: AllocationModel[]): number {
    const projectAllocations = this.getAllocations(allocations)
      .filter((allocation) => {
        return !ignoreAllocations.find(ignoredAllocation => allocation.id === ignoredAllocation.id);
      });

    return projectAllocations.reduce(
      (prev, allocation) => {
        const days = getDaysOfDateRange(allocation.startDate, allocation.endDate, true);
        return prev + (days * allocation.pensumPercentage);
      },
      0,
    );
  }

  public static createMap(projects: ProjectModel[]): Map<string, ProjectModel> {
    const projectMap: Map<string, ProjectModel> = new Map();
    projects.forEach((project) => {
      projectMap.set(project.id, project);
    });

    return projectMap;
  }
}
