import { Component, h } from 'hyperapp';
import { FormState } from '../../state/form';
import { Actions } from '../../actions';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import { FormSelect } from '../FormSelect/FormSelect';
import { RoleEnum, roleNameMap } from '../../api/role.enum';
import { Employee } from '../../api/dto/employee';
import { EmployeeModel } from '../../api/dto/employee.model';
import EmployeeSelect from '../EmployeeSelect/EmployeeSelect';

interface Props {
  state: FormState;
  actions: Actions;
}

const close: (actions: Actions) => void  = (actions) => {
  actions.form.reset('employee');
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

  const employees: EmployeeModel[] = [
    new EmployeeModel({ firstName: 'Kelvin', lastName: 'Louis', id: 1, emailAddress: 'kelv' }),
    new EmployeeModel({ firstName: 'Nicola', lastName: 'Cocquio', id: 2, emailAddress: 'kelv' }),
    new EmployeeModel({ firstName: 'Christoph', lastName: 'Christen', id: 3, emailAddress: 'kelv' }),
    new EmployeeModel({ firstName: 'Sandra', lastName: 'Amport', id: 4, emailAddress: 'kelv' }),
  ];

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
                onInputChange={}
              />
            </FormField>
            <FormField labelText="Last Name" required={true}>
              <FormInput
                fieldName="lastName"
                type="text"
                value={state.employee.lastName}
                onInputChange={}
              />
            </FormField>
            <FormField labelText="Email" required={true}>
              <FormInput
                fieldName="emailAddress"
                type="email"
                value={state.employee.emailAddress}
                onInputChange={}
              />
            </FormField>
            <FormField labelText="Password" required={true}>
              <FormInput
                fieldName="password"
                type="password"
                value={state.employee.password}
                onInputChange={}
              />
            </FormField>
            <FormField labelText="Status" required={true} hint="Inactive: No login possible">
              <FormCheckbox
                labelText="Active"
                fieldName="active"
                value={state.employee.active}
                onInputChange={}
              />
            </FormField>
            <FormField labelText="Role" required={true}>
              <FormSelect
                placeholder="Please select"
                fieldName="active"
                items={roles}
                value={state.employee.active}
                labler={(r: RoleEnum) => roleNameMap[r]}
                onInputChange={}
              />
            </FormField>
            <FormField labelText="Employee" required={true}>
              <EmployeeSelect
                placeholder="Please select"
                fieldName="employee"
                items={employees}
                value={employees[0]}
                onInputChange={}
              />
            </FormField>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onclick={() => close(actions)}>Cancel</button>
          <button className="button is-primary">Save</button>
        </footer>
      </div>
    </div>
  );
};

export default EmployeeModalForm;
