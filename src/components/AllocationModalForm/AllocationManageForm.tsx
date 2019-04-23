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
import { ContractModel } from '../../api/dto/contract.model';
import DatePicker from '../DatePicker/DatePicker';
import { formatDateRange, getDaysOfDateRange } from '../../utils';
import FormHint from '../FormHint/FormHint';
import { AllocationFormState } from '../../state/form/allocation-form.state';
import { removeAllocation, createAllocation, updateAllocation } from '../../actions/form/allocation-form.actions';
import { AllocationModel } from '../../api/dto/allocation.model';

interface Props {
  state: State;
  actions: Actions;
}

const remove = (state: AllocationFormState, actions: Actions) => {
  const { id } = state.controls;

  removeAllocation(id.value!, actions);
};

const onSubmit = (event: Event, isEditMode: boolean, state: AllocationFormState, actions: Actions) => {
  event.preventDefault();
  event.stopPropagation();

  if (!isEditMode) {
    createAllocation(state, actions);
  } else {
    updateAllocation(state, actions);
  }
};

export const AllocationManageForm: Component<Props> = ({ state, actions }) => {
  const formState = state.form.allocation;
  const { id, contractId, projectId, employeeId, startDate, endDate, pensumPercentage } = formState.controls;
  const { allocation: formActions } = actions.form;

  const isEditMode = id.value != null;

  const projects = state.project.list;
  const employees = state.employee.list;
  const contracts = state.contract.list;
  const allocations = state.allocation.list;

  let userContracts: ContractModel[] = [];
  let selectedAllocation: AllocationModel | undefined;
  let selectedContract: ContractModel | undefined;
  let selectedProject: ProjectModel | undefined;
  let plannedPercentage: number = 0;
  let totalAllocatedPercentage: number = 0;

  if (id.value != null) {
    selectedAllocation = allocations.find(a => a.id === id.value);

    if (selectedAllocation == null) {
      throw new Error('Expected allocation model to exist');
    }
  }

  if (employeeId.value != null) {
    userContracts = contracts.filter(c => c.employeeId === employeeId.value);
  }

  if (contractId.value != null) {
    selectedContract = contracts.find(c => c.id === contractId.value);
  }

  if (projectId.value != null) {
    selectedProject = projects.find(p => p.id === projectId.value);

    if (selectedProject == null) {
      throw new Error(`A project model should exist for ${projectId.value}`);
    }

    if (isEditMode) {
      // Removes the edited allocation from the total
      totalAllocatedPercentage = selectedProject.getTotalAllocatedPercentage(allocations, selectedAllocation!);
    } else {
      totalAllocatedPercentage = selectedProject.getTotalAllocatedPercentage(allocations);
    }
  }

  const isDateRangeDefined = (startDate.value != null && endDate.value != null);

  if (isDateRangeDefined && pensumPercentage.value) {
    plannedPercentage = getDaysOfDateRange(startDate.value!, endDate.value!, true) * pensumPercentage.value;
  }

  return (
    <form onsubmit={(event: Event) => onSubmit(event, isEditMode, formState, actions)}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{!isEditMode ? 'Create' : 'Manage'} Allocation</p>
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
          <div className="columns">
            <div className="column is-one-third">
              <FormField labelText="Project" required={true}>
                <FormSelect
                  items={projects}
                  onInputChange={formActions.updateValue}
                  name={projectId.name}
                  value={projectId.value}
                  placeholder="Please select"
                  valueMapper={(project: ProjectModel) => project.id}
                  labeler={(project: ProjectModel) => project.name}
                  comparer={(project: ProjectModel, selectedId: string) => project.id === selectedId}
                  errors={projectId.errors}
                />
                {selectedProject == null && projectId.errors != null && projectId.errors.required &&
                  <FormHint theme="danger" label="Project is required" />}
                {selectedProject != null && projectId.errors == null && (
                  <FormHint label={formatDateRange(selectedProject.startDate, selectedProject.endDate)}/>
                )}
              </FormField>
            </div>
            <div className="column is-one-third"/>
            <div className="column is-one-third">
              {selectedProject != null && (
                <span>
                  {totalAllocatedPercentage} / {selectedProject!.totalPercentage}%
                </span>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <FormField labelText="Employee" required={true}>
                <EmployeeSelect
                  name={employeeId.name}
                  value={employeeId.value}
                  placeholder="Please select"
                  items={employees}
                  errors={employeeId.errors}
                  onInputChange={formActions.updateValue}
                />
                {employeeId.errors != null && employeeId.errors.required &&
                  <FormHint theme="danger" label="Employee is required" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              {employeeId.value != null && userContracts.length > 0 && (
                <FormField labelText="Contract" required={true}>
                  <FormSelect
                    items={userContracts}
                    onInputChange={formActions.updateValue}
                    name={contractId.name}
                    value={contractId.value}
                    valueMapper={(contract: ContractModel) => contract.id}
                    labeler={(contract: ContractModel) => formatDateRange(contract.startDate, contract.endDate)}
                    comparer={(contract: ContractModel, selectedId: string) => contract.id === selectedId}
                    errors={contractId.errors}
                  />
                  {selectedContract == null && projectId.errors != null && projectId.errors.required &&
                  <FormHint theme="danger" label="Contract is required" />}
                  {selectedContract != null && projectId.errors == null && (
                    <FormHint label={`Pensum: ${selectedContract.pensumPercentage}%`}/>
                  )}
                </FormField>
              )}
              {employeeId.value != null && userContracts.length === 0 && (
                <span>Employee has no contracts</span>
              )}
              {employeeId.value != null && (
                <FormField labelText="Pensum" required={true}>
                  <FormInput
                    name={pensumPercentage.name}
                    value={pensumPercentage.value}
                    max={selectedContract ? selectedContract.pensumPercentage : undefined}
                    suffix="fas fa-percent"
                    type="number"
                    onInputChange={formActions.updateValue}
                  />
                  {selectedContract != null && (
                    <FormHint label={`Maximum percentage: ${selectedContract.pensumPercentage}`} />
                  )}
                </FormField>
              )}
            </div>
            <div className="column is-one-third"/>
          </div>
          <div className="columns">
            <div className="column is-one-third">
              <FormField labelText="Start date" required={true}>
                <DatePicker
                  name={startDate.name}
                  value={startDate.value}
                  max={endDate.value}
                  errors={startDate.errors}
                  onInputChange={formActions.updateValue}
                />
                {startDate.errors != null && startDate.errors.negativeDuration &&
                  <FormHint theme="danger" label="Allocation has negative duration" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              <FormField labelText="End date" required={true}>
                <DatePicker
                  name={endDate.name}
                  value={endDate.value}
                  min={startDate.value}
                  errors={endDate.errors}
                  onInputChange={formActions.updateValue}
                />
                {endDate.errors != null && endDate.errors.negativeDuration &&
                  <FormHint theme="danger" label="Allocation has negative duration" />}
              </FormField>
            </div>
            <div className="column is-one-third">
              {isDateRangeDefined && <span>{plannedPercentage}%</span>}
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third"/>
            <div className="column is-one-third"/>
            <div className="column is-one-third">
              {selectedProject != null && (
                <span>
                  {plannedPercentage + totalAllocatedPercentage} / {selectedProject.totalPercentage}%
                </span>
              )}
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <Button
            label="Delete"
            onClick={() => remove(formState, actions)}
            isLoading={formState.isSaving}
            disabled={formState.isSaving}
          />
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

export default AllocationManageForm;
