import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import AllocationCreateForm from './AllocationCreateForm';
import AllocationEditForm from './AllocationEditForm';
import { State } from '../../state';

export interface AllocationFormProps {
  state: State;
  actions: Actions;
}

export const close = (actions: Actions): void => {
  actions.form.allocation.reset();
};

const AllocationModalForm: Component<AllocationFormProps> = ({ state, actions }) => {
  const { isOpen, controls } = state.form.allocation;
  const isEditMode = controls.id.value != null;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      {!isEditMode && <AllocationCreateForm state={state} actions={actions} />}
    </div>
  );
};

export default AllocationModalForm;
