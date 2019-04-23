import { Component, h } from 'hyperapp';
import { ToastState } from '../../state';
import Notification from '../Notification/Notification';
import './ToastList.scss';
import { ToastActions } from '../../actions/toast.actions';

interface Props {
  state: ToastState;
  actions: ToastActions;
}

export const ToastList: Component<Props> = ({ state, actions }) => (
  <div class="toast-list">
    {state.list.map(toast => (
      <Notification
        key={toast.id}
        title={toast.title}
        message={toast.message}
        theme={toast.type}
        onClose={() => actions.hide(toast.id)}
      />
    ))}
  </div>
);

export default ToastList;
