import { Component, h } from 'hyperapp';
import { RoleEnum, roleList, roleNameMap } from '../../api/role.enum';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import { FormCheckbox } from '../FormCheckbox/FormCheckbox';
import Button from '../Button/Button';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import { Actions } from '../../actions';
import { close } from './EmployeeModalForm';
import ContractForm from '../ContractForm/ContractForm';
import { State } from '../../state';
import { updateEmployee } from '../../actions/employee.actions';
import FormHint from '../FormHint/FormHint';
import { INPUT_LENGTH_SHORT_MAX, INPUT_LENGTH_LONG_MAX } from '../../constants';

interface Props {
  state: State;
  actions: Actions;
}

const onSubmit = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  updateEmployee(state, actions);
};

export const EmployeeEditForm: Component<Props> = ({ state, actions }) => {
  const formState = state.form.employee;
  const { id, firstName, lastName, emailAddress, active, role } = formState.controls;
  const { employee: formActions } = actions.form;

  return (
    <form onsubmit={(event: Event) => onSubmit(event, formState, actions)}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Employee</p>
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
              maxLength={INPUT_LENGTH_SHORT_MAX}
              type="text"
              hasError={firstName.errors != null && firstName.errors.required}
              onInputChange={formActions.updateValue}
            />
            {firstName.errors != null && firstName.errors.required && <FormHint theme="danger" label="Field is required" />}
          </FormField>
          <FormField labelText="Last Name" required={true}>
            <FormInput
              name={lastName.name}
              value={lastName.value}
              maxLength={INPUT_LENGTH_SHORT_MAX}
              type="text"
              hasError={lastName.errors != null && lastName.errors.required}
              onInputChange={formActions.updateValue}
            />
            {lastName.errors != null && lastName.errors.required && <FormHint theme="danger" label="Field is required" />}
          </FormField>
          <FormField labelText="Email" required={true}>
            <FormInput
              name={emailAddress.name}
              value={emailAddress.value}
              maxLength={INPUT_LENGTH_LONG_MAX}
              type="email"
              hasError={emailAddress.errors != null && (emailAddress.errors.required || emailAddress.errors.email)}
              onInputChange={formActions.updateValue}
            />
            {emailAddress.errors != null && emailAddress.errors.required && <FormHint theme="danger" label="Field is required" />}
            {emailAddress.errors != null && emailAddress.errors.email && <FormHint theme="danger" label="Email invalid" />}
          </FormField>
          <FormField labelText="Status" required={true}>
            <FormCheckbox
              name={active.name}
              value={active.value}
              labelText="Active"
              onInputChange={formActions.updateValue}
            />
            {active.errors == null && <FormHint label={"Inactive: No login possible"} />}
          </FormField>
          <FormField labelText="Role" required={true}>
            <FormSelect
              name={role.name}
              value={role.value}
              placeholder="Please select"
              disabled={true}
              items={roleList}
              labeler={(r: RoleEnum) => roleNameMap[r]}
              hasError={role.errors != null && role.errors.required}
              onInputChange={formActions.updateValue}
            />
            {role.errors != null && role.errors.required && <FormHint theme="danger" label="Field is required" />}
          </FormField>
          {state.form.contract.list.map((contractForm, index) => <ContractForm key={index} state={contractForm} actions={actions} />)}
          <button
            type="button"
            className="button is-fullwidth"
            onclick={() => actions.form.contract.addEmpty(id.value!)}
          >
            Add Contract
          </button>
        </section>
        <footer className="modal-card-foot">
          <Button
            label="Cancel"
            disabled={formState.isSaving}
            isLoading={formState.isSaving}
            onClick={() => close(actions)}
          />
          <Button
            label="Save"
            disabled={formState.isSaving}
            isLoading={formState.isSaving}
            theme="primary"
            type="submit"
          />
        </footer>
      </div>
    </form>
  );
};

export default EmployeeEditForm;
