import { Component, h } from 'hyperapp';
import { FormState } from '../../state/form';
import { Actions } from '../../actions';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import { FormSelect } from '../FormSelect/FormSelect';
import { RoleEnum, roleNameMap } from '../../api/role.enum';
import { EmployeeModel } from '../../api/dto/employee.model';
import { getApiErrorToast } from '../../utils';

interface Props {
  state: FormState;
  actions: Actions;
}

const createEmployee = (state: FormState, actions: Actions) => {
  actions
    .employee
    .create(state.employee)
    .then((employee: EmployeeModel) => {
      actions.toast.success({ message: `Successfully created employee '${employee.fullName}'.` });
    })
    .catch((error) => {
      actions.toast.error(getApiErrorToast('Error creating employee', error));
    });
};

const updateEmployee = (state: FormState, actions: Actions) => {
  actions
    .employee
    .update(state.employee)
    .then((employee: EmployeeModel) => {
      actions.toast.success({ message: `Successfully updated employee '${employee.fullName}'.` });
    })
    .catch((error) => {
      actions.toast.error(getApiErrorToast('Error creating employee', error));
    });
};

const close: (actions: Actions) => void  = (actions) => {
  actions.form.reset('employee');
};

const updateField = (actions: Actions, fieldName: string, value: any) => {
  actions.form.updateField({
    fieldName,
    value,
    formName: 'employee',
  });
};

const EmployeeCreateForm: Component<Props> = ({ state, actions }) => {
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
      <form onsubmit={() => createEmployee(state, actions)}>
        <section className="modal-card-body">
          <FormField labelText="First Name" required={true}>
            <FormInput
              fieldName="firstName"
              type="text"
              value={state.employee.firstName}
              onInputChange={value => updateField(actions, 'firstName', value)}
            />
          </FormField>
          <FormField labelText="Last Name" required={true}>
            <FormInput
              fieldName="lastName"
              type="text"
              value={state.employee.lastName}
              onInputChange={value => updateField(actions, 'lastName', value)}
            />
          </FormField>
          <FormField labelText="Email" required={true}>
            <FormInput
              fieldName="emailAddress"
              type="email"
              value={state.employee.emailAddress}
              onInputChange={value => updateField(actions, 'emailAddress', value)}
            />
          </FormField>
          <FormField labelText="Password" required={true}>
            <FormInput
              fieldName="password"
              type="password"
              value={state.employee.password}
              onInputChange={value => updateField(actions, 'password', value)}
            />
          </FormField>
          <FormField labelText="Status" required={true} hint="Inactive: No login possible">
            <FormCheckbox
              labelText="Active"
              fieldName="active"
              value={state.employee.active}
              onInputChange={value => updateField(actions, 'active', value)}
            />
          </FormField>
          <FormField labelText="Role" required={true}>
            <FormSelect
              placeholder="Please select"
              fieldName="role"
              items={roles}
              value={state.employee.active}
              labler={(r: RoleEnum) => roleNameMap[r]}
              onInputChange={value => updateField(actions, 'role', value)}
            />
          </FormField>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => close(actions)}>Cancel</button>
          <button className="button is-primary" type="submit">Save</button>
        </footer>
      </form>
    </div>
  );
};

const EmployeeEditForm: Component<Props> = ({ state, actions }) => {
  const roles: RoleEnum[] = Object
    .keys(roleNameMap)
    .map(r => (r as RoleEnum));

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
      <form onsubmit={() => updateEmployee(state, actions)}>
        <section className="modal-card-body">
          <FormField labelText="First Name" required={true}>
            <FormInput
              fieldName="firstName"
              type="text"
              value={state.employee.firstName}
              onInputChange={value => updateField(actions, 'firstName', value)}
            />
          </FormField>
          <FormField labelText="Last Name" required={true}>
            <FormInput
              fieldName="lastName"
              type="text"
              value={state.employee.lastName}
              onInputChange={value => updateField(actions, 'lastName', value)}
            />
          </FormField>
          <FormField labelText="Role" required={true}>
            <FormSelect
              placeholder="Please select"
              fieldName="role"
              items={roles}
              value={state.employee.active}
              labler={(r: RoleEnum) => roleNameMap[r]}
              onInputChange={value => updateField(actions, 'role', value)}
            />
          </FormField>
          <FormField labelText="Email" required={true}>
            <FormInput
              fieldName="emailAddress"
              type="email"
              value={state.employee.emailAddress}
              onInputChange={value => updateField(actions, 'emailAddress', value)}
            />
          </FormField>
          <FormField labelText="Status" required={true} hint="Inactive: No login possible">
            <FormCheckbox
              labelText="Active"
              fieldName="active"
              value={state.employee.active}
              onInputChange={value => updateField(actions, 'active', value)}
            />
          </FormField>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={() => close(actions)}>Cancel</button>
          <button className="button is-primary" type="submit">Save</button>
        </footer>
      </form>
    </div>
  );
};

const EmployeeModalForm: Component<Props> = ({ state, actions }) => {
  const { isOpen, id } = state.employee;
  const isEditMode = id != null;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      {!isEditMode && <EmployeeCreateForm state={state} actions={actions} />}
      {isEditMode && <EmployeeEditForm state={state} actions={actions} />}
    </div>
  );
};

export default EmployeeModalForm;
