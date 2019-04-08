import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { EmployeeFormState } from '../../state/form/employee-form.state';
import EmployeeCreateForm from './EmployeeCreateForm';
import EmployeeEditForm from './EmployeeEditForm';

export interface EmployeeFormProps {
  state: EmployeeFormState;
  actions: Actions;
}

export const close = (actions: Actions): void => {
  actions.form.employee.reset();
};

const EmployeeModalForm: Component<EmployeeFormProps> = ({ state, actions }) => {
  const { isOpen, controls } = state;
  const isEditMode = controls.id.value != null;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      {!isEditMode && <EmployeeCreateForm state={state} actions={actions} />}
      {isEditMode && <EmployeeEditForm state={state} actions={actions} />}
    </div>
  );
};

export default EmployeeModalForm;
