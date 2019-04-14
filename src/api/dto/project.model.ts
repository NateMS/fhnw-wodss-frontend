import { Project } from './project';
import { ProjectBaseModel } from './project.base.model';

export class ProjectModel extends ProjectBaseModel {
  id: string;

  constructor(project: Project) {
    super(project);

    if (project.id) {
      this.id = project.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }
  }
}
