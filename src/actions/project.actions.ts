import { ProjectState } from '../state';
import { ActionResult, ActionsType } from 'hyperapp';
import { projectService } from '../services/ProjectService';
import { ProjectModel } from '../api/dto/project.model';
import { ProjectBaseModel } from '../api/dto/project.base.model';
import { ProjectFormState } from '../state/form/project-form.state';
import { Actions } from './index';
import { getApiErrorToast, getToastMessage } from '../utils';

export interface ProjectActions {
  setLoading: (isLoading: boolean) => (state: ProjectState) => ActionResult<ProjectState>;
  fetchAll: () => (state: ProjectState, actions: ProjectActions) => Promise<ProjectModel[]>;
  setList: (projects: ProjectModel[]) => (state: ProjectState) => ActionResult<ProjectState>;
  create: (form: ProjectFormState) => () => Promise<ProjectModel>;
  update: (form: ProjectFormState) => () => Promise<ProjectModel>;
  delete: (id: string) => () => Promise<void>;
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

    const project: ProjectBaseModel = {
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

    const project: ProjectBaseModel = {
      name: name.value!,
      ftePercentage: ftePercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
      projectManagerId: projectManagerId.value!,
    };

    return projectService
      .update(project, id.value!)
      .then((project: ProjectModel) => {
        return project;
      });
  },

  delete: (id: string) => () => {
    return projectService.delete(id);
  },
};

export const createProject = (state: ProjectFormState, actions: Actions) => {
  actions
    .project
    .create(state)
    .then((project: ProjectModel) => {
      actions.toast.success(getToastMessage(`Successfully created project '${project.name}'.`));

      actions.form.project.reset();

      // Refresh underlying view
      actions.project.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating project.', error));
    });
};

export const updateProject = (state: ProjectFormState, actions: Actions): void => {
  actions
    .project
    .update(state)
    .then((project: ProjectModel) => {
      actions.toast.success(getToastMessage(`Successfully updated project '${project.name}'.`));

      actions.form.project.reset();

      // Refresh underlying view
      actions.project.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error updateing project.', error));
    });
};

export const deleteProject = (project: ProjectModel, actions: Actions): void => {
  actions.project
    .delete(project.id)
    .then(() => {
      actions.toast.success(getToastMessage(`Project '${project.name}' successfully deleted.`));
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast(`Error deleting project: '${project.name}'.`, error));
    });
};
