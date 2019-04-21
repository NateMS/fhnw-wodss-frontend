import { ProjectModel } from '../api/dto/project.model';
import { Project } from '../api/dto/project';
import { AllocationExtendedModel } from './allocation-extended.model';
import { Moment } from 'moment';
import { isBetweenDates } from '../utils';

export class ProjectExtendedModel extends ProjectModel {
  public readonly allocations: AllocationExtendedModel[];

  constructor(project: Project, allocations: AllocationExtendedModel[]) {
    super(project);

    this.allocations = allocations;
  }

  public isAllocationBetween(date: Moment): boolean {
    let i = 0;
    const numberOfAllocations = this.allocations.length;

    while (i < numberOfAllocations) {
      const { startDate, endDate } = this.allocations[i];
      if (isBetweenDates(startDate, endDate, date)) {
        return true;
      }

      i = i + 1;
    }

    return false;
  }
}
