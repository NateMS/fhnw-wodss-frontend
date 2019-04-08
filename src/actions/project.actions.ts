import { ProjectState, State } from '../state';
import { Project } from '../api/dto/project';
import { ActionResult, ActionsType } from 'hyperapp';
import { projectService } from '../services/ProjectService';
import { ProjectModel } from '../api/dto/project.model';
import { ProjectFormState } from '../state/form/project-form.state';

export interface ProjectActions {
  setLoading: (isLoading: boolean) => (state: ProjectState) => ActionResult<ProjectState>;
  fetchAll: () => (state: ProjectState, actions: ProjectActions) => Promise<ProjectModel[]>;
  setList: (projects: ProjectModel[]) => (state: ProjectState) => ActionResult<ProjectState>;
  create: (form: ProjectFormState) => () => Promise<ProjectModel>;
  update: (form: ProjectFormState) => () => Promise<ProjectModel>;
  delete: (id: number) => () => Promise<void>;
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

  create: (form: ProjectFormState) => () => {
    const { name, ftePercentage, startDate, endDate, projectManagerId } = form.controls;
    // @TODO VALIDATION

    const project: Project = {
      name: name.value!,
      ftePercentage: ftePercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
      projectManagerId: projectManagerId.value!,
    };

    return projectService
      .create(project)
      .then((project: ProjectModel) => {
        return project;
      });
  },

  update: (form: ProjectFormState) => () => {
    const { id, name, ftePercentage, startDate, endDate, projectManagerId } = form.controls;
    // @TODO VALIDATION

    const project: Project = {
      id: id.value!,
      name: name.value!,
      ftePercentage: ftePercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
      projectManagerId: projectManagerId.value!,
    };

    return projectService
      .update(project)
      .then((project: ProjectModel) => {
        return project;
      });
  },

  delete: (id: number) => () => {
    return projectService.delete(id);
  },
};
