import { Component, h } from 'hyperapp';
import LinkButton from '../../components/LinkButton/LinkButton';
import { ViewProps } from '../ViewProps';

export const Planning: Component<ViewProps> = ({ state, actions }) => {
  const user = state.user.user!;

  return (
    <div className="planning-container">
      <h1 className="title">Planning {user.firstName}!</h1>
      <LinkButton theme="primary" label="Employees" to="/employees" />
      <LinkButton theme="primary" label="Logout" to="/logout" />
    </div>
  );
};

export default Planning;
