import { Component, h } from 'hyperapp';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import './ContractForm.scss';
import { ContractForm as State } from '../../state/form/contract-form.state';
import { Actions } from '../../actions';
import {
  removeContractForm,
  updateContractFormValue,
} from '../../actions/form/contract-form.actions';
import Button from '../Button/Button';
import { createContract, deleteContract, updateContract } from '../../actions/contract.actions';
import DatePicker from '../DatePicker/DatePicker';
import FormHint from '../FormHint/FormHint';
import { CONTRACT_PENSUM_VALUE_MIN, CONTRACT_PENSUM_VALUE_MAX } from '../../constants';
import ToolTip from '../ToolTip/ToolTip';

interface Props {
  state: State;
  actions: Actions;
  key: number;
}

// TODO Rename Component Name?
export const ContractForm: Component<Props> = ({ state, actions, key }) => {
  const { id, startDate, endDate, pensumPercentage } = state.controls;
  const formActions = actions.form.contract;
  const isEditMode = id.value != null;

  return (
    <div className="contract-form">
      <div className="contract-form__column">
        <span className="contract-form__label">Contract #{key + 1}</span>
      </div>
      <div className="contract-form__column">
        <FormField labelText="From" required={true}>
          <DatePicker
            name={startDate.name}
            value={startDate.value}
            max={endDate.value}
            errors={startDate.errors}
            onInputChange={updateContractFormValue(key, formActions)}
          />
          {startDate.errors != null && startDate.errors.negativeDuration &&
            <FormHint theme="danger" label="Contract has negative duration" />}
        </FormField>
      </div>
      <div className="contract-form__column">
        <FormField labelText="To" required={true}>
          <DatePicker
            name={endDate.name}
            value={endDate.value}
            min={startDate.value}
            errors={endDate.errors}
            onInputChange={updateContractFormValue(key, formActions)}
          />
          {endDate.errors != null && endDate.errors.negativeDuration &&
            <FormHint theme="danger" label="Contract has negative duration" />}
        </FormField>
      </div>
      <div className="contract-form__column">
        <FormField labelText="Pensum" required={true}>
          <FormInput
            name={pensumPercentage.name}
            value={pensumPercentage.value}
            type="number"
            suffix="fas fa-percent"
            min={CONTRACT_PENSUM_VALUE_MIN}
            max={CONTRACT_PENSUM_VALUE_MAX}
            onInputChange={updateContractFormValue(key, formActions)}
          />
        </FormField>
      </div>
      <div className="contract-form__column contract-form__actions">
        <ToolTip content="Save" placement="bottom">
          <button
            className="button is-secondary"
            onclick={() => isEditMode ? updateContract(state, actions) : createContract(state, key, actions)}
          >
            <span className="icon">
              <i className="fas fa-edit"/>
            </span>
          </button>
        </ToolTip>
        <ToolTip content="Delete" placement="bottom">
          <button
            className="button"
            onclick={() => () => isEditMode ? deleteContract(state, key, actions) : removeContractForm(key, actions)}
          >
            <span className="icon">
              <i className="fas fa-trash"/>
            </span>
          </button>
        </ToolTip>
      </div>
    </div>
  );
};

export default ContractForm;
