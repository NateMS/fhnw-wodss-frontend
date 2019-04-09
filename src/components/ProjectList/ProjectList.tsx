import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { ProjectModel } from '../../api/dto/project.model';
import { getApiErrorToast, getToastMessage } from '../../utils';
import { State } from '../../state';
import { allocationService } from '../../services/AllocationService';
import { AllocationModel } from '../../api/dto/allocation.model';

interface Props {
  state: State;
  actions: Actions;
}

interface ProjectRow {
  project: ProjectModel;
  actions: Actions;
}

const openEditForm = (event: Event, project: ProjectModel, actions: Actions): void => {
  event.preventDefault();

  actions.form.project.patch({
    ...project,
  });

  actions.form.project.setOpen(true);
};

const deleteProject = (event: Event, project: ProjectModel, actions: Actions): void => {
  event.preventDefault();

  actions.project
    .delete(project.id)
    .then(() => {
      actions.toast.success(getToastMessage(`Project '${project.name}' successfully deleted.`));
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error deleting project', error));
    });
};

const ProjectRows: Component<ProjectRow> = ({ project, actions }) => {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.startDate} - {project.endDate}</td>
      <td>{project.ftePercentage}</td>
      <td>{/* #Devs */}</td>
      <td>
        <div className="dropdown is-right is-hoverable">
          <div className="dropdown-trigger">
            <i className="fas fa-ellipsis-h" />
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a
                href="#"
                className="dropdown-item"
                onclick={(event: Event) => openEditForm(event, project, actions)}
              >
                Edit
              </a>
              <hr className="dropdown-divider"/>
              <a
                href="#"
                className="dropdown-item"
                onclick={(event: Event) => deleteProject(event, project, actions)}
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

const ProjectList: Component<Props> = ({ state, actions }) => {
  const projects = state.project.list;
  const allocations = state.allocation.list;

  return (
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <td>Name</td>
          <td>Timespan</td>
          <td>FTE Total</td>
          <td># Devs</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {projects && projects.map((e: ProjectModel) => <ProjectRows project={e} actions={actions} />)}
      </tbody>
    </table>
  );
}

export default ProjectList;
