import { ProjectState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { projectService } from '../services/project.service';
import { ProjectModel } from '../api/dto/project.model';
import { ProjectRequestModel } from '../api/dto/project.request.model';

export interface ProjectActions {
  setLoading: (isLoading: boolean) => (state: ProjectState) => ActionResult<ProjectState>;
  fetchAll: () => (state: ProjectState, actions: ProjectActions) => Promise<ProjectModel[]>;
  setList: (projects: ProjectModel[]) => (state: ProjectState) => ActionResult<ProjectState>;
  create: (project: ProjectRequestModel) => () => Promise<ProjectModel>;
  update: (update: ProjectUpdateModel) => () => Promise<ProjectModel>;
  delete: (id: string) => () => Promise<void>;
}

interface ProjectUpdateModel {
  project: ProjectRequestModel;
  id: string;
}

export const projectActions: ActionsType<ProjectState, ProjectActions> = {
  setLoading: isLoading => state => (
    Object.assign({}, state, {
      isLoading,
    })
  ),

  setList: projects => state => (
    Object.assign({}, state, {
      list: [...projects],
    })
  ),

  fetchAll: () => (_, actions) => {
    actions.setLoading(true);
    projectService
      .getAll()
      .then((projects) => {
        actions.setLoading(false);
        actions.setList(projects);
        return projects;
      });
  },

  create: (project: ProjectRequestModel) => () => {
    return projectService
      .create(project)
      .then((project: ProjectModel) => {
        return project;
      });
  },

  update: (update: ProjectUpdateModel) => () => {
    const { project, id } = update;

    return projectService
      .update(project, id)
      .then((project: ProjectModel) => {
        return project;
      });
  },

  delete: (id: string) => () => {
    return projectService.delete(id);
  },
};
