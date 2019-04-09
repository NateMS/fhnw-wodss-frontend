import { ProjectFormState } from '../../state/form/project-form.state';
import { Actions } from '../../actions';
import { ProjectModel } from '../../api/dto/project.model';
import { getApiErrorToast, getToastMessage } from '../../utils';
import { Component, h } from 'hyperapp';
import { RoleEnum } from '../../api/role.enum';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import { ProjectFormProps, close } from './ProjectModalForm';
import { EmployeeSelect } from '../EmployeeSelect/EmployeeSelect';
import { employeeService } from '../../services/EmployeeService';

const createProject = (event: Event, state: ProjectFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

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
      actions.toast.error(getApiErrorToast('Error creating project', error));
    });
};

const updateProject = (event: Event, state: ProjectFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

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
      actions.toast.error(getApiErrorToast('Error updateing project', error));
    });
};

export const ProjectCreateForm: Component<ProjectFormProps> = ({ state, actions }) => {
  const formState = state.form.project;
  const { id, name, ftePercentage, startDate, endDate, projectManagerId } = formState.controls;
  const { project: formActions } = actions.form;

  const projectManagers = employeeService.filterListByRole(state.employee.list, RoleEnum.PROJECTMANAGER);
  const isEditMode = id.value != null;

  return (
    <form onsubmit={(event: Event) => isEditMode ? updateProject(event, formState, actions) : createProject(event, formState, actions)}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{isEditMode ? 'Edit Project' : 'Create Project'}</p>
          <button
            className="button"
            aria-label="close"
            onclick={() => close(actions)}
            type="button"
          >
            <span className="icon is-small">
              <i className="fas fa-times" />
            </span>
          </button>
        </header>
        <section className="modal-card-body">
          <FormField labelText="Name" required={true}>
            <FormInput
              name={name.name}
              value={name.value}
              type="text"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="FTE" required={true}>
            <FormInput
              name={ftePercentage.name}
              value={ftePercentage.value}
              suffix="fas fa-percent"
              type="number"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Start date" required={true}>
            <FormInput
              name={startDate.name}
              value={startDate.value}
              type="date"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="End date" required={true}>
            <FormInput
              name={endDate.name}
              value={endDate.value}
              type="date"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Project Manager" required={true}>
            <EmployeeSelect
              name={projectManagerId.name}
              value={projectManagerId.value}
              placeholder="Please select"
              items={projectManagers}
              onInputChange={formActions.updateValue}
            />
          </FormField>
        </section>
        <footer className="modal-card-foot">
          <Button label="Cancel" onClick={() => close(actions)} />
          <Button label="Save" theme="primary" type="submit" />
        </footer>
      </div>
    </form>
  );
};

export default ProjectCreateForm;
