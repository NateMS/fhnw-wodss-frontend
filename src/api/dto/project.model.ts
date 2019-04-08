import { Project } from './project';
import { ProjectBaseModel } from './project.base.model';

export class ProjectModel extends ProjectBaseModel {
  id: number;

  constructor(project: Project) {
    super(project);

    if (project.id) {
      this.id = project.id;
    } else {
      throw new Error(`The field 'id' is missing.`);
    }
  }
}
