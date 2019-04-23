import { DATE_FORMAT_STRING } from '../../constants';
import { Project } from './project';
import { ProjectModel } from './project.model';
import { ProjectBaseModel } from './project.base.model';

export class ProjectRequestModel implements Project {
  name: string;
  ftePercentage: number;
  startDate: string;
  endDate: string;
  projectManagerId: string;

  constructor(project: ProjectBaseModel | ProjectModel) {
    if (project.name) {
      this.name = project.name;
    } else {
      throw new Error(`'Name' is missing`);
    }

    if (project.ftePercentage) {
      this.ftePercentage = project.ftePercentage;
    } else {
      throw new Error(`'FTE' is missing`);
    }

    if (project.startDate) {
      this.startDate = project.startDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`'Start date' is missing`);
    }

    if (project.endDate) {
      this.endDate = project.endDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`'End date' is missing`);
    }

    if (project.projectManagerId) {
      this.projectManagerId = project.projectManagerId;
    } else {
      throw new Error(`'Project Manager' is missing`);
    }
  }
}
