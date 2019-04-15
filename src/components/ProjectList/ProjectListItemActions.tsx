import { ProjectModel } from '../../api/dto/project.model';
import { Actions } from '../../actions';
import { showProjectEditForm } from '../../actions/form/project-form.actions';
import { deleteProject } from '../../actions/project.actions';
import { Component, h } from 'hyperapp';
import ToolTip from '../ToolTip/ToolTip';

const onEditClick = (_: Event, project: ProjectModel, actions: Actions): void => {
  showProjectEditForm(project, actions);
};

const onDeleteClick = (_: Event, project: ProjectModel, actions: Actions): void => {
  deleteProject(project, actions);
};

interface Props {
  project: ProjectModel;
  isDeleteEnabled: boolean;
  isEditEnabled: boolean;
  actions: Actions;
}

export const ProjectListItemActions: Component<Props> = (props) => {
  const { project, actions, isDeleteEnabled, isEditEnabled } = props;

  if (isDeleteEnabled === false && isEditEnabled === false) {
    return <div />;
  }

  return (
    <div className="buttons">
      {isEditEnabled && (
        <ToolTip content="Edit" placement="bottom">
          <button className="button is-secondary" onclick={(event: Event) => onEditClick(event, project, actions)}>
            <span className="icon">
              <i className="fas fa-edit"/>
            </span>
          </button>
        </ToolTip>
      )}
      {isDeleteEnabled && (
        <ToolTip content="Delete" placement="bottom">
          <button className="button" onclick={(event: Event) => onDeleteClick(event, project, actions)}>
          <span className="icon">
            <i className="fas fa-trash"/>
          </span>
          </button>
        </ToolTip>
      )}
    </div>
  );
};

export default ProjectListItemActions;
