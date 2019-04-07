import { Component, h } from 'hyperapp';
import { FormField } from '../FormField/FormField';
import FormInput from '../FormInput/FormInput';
import './ContractForm.scss';
import { ContractForm as State } from '../../state/form/contract-form.state';
import { Actions } from '../../actions';
import { FormControl } from '../../state/form/types';
import { ContractFormActions } from '../../actions/form/contract-form.actions';
import { getApiErrorToast, getToastMessage } from '../../utils';
import Button from '../Button/Button';

interface Props {
  state: State;
  actions: Actions;
  key: number;
}

const updateValue = (index: number, actions: ContractFormActions) => (control: FormControl<any>) => {
  actions.updateValue({
    index,
    control,
  });
};

// TODO RENAME STATE FORM
const createContract = (state: any, actions: Actions) => {
  actions
    .contract
    .create(state)
    .then(() => {
      actions.toast.success(getToastMessage(`Contract successfully created`));
      actions.contract.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating contract', error));
    });
};

// TODO RENAME STATE FORM
const updateContract = (state: any, actions: Actions) => {
  actions
    .contract
    .update(state)
    .then(() => {
      actions.toast.success(getToastMessage(`Contract successfully created`));
      actions.contract.fetchAll();
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error creating contract', error));
    });
};

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
            type="date"
            onInputChange={updateValue(key, formActions)}
          />
        </FormField>
      </div>
      <div className="contract-form__column">
        <FormField labelText="To" required={true}>
          <FormInput
            name={endDate.name}
            value={endDate.value}
            type="date"
            onInputChange={updateValue(key, formActions)}
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
            onInputChange={updateValue(key, formActions)}
          />
        </FormField>
      </div>
      <div className="contract-form__column contract-form__actions">
        <div className="buttons">
          <Button
            label={isEditMode ? 'Edit' : 'Create'}
            theme="secondary"
            onClick={() => isEditMode ? updateContract(state, actions) : createContract(state, actions)}
          />
          <Button label="Delete" />
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
