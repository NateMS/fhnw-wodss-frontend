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
      throw new Error(`The field 'name' is missing.`);
    }

    if (project.ftePercentage) {
      this.ftePercentage = project.ftePercentage;
    } else {
      throw new Error(`The field 'ftePercentage' is missing.`);
    }

    if (project.startDate) {
      this.startDate = project.startDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (project.endDate) {
      this.endDate = project.endDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (project.projectManagerId) {
      this.projectManagerId = project.projectManagerId;
    } else {
      throw new Error(`The field 'projectManagerId' is missing.`);
    }
  }
}
