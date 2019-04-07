import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import { FormSelect } from '../FormSelect/FormSelect';
import { RoleEnum, roleNameMap } from '../../api/role.enum';
import { EmployeeModel } from '../../api/dto/employee.model';
import { getApiErrorToast } from '../../utils';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import Button from '../Button/Button';

interface Props {
  state: EmployeeFormState;
  actions: Actions;
}

const createEmployee = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  actions
    .employee
    .create(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success({ message: `Successfully created employee '${employee.fullName}'.` });
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating employee', error));
    });
};

const close = (actions: Actions): void => {
  actions.form.employee.reset();
};

const EmployeeCreateForm: Component<Props> = ({ state, actions }) => {
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

const EmployeeModalForm: Component<Props> = ({ state, actions }) => {
  const { isOpen, id } = state;
  const isEditMode = id != null;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      {!isEditMode && <EmployeeCreateForm state={state} actions={actions} />}
    </div>
  );
};

export default EmployeeModalForm;
