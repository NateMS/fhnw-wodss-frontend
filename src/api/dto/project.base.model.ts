import { Project } from './project';

export class ProjectBaseModel implements Project {
  name: string;
  ftePercentage: number;
  startDate: string;
  endDate: string;
  projectManagerId: number;

  constructor(project: Project) {
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
      this.startDate = project.startDate;
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (project.endDate) {
      this.endDate = project.endDate;
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
