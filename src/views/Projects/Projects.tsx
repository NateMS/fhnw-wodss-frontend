import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectModalForm from '../../components/ProjectModelForm/ProjectModalForm';
import { Actions } from '../../actions';

export const Projects: Component<ViewProps> = ({ state, actions }) => {

  const onCreateActions = (actions: Actions) => {
    actions.employee.fetchAll();
    actions.project.fetchAll();
  };

  return (
    <div oncreate={() => onCreateActions(actions)}>
      <div className="planning-container">
        <h1 className="title">Projects</h1>
        {state.project.list != null && <ProjectList state={state} actions={actions} />}
      </div>
      <ProjectModalForm state={state} actions={actions} />
    </div>
  );
};

export default Projects;
