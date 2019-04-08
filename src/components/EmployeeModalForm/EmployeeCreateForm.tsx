import { EmployeeFormState } from '../../state/form/employee-form.state';
import { Actions } from '../../actions';
import { EmployeeModel } from '../../api/dto/employee.model';
import { getApiErrorToast, getToastMessage } from '../../utils';
import { Component, h } from 'hyperapp';
import { RoleEnum, roleNameMap } from '../../api/role.enum';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import { FormSelect } from '../FormSelect/FormSelect';
import Button from '../Button/Button';
import { EmployeeFormProps, close } from './EmployeeModalForm';

const createEmployee = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  actions
    .employee
    .create(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getToastMessage(`Successfully created employee '${employee.fullName}'.`));

      actions.form.employee.patch({
        ...employee,
      });

      // Refresh underlying view
      actions.employee.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating employee', error));
    });
};

export const EmployeeCreateForm: Component<EmployeeFormProps> = ({ state, actions }) => {
  const { firstName, lastName, emailAddress, password, active, role } = state.controls;
  const { employee: formActions } = actions.form;

  const roles: RoleEnum[] = Object
    .keys(roleNameMap)
    .map(r => (r as RoleEnum));

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Create Employee</p>
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
      <form onsubmit={(event: Event) => createEmployee(event, state, actions)}>
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
          <FormField labelText="Email" required={true}>
            <FormInput
              name={emailAddress.name}
              value={emailAddress.value}
              type="email"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Password" required={true}>
            <FormInput
              name={password.name}
              value={password.value}
              type="password"
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
          <FormField labelText="Role" required={true}>
            <FormSelect
              name={role.name}
              value={role.value}
              placeholder="Please select"
              items={roles}
              labler={(r: RoleEnum) => roleNameMap[r]}
              onInputChange={formActions.updateValue}
            />
          </FormField>
        </section>
        <footer className="modal-card-foot">
          <Button label="Cancel" onClick={() => close(actions)} />
          <Button label="Save" theme="primary" type="submit" />
        </footer>
      </form>
    </div>
  );
};

export default EmployeeCreateForm;