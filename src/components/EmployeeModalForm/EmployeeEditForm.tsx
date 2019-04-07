import { Component, h } from 'hyperapp';
import { RoleEnum, roleList, roleNameMap } from '../../api/role.enum';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import Button from '../Button/Button';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import { Actions } from '../../actions';
import { EmployeeFormProps, close } from './EmployeeModalForm';
import { EmployeeModel } from '../../api/dto/employee.model';
import { getApiErrorToast, getApiErrorToastMessage } from '../../utils';

const updateEmployee = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  actions
    .employee
    .update(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getApiErrorToastMessage(`Successfully updated employee '${employee.fullName}'.`));

      // Refresh underlying view
      actions.employee.fetchAll();
      actions.form.employee.reset();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error updating employee', error));
    });
};

export const EmployeeEditForm: Component<EmployeeFormProps> = ({ state, actions }) => {
  const { firstName, lastName, emailAddress, active, role } = state.controls;
  const { employee: formActions } = actions.form;

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Edit Employee</p>
        <button
          className="button"
          aria-label="close"
          onClick={() => close(actions)}
        >
            <span className="icon is-small">
              <i className="fas fa-times"/>
            </span>
        </button>
      </header>
      <form onsubmit={(event: Event) => updateEmployee(event, state, actions)}>
        <section className="modal-card-body">
          <FormField labelText="First Name" required={true}>
            <FormInput
              name={firstName.name}
              value={firstName.value}
              type="text"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Last Name" required={true}>
            <FormInput
              name={lastName.name}
              value={lastName.value}
              type="text"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Role" required={true}>
            <FormSelect
              name={role.name}
              value={role.value}
              placeholder="Please select"
              disabled={true}
              items={roleList}
              labler={(r: RoleEnum) => roleNameMap[r]}
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Email" required={true}>
            <FormInput
              name={emailAddress.name}
              value={emailAddress.value}
              type="email"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Status" required={true} hint="Inactive: No login possible">
            <FormCheckbox
              name={active.name}
              value={active.value}
              labelText="Active"
              onInputChange={formActions.updateValue}
            />
          </FormField>
        </section>
        <footer className="modal-card-foot">
          <Button
            label="Cancel"
            disabled={state.isSaving}
            isLoading={state.isSaving}
            onClick={() => close(actions)}
          />
          <Button
            label="Save"
            disabled={state.isSaving}
            isLoading={state.isSaving}
            theme="primary"
            type="submit"
          />
        </footer>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
