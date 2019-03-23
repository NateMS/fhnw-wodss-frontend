import { Component, h } from 'hyperapp';
import LinkButton from '../../components/LinkButton/LinkButton';
import { ViewProps } from '../ViewProps';

export const Employees: Component<ViewProps> = ({ state, actions }) => {
  const user = state.user.user!;

  if (user == null) {
    throw new Error('User has to be defined to view the Employees');
  }

  return (
    <div className="employees-container">
      <h1 className="title">Employees {user.firstName}!</h1>
      <LinkButton theme="primary" label="Planning" to="/planning" />
      <LinkButton theme="primary" label="Logout" to="/logout" />
    </div>
  );
};

export default Employees;
