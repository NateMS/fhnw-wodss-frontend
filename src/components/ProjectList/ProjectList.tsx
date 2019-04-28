import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { ProjectModel } from '../../api/dto/project.model';
import { State } from '../../state';
import { EmployeeModel } from '../../api/dto/employee.model';
import ProjectListItem from './ProjectListItem';
import { compareProjectByName, hasAdminRole } from '../../utils';

interface Props {
  state: State;
  actions: Actions;
}

const filterProjects = (projects: ProjectModel[], filterString: string): ProjectModel[] => {
  if (filterString.length > 0) {
    const lowerFilterString = filterString
      .toLowerCase()
      .trim();
    return projects.filter(project => project.name.toLowerCase().indexOf(lowerFilterString) > -1);
  }

  return projects;
};

const ProjectList: Component<Props> = ({ state, actions }) => {
  const { filterString } = state.view.projects;
  const user = state.user.employee!;
  const projects = [...state.project.list].sort(compareProjectByName);
  const allocations = state.allocation.list!;
  const contracts = state.contract.list!;
  const employees = state.employee.list!;

  const filteredProjects = filterProjects(projects, filterString);

  const contractEmployeeMap: Map<string, EmployeeModel> = new Map();
  const projectEmployeesMap: Map<string, Set<EmployeeModel>> = new Map();

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

  const createListItem = (project: ProjectModel) => {
    const canEdit = hasAdminRole(user.role) || user.id === project.projectManagerId;
    return (
      <ProjectListItem
        project={project}
        projectManager={employees.find(e => project.projectManagerId === e.id)!}
        employees={projectEmployeesMap.get(project.id)}
        isEditEnabled={canEdit}
        isDeleteEnabled={hasAdminRole(user.role)}
        actions={actions}
      />
    );
  };

  return (
    <div className="project-list">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <td>Name</td>
            <td>Project Manager</td>
            <td>Timespan</td>
            <td>FTE Total</td>
            <td># Devs</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project: ProjectModel) => createListItem(project))}
        </tbody>
      </table>
      <div className="project-list__counter">
        Visible: {filteredProjects.length} / {projects.length}
      </div>
    </div>
  );
};

export default ProjectList;
