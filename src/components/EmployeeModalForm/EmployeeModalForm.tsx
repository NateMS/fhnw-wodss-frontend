import { Component, h } from 'hyperapp';
import { FormState } from '../../state/form';
import { Actions } from '../../actions';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import { FormSelect } from '../FormSelect/FormSelect';
import { RoleEnum, roleNameMap } from '../../api/role.enum';
import { EmployeeModel } from '../../api/dto/employee.model';

interface Props {
  state: FormState;
  actions: Actions;
}

const submit = (state: FormState, actions: Actions) => {
  actions
    .employee
    .create(state.employee)
    .then((employee: EmployeeModel) => {
      actions.toast.success({ message: `Successfully created employee '${employee.fullName}'` });
    })
    .catch((error) => {
      actions.toast.error({ message: `Error occurred: ${error}` });
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

const EmployeeModalForm: Component<Props> = ({ state, actions }) => {
  const { isOpen } = state.employee;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  const roles: RoleEnum[] = Object
    .keys(roleNameMap)
    .map(r => (r as RoleEnum));

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Employee</p>
          <button
            className="button"
            aria-label="close"
            onclick={() => close(actions)}
          >
            <span className="icon is-small">
              <i className="fas fa-times" />
            </span>
          </button>
        </header>
        <section className="modal-card-body">
          <form>
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
          </form>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onclick={() => close(actions)}>Cancel</button>
          <button className="button is-primary" onclick={() => submit(state, actions)}>Save</button>
        </footer>
      </div>
    </div>
  );
};

export default EmployeeModalForm;
