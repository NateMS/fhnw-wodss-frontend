import { Actions } from '../../actions';
import { Component, h } from 'hyperapp';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import { FormSelect } from '../FormSelect/FormSelect';
import Button from '../Button/Button';
import { close } from './AllocationModalForm';
import { State } from '../../state';
import { ProjectModel } from '../../api/dto/project.model';
import { EmployeeSelect } from '../EmployeeSelect/EmployeeSelect';
import { AllocationFormState } from '../../state/form/allocation-form.state';
import { ContractModel } from '../../api/dto/contract.model';

interface Props {
  state: State;
  actions: Actions;
}

const onSubmit = (event: Event, state: AllocationFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  debugger;
};

export const AllocationCreateForm: Component<Props> = ({ state, actions }) => {
  const formState = state.form.allocation;
  const { contractId, projectId, employeeId, startDate, endDate, pensumPercentage } = formState.controls;
  const { allocation: formActions } = actions.form;
  const projects = state.project.list;
  const employees = state.employee.list;
  const contracts = state.contract.list;

  return (
    <form onSubmit={(event: Event) => onSubmit(event, formState, actions)}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Allocation</p>
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
          <FormField labelText="Project" required={true}>
            <FormSelect
              items={projects}
              onInputChange={formActions.updateValue}
              name={projectId.name}
              value={projectId.value}
              valueMapper={(project: ProjectModel) => project.id}
              labeler={(project: ProjectModel) => project.name}
              comparer={(project: ProjectModel, selectedId: number) => project.id === selectedId}
            />
          </FormField>
          <FormField labelText="Employee" required={true}>
            <EmployeeSelect
              name={employeeId.name}
              value={employeeId.value}
              placeholder="Please select"
              items={employees}
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Contracts" required={true}>
            <FormSelect
              items={projects}
              onInputChange={formActions.updateValue}
              name={contractId.name}
              value={contractId.value}
              valueMapper={(contract: ContractModel) => contract.id}
              labeler={(contract: ContractModel) => `${contract.startDate} - ${contract.endDate}`}
              comparer={(contract: ContractModel, selectedId: number) => contract.id === selectedId}
            />
          </FormField>
          <FormField labelText="Start date" required={true}>
            <FormInput
              name={startDate.name}
              value={startDate.value}
              type="date"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="End date" required={true}>
            <FormInput
              name={endDate.name}
              value={endDate.value}
              type="date"
              onInputChange={formActions.updateValue}
            />
          </FormField>
          <FormField labelText="Pensum" required={true}>
            <FormInput
              name={pensumPercentage.name}
              value={pensumPercentage.value}
              suffix="fas fa-percent"
              type="number"
              onInputChange={formActions.updateValue}
            />
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
          />
        </footer>
      </div>
    </form>
  );
};

export default AllocationCreateForm;
