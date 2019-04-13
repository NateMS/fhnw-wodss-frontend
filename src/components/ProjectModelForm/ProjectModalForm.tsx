import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import ProjectCreateForm from './ProjectCreateForm';
import { State } from '../../state';

export interface ProjectFormProps {
  state: State;
  actions: Actions;
}

export const close = (actions: Actions): void => {
  actions.form.project.reset();
};

const ProjectModalForm: Component<ProjectFormProps> = ({ state, actions }) => {
  const { isOpen } = state.form.project;
  let stateClassName = 'modal';

  if (isOpen) {
    stateClassName = `${stateClassName} is-active`;
  }

  return (
    <div className={stateClassName}>
      <div className="modal-background" />
      <ProjectCreateForm state={state} actions={actions} />
    </div>
  );
};

export default ProjectModalForm;
