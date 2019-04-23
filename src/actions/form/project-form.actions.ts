import { ActionsType } from 'hyperapp';
import { GenericFormActions, patch, setOpen, setSaving, updateValue } from './index';
import { ProjectFormState, initProjectForm } from '../../state/form/project-form.state';
import { Actions } from '../index';
import { ProjectModel } from '../../api/dto/project.model';
import { getToastMessage, getApiErrorToast } from '../../utils';
import { ProjectRequestModel } from '../../api/dto/project.request.model';

export const projectFormActions: ActionsType<ProjectFormState, GenericFormActions<ProjectFormState>> = {
  setSaving: isSaving => state => setSaving(isSaving, state),
  patch: newValues => state => patch(newValues, state),
  updateValue: control => state => updateValue(control, state),
  reset: () => (state) => {
    return Object.assign({}, state, initProjectForm());
  },
  setOpen: isOpen => state => setOpen(isOpen, state),
};

export const showProjectCreateForm = (show: boolean, actions: Actions): void => {
  actions.form.project.reset();
  actions.form.project.setOpen(show);
};

export const showProjectEditForm = (project: ProjectModel, actions: Actions): void => {
  actions.form.project.patch({
    ...project,
  });

  actions.form.project.setOpen(true);
};

export const createProject = (state: ProjectFormState, actions: Actions) => {
  const { name, ftePercentage, startDate, endDate, projectManagerId } = state.controls;

  try {
    const request = new ProjectRequestModel({
      name: name.value!,
      ftePercentage: ftePercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
      projectManagerId: projectManagerId.value!,
    });

    actions
      .project
      .create(request)
      .then((project: ProjectModel) => {
        actions.toast.success(getToastMessage(`Successfully created project '${project.name}'`));

        actions.form.project.reset();

        // Refresh underlying view
        actions.project.fetchAll();
      })
      .catch((error: Error) => {
        actions.toast.error(getApiErrorToast('Error creating project', error));
      });
  } catch (error) {
    actions.toast.error(getApiErrorToast('Error creating project', error));
  }
};

export const updateProject = (state: ProjectFormState, actions: Actions): void => {
  const { id, name, ftePercentage, startDate, endDate, projectManagerId } = state.controls;

  try {
    const request = new ProjectRequestModel({
      name: name.value!,
      ftePercentage: ftePercentage.value!,
      startDate: startDate.value!,
      endDate: endDate.value!,
      projectManagerId: projectManagerId.value!,
    });

    if (id.value == null) {
      throw Error(`'ID' is missing`);
    }

    actions
      .project
      .update({ project: request, id: id.value })
      .then((project: ProjectModel) => {
        actions.toast.success(getToastMessage(`Successfully updated project '${project.name}'`));

        actions.form.project.reset();

        // Refresh underlying view
        actions.project.fetchAll();
      })
      .catch((error: Error) => {
        actions.toast.error(getApiErrorToast('Error updateing project', error));
      });
  } catch (error) {
    actions.toast.error(getApiErrorToast('Error updateing project', error));
  }
};

export const deleteProject = (project: ProjectModel, actions: Actions): void => {
  actions.project
    .delete(project.id)
    .then(() => {
      actions.toast.success(getToastMessage(`Project '${project.name}' successfully deleted`));
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast(`Error deleting project: '${project.name}'`, error));
    });
};
