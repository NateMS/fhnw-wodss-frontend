import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';

export const Planning: Component<ViewProps> = ({ state }) => {
  const employee = state.user.employee!;

  return (
    <div className="planning-container">
      <h1 className="title">Planning {employee.firstName}!</h1>
    </div>
  );
};

export default Planning;
