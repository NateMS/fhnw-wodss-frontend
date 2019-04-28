import { ProjectFormState } from '../../state/form/project-form.state';
import { Actions } from '../../actions';
import { Component, h } from 'hyperapp';
import { Role } from '../../api/role';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import { ProjectFormProps, close } from './ProjectModalForm';
import { EmployeeSelect } from '../EmployeeSelect/EmployeeSelect';
import { employeeService } from '../../services/employee.service';
import { createProject, updateProject } from '../../actions/form/project-form.actions';
import DatePicker from '../DatePicker/DatePicker';
import FormHint from '../FormHint/FormHint';
import { INPUT_LENGTH_SHORT_MAX, PROJECT_FTE_VALUE_MAX, PROJECT_FTE_VALUE_MIN } from '../../constants';

const onSubmit = (isEditMode: boolean, event: Event, state: ProjectFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  if (isEditMode) {
    updateProject(state, actions);
  } else {
    createProject(state, actions);
  }
};

export const ProjectCreateForm: Component<ProjectFormProps> = ({ state, actions }) => {
  const formState = state.form.project;
  const { id, name, ftePercentage, startDate, endDate, projectManagerId } = formState.controls;
  const { project: formActions } = actions.form;

  const projectManagers = employeeService.filterListByRole(state.employee.list, Role.PROJECTMANAGER);
  const isEditMode = id.value != null;

  return (
    <form onsubmit={(event: Event) => onSubmit(isEditMode, event, formState, actions)}>
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
          <div className="columns">
            <div className="column is-one-third">
              <FormField labelText="Name" required={true}>
                <FormInput
                  name={name.name}
                  value={name.value}
                  maxLength={INPUT_LENGTH_SHORT_MAX}
                  type="text"
                  errors={name.errors}
                  onInputChange={formActions.updateValue}
                />
                {name.errors != null && name.errors.required &&
                  <FormHint theme="danger" label="Name is required" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              <FormField labelText="Project Manager" required={true}>
                <EmployeeSelect
                  name={projectManagerId.name}
                  value={projectManagerId.value}
                  placeholder="Please select"
                  items={projectManagers}
                  errors={projectManagerId.errors}
                  onInputChange={formActions.updateValue}
                />
                {projectManagerId.errors != null && projectManagerId.errors.required &&
                <FormHint theme="danger" label="Project Manager is required" />}
              </FormField>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <FormField labelText="Start date" required={true}>
                <DatePicker
                  name={startDate.name}
                  value={startDate.value}
                  max={endDate.value}
                  errors={startDate.errors}
                  onInputChange={formActions.updateValue}
                />
                {startDate.errors != null && startDate.errors.negativeDuration &&
                  <FormHint theme="danger" label="Project has negative duration" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              <FormField labelText="End date" required={true}>
                <DatePicker
                  name={endDate.name}
                  value={endDate.value}
                  min={startDate.value}
                  errors={endDate.errors}
                  onInputChange={formActions.updateValue}
                />
                {endDate.errors != null && endDate.errors.negativeDuration &&
                  <FormHint theme="danger" label="Project has negative duration" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              <FormField labelText="FTE" required={true}>
                <FormInput
                  name={ftePercentage.name}
                  value={ftePercentage.value}
                  min={PROJECT_FTE_VALUE_MIN}
                  max={PROJECT_FTE_VALUE_MAX}
                  suffix="fas fa-percent"
                  type="number"
                  onInputChange={formActions.updateValue}
                />
                <FormHint label="FTE percentage per day" />
              </FormField>
            </div>
          </div>
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
