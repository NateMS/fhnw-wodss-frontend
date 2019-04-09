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
import { EmployeeModel } from '../../api/dto/employee.model';
import { getApiErrorToast, getToastMessage } from '../../utils';
import ContractForm from '../ContractForm/ContractForm';
import { State } from '../../state';

interface Props {
  state: State;
  actions: Actions;
}

const updateEmployee = (event: Event, state: EmployeeFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  actions
    .employee
    .update(state)
    .then((employee: EmployeeModel) => {
      actions.toast.success(getToastMessage(`Successfully updated employee '${employee.fullName}'.`));

      // Refresh underlying view
      actions.employee.fetchAll();
      actions.form.employee.reset();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error updating employee', error));
    });
};

export const EmployeeEditForm: Component<Props> = ({ state, actions }) => {
  const formState = state.form.employee;
  const { id, firstName, lastName, emailAddress, active, role } = formState.controls;
  const { employee: formActions } = actions.form;

  return (
    <form onSubmit={(event: Event) => updateEmployee(event, formState, actions)}>
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
              labeler={(r: RoleEnum) => roleNameMap[r]}
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
