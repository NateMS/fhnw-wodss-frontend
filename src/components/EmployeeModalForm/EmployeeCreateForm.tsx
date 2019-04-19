import { EmployeeFormState } from '../../state/form/employee-form.state';
import { Actions } from '../../actions';
import { Component, h } from 'hyperapp';
import { Role, roleList, roleNameMap } from '../../api/role';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import { FormSelect } from '../FormSelect/FormSelect';
import Button from '../Button/Button';
import { close } from './EmployeeModalForm';
import { State } from '../../state';
import { createEmployee } from '../../actions/form/employee-form.actions';
import FormHint from '../FormHint/FormHint';
import { INPUT_LENGTH_SHORT_MAX, INPUT_LENGTH_LONG_MAX } from '../../constants';

interface Props {
  state: State;
  actions: Actions;
}

const onSubmit = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();
  createEmployee(state, actions);
};

export const EmployeeCreateForm: Component<Props> = ({ state, actions }) => {
  const formState = state.form.employee;
  const { firstName, lastName, emailAddress, password, active, role } = formState.controls;
  const { employee: formActions } = actions.form;

  return (
    <form onsubmit={(event: Event) => onSubmit(event, formState, actions)}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Employee</p>
          <button
            className="button"
            type="button"
            aria-label="close"
            onclick={() => close(actions)}
          >
              <span className="icon is-small">
                <i className="fas fa-times"/>
              </span>
          </button>
        </header>
        <section className="modal-card-body">
          <FormField labelText="First Name" required={true}>
            <FormInput
              name={firstName.name}
              value={firstName.value}
              disabled={formState.isSaving}
              maxLength={INPUT_LENGTH_SHORT_MAX}
              type="text"
              errors={firstName.errors}
              onInputChange={formActions.updateValue}
            />
            {firstName.errors != null && firstName.errors.required && <FormHint theme="danger" label="First name is required" />}
          </FormField>
          <FormField labelText="Last Name" required={true}>
            <FormInput
              name={lastName.name}
              value={lastName.value}
              disabled={formState.isSaving}
              maxLength={INPUT_LENGTH_SHORT_MAX}
              type="text"
              errors={lastName.errors}
              onInputChange={formActions.updateValue}
            />
            {lastName.errors != null && lastName.errors.required && <FormHint theme="danger" label="Last name is required" />}
          </FormField>
          <FormField labelText="Email" required={true}>
            <FormInput
              name={emailAddress.name}
              value={emailAddress.value}
              disabled={formState.isSaving}
              maxLength={INPUT_LENGTH_LONG_MAX}
              type="email"
              errors={emailAddress.errors}
              onInputChange={formActions.updateValue}
            />
            {emailAddress.errors != null && emailAddress.errors.required && <FormHint theme="danger" label="Email is required" />}
            {emailAddress.errors != null && emailAddress.errors.email && <FormHint theme="danger" label="Email invalid" />}
          </FormField>
          <FormField labelText="Password" required={true}>
            <FormInput
              name={password.name}
              value={password.value}
              disabled={formState.isSaving}
              type="password"
              errors={password.errors}
              onInputChange={formActions.updateValue}
            />
            {password.errors != null && password.errors.required && <FormHint theme="danger" label="Password is required" />}
          </FormField>
          <FormField labelText="Status" required={true}>
            <FormCheckbox
              name={active.name}
              value={active.value}
              disabled={formState.isSaving}
              labelText="Active"
              errors={active.errors}
              onInputChange={formActions.updateValue}
            />
            {active.errors == null && <FormHint label="Inactive: No login possible" />}
          </FormField>
          <FormField labelText="Role" required={true}>
            <FormSelect
              name={role.name}
              value={role.value}
              disabled={formState.isSaving}
              placeholder="Please select"
              items={roleList}
              errors={role.errors}
              labeler={(r: Role) => roleNameMap[r]}
              onInputChange={formActions.updateValue}
            />
            {role.errors != null && role.errors.required && <FormHint theme="danger" label="Role is required" />}
          </FormField>
        </section>
        <footer className="modal-card-foot">
          <Button
            label="Cancel"
            onClick={() => close(actions)}
            isLoading={formState.isSaving}
            disabled={formState.isSaving}
          />
          <Button
            label="Save"
            theme="primary"
            type="submit"
            isLoading={formState.isSaving}
            disabled={formState.isSaving}
          />
        </footer>
      </div>
    </form>
  );
};

export default EmployeeCreateForm;
