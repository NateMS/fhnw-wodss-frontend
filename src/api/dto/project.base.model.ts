import { Project } from './project';
import moment from 'moment';

export class ProjectBaseModel implements Project {
  name: string;
  ftePercentage: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
  projectManagerId: string;

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
      this.startDate = moment(project.startDate);
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (project.endDate) {
      this.endDate = moment(project.endDate);
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
