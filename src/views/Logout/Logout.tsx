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
      Take care {user.firstName} 👋
    </div>
  );
};

export default Logout;
