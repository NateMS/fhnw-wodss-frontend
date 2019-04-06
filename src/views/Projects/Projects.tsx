import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';

export const Projects: Component<ViewProps> = ({ state }) => {
  const employee = state.user.employee!;

  return (
    <div className="planning-container">
      <h1 className="title">Projects {employee.firstName}!</h1>
    </div>
  );
};

export default Projects;
