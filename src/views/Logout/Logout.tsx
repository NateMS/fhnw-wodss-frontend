import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';

export const Logout: Component<ViewProps> = ({ state, actions }) => {
  const user = state.user.employee!;

  setTimeout(
    () => {
      actions.user.logout();
    },
    2000,
  );

  return (
    <div className="logout-container">
      <h1 class="title">Take care {user.firstName} 👋</h1>
    </div>
  );
};

export default Logout;
