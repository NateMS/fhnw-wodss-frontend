import { Component, h } from 'hyperapp';
import moment from 'moment';
import { Actions } from '../../actions';
import { EmployeeModel } from '../../api/dto/employee.model';
import { State } from '../../state';
import { ContractModel } from '../../api/dto/contract.model';
import { ProjectModel } from '../../api/dto/project.model';
import EmployeeListItem from './EmployeeListItem';
import { compareEmployeeByName, hasAdminRole } from '../../utils';

interface Props {
  state: State;
  actions: Actions;
}

const filterEmployees = (employees: EmployeeModel[], filterString: string): EmployeeModel[] => {
  if (filterString.length > 0) {
    const lowerFilterString = filterString.toLowerCase();

    return employees
      .filter((employee) => {
        if (employee.fullName.toLowerCase().indexOf(lowerFilterString) > -1) {
          return true;
        }

        return employee.roleName.toLowerCase().indexOf(lowerFilterString) > -1;
      });
  }

  return employees;
};

const EmployeeList: Component<Props> = ({ state, actions }) => {
  const { filterString } = state.view.employees;
  const userRole = state.user.employee!.role;

  const employees = [...state.employee.list].sort(compareEmployeeByName);
  const contracts = state.contract.list;
  const allocations = state.allocation.list;
  const projects = state.project.list;

  const filteredEmployees = filterEmployees(employees, filterString);

  const employeesProjectMap: Map<string, Set<ProjectModel>> = new Map();
  const employeesLatestContractMap: Map<string, ContractModel | undefined> = new Map();

  allocations.forEach((allocation) => {
    const { projectId, contractId } = allocation;

    const contract = contracts.find(c => c.id === contractId);
    const project = projects.find(p => p.id === projectId);

    if (contract && project) {
      const employeeId = contract.employeeId;
      if (!employeesProjectMap.has(employeeId)) {
        employeesProjectMap.set(employeeId, new Set());
      }

      const set = employeesProjectMap.get(employeeId)!;
      set.add(project);
    }
  });

  projects.forEach((project) => {
    const { projectManagerId } = project;

    if (project) {
      if (!employeesProjectMap.has(projectManagerId)) {
        employeesProjectMap.set(projectManagerId, new Set());
      }

      const set = employeesProjectMap.get(projectManagerId)!;
      set.add(project);
    }
  });

  employees.forEach((employee) => {
    const sortedContracts = contracts
      .filter(c => c.employeeId === employee.id)
      .sort((a, b) => a.endDate.diff(b.endDate));

    let latestContract: ContractModel | undefined = undefined;

    if (sortedContracts.length > 0) {
      latestContract = sortedContracts.reduce((prev, curr) => {
        if (moment().isAfter(curr.endDate)) {
          return curr;
        }

        return prev ? prev : curr;
      });
    }

    employeesLatestContractMap.set(employee.id, latestContract);
  });

  const createEmployeeListItem = (employee: EmployeeModel) => {
    const employeeContracts = contracts!.filter(contract => contract.employeeId === employee.id);
    const projects = employeesProjectMap.get(employee.id);
    const latestContract = employeesLatestContractMap.get(employee.id);

    return (
      <EmployeeListItem
        key={employee.id}
        employee={employee}
        projects={projects}
        contract={latestContract}
        contracts={employeeContracts}
        actions={actions}
        isEditEnabled={hasAdminRole(userRole)}
        isDeleteEnabled={hasAdminRole(userRole)}
      />
    );
  };

  return (
    <div className="employee-list">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <td>Employee</td>
            <td>Role</td>
            <td># Projects</td>
            <td>Pensum</td>
            <td>Contract</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => createEmployeeListItem(employee))}
        </tbody>
      </table>
      <div className="employee-list__counter">
        Visible: {filteredEmployees.length} / {employees.length}
      </div>
    </div>
  );
};

export default EmployeeList;
