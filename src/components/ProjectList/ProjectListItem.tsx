import { ProjectModel } from '../../api/dto/project.model';
import { EmployeeModel } from '../../api/dto/employee.model';
import { Actions } from '../../actions';
import { Component, h } from 'hyperapp';
import { AvatarItem } from '../Avatar/Avatar';
import ProjectListItemActions from './ProjectListItemActions';
import { DATE_FORMAT_STRING } from '../../constants';

interface Props {
  project: ProjectModel;
  projectManager: EmployeeModel;
  employees: Set<EmployeeModel> | undefined;
  isDeleteEnabled: boolean;
  isEditEnabled: boolean;
  actions: Actions;
}

export const ProjectListItem: Component<Props> = (props) => {
  const { project, projectManager, employees, actions, isDeleteEnabled, isEditEnabled } = props;

  return (
    <tr>
      <td>{project.name}</td>
      <td><AvatarItem fullName={projectManager.fullName} /></td>
      <td>
        {project.startDate && project.endDate ?
          `${project.startDate.format(DATE_FORMAT_STRING)} – ${project.endDate.format(DATE_FORMAT_STRING)}` :
          '–'
        }
      </td>
      <td>{project.ftePercentage}</td>
      <td>{employees != null ? employees.size : 0}</td>
      <td>
        <ProjectListItemActions
          project={project}
          isDeleteEnabled={isDeleteEnabled}
          isEditEnabled={isEditEnabled}
          actions={actions}
        />
      </td>
    </tr>
  );
};

export default ProjectListItem;
