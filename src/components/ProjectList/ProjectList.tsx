import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { ProjectModel } from '../../api/dto/project.model';
import { State } from '../../state';
import { deleteProject } from '../../actions/project.actions';
import { showProjectEditForm } from '../../actions/form/project-form.actions';
import { EmployeeModel } from '../../api/dto/employee.model';

interface Props {
  state: State;
  actions: Actions;
}

interface ProjectRow {
  project: ProjectModel;
  employees: Set<EmployeeModel> | undefined;
  actions: Actions;
}

const onEditClick = (event: Event, project: ProjectModel, actions: Actions): void => {
  event.preventDefault();
  showProjectEditForm(project, actions);
};

const onDeleteClick = (event: Event, project: ProjectModel, actions: Actions): void => {
  event.preventDefault();
  deleteProject(project, actions);
};

const filterProjects = (projects: ProjectModel[], filterString: string): ProjectModel[] => {
  if (filterString.length > 0) {
    return projects.filter((project) => project.name.toLowerCase().indexOf(filterString) > -1);
  }

  return projects;
};

const ProjectRowItem: Component<ProjectRow> = ({ project, employees, actions }) => {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.startDate} - {project.endDate}</td>
      <td>{project.ftePercentage}</td>
      <td>{employees != null ? employees.size : 0}</td>
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
                onclick={(event: Event) => onEditClick(event, project, actions)}
              >
                Edit
              </a>
              <hr className="dropdown-divider"/>
              <a
                href="#"
                className="dropdown-item"
                onclick={(event: Event) => onDeleteClick(event, project, actions)}
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
  const { filterString } = state.view.projects;
  const projects = state.project.list!;
  const allocations = state.allocation.list!;
  const contracts = state.contract.list!;
  const employees = state.employee.list!;

  const filteredProjects = filterProjects(projects, filterString);

  const contractEmployeeMap: Map<number, EmployeeModel> = new Map();
  const projectEmployeesMap: Map<number, Set<EmployeeModel>> = new Map();

  contracts.forEach((contract) => {
    const { id, employeeId } = contract;

    const employee = employees.find(e => e.id === employeeId);

    if (employee) {
      contractEmployeeMap.set(id, employee);
    }
  });

  allocations.forEach((allocation) => {
    const { projectId, contractId } = allocation;

    if (!projectEmployeesMap.has(projectId)) {
      projectEmployeesMap.set(projectId, new Set());
    }

    const set = projectEmployeesMap.get(projectId)!;
    const employee = contractEmployeeMap.get(contractId);

    if (employee != null) {
      set.add(employee);
    }
  });

  const createProjectRowItem = (project: ProjectModel) => (
    <ProjectRowItem
      project={project}
      employees={projectEmployeesMap.get(project.id)}
      actions={actions}
    />
  );

  return (
    <div className="project-list">
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
          {filteredProjects.map((project: ProjectModel) => createProjectRowItem(project))}
        </tbody>
      </table>
      <div className="project-list__counter">
        Visible: {filteredProjects.length} / {projects.length}
      </div>
    </div>
  );
}

export default ProjectList;
