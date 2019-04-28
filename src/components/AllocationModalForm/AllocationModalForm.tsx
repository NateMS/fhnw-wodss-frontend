import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import AllocationManageForm from './AllocationManageForm';
import { State } from '../../state';

export interface AllocationFormProps {
  state: State;
  actions: Actions;
}

export const close = (actions: Actions): void => {
  actions.form.allocation.reset();
};

const AllocationModalForm: Component<AllocationFormProps> = ({ state, actions }) => {
  const { isOpen } = state.form.allocation;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      <AllocationManageForm state={state} actions={actions} />
    </div>
  );
};

export default AllocationModalForm;
