import { Component, h } from 'hyperapp';
import { ToastState } from '../../state';
import Notification from '../Notification/Notification';
import './ToastList.scss';

interface Props {
  state: ToastState;
}

export const ToastList: Component<Props> = ({ state }) => (
  <div class="toast-list">
    {state.list.map((toast, index) => <Notification key={index} title={toast.title} message={toast.message} theme={toast.type} />}
  </div>
);

export default ToastList;
