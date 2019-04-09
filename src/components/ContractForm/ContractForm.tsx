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
      <div className="contract-form__column">Contract #{key + 1}</div>
      <div className="contract-form__column">
        <FormField labelText="From" required={true}>
          <FormInput
            name={startDate.name}
            value={startDate.value}
            max={endDate.value}
            type="date"
            onInputChange={updateContractFormValue(key, formActions)}
          />
        </FormField>
      </div>
      <div className="contract-form__column">
        <FormField labelText="To" required={true}>
          <FormInput
            name={endDate.name}
            value={endDate.value}
            min={startDate.value}
            type="date"
            onInputChange={updateContractFormValue(key, formActions)}
          />
        </FormField>
      </div>
      <div className="contract-form__column">
        <FormField labelText="Pensum" required={true} hint="0-100">
          <FormInput
            name={pensumPercentage.name}
            value={pensumPercentage.value}
            type="number"
            suffix="fas fa-percent"
            min={0}
            max={100}
            onInputChange={updateContractFormValue(key, formActions)}
          />
        </FormField>
      </div>
      <div className="contract-form__column contract-form__actions">
        <div className="buttons">
          <Button
            label={isEditMode ? 'Edit' : 'Create'}
            theme="secondary"
            onClick={() => isEditMode ? updateContract(state, actions) : createContract(state, key, actions)}
          />
          <Button
            label="Delete"
            onClick={() => isEditMode ? deleteContract(state, key, actions) : removeContractForm(key, actions)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
