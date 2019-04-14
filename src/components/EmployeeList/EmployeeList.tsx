import { Component, h } from 'hyperapp';
import { Actions } from '../../actions';
import { EmployeeModel } from '../../api/dto/employee.model';
import { State } from '../../state';
import { AvatarItem } from '../Avatar/Avatar';
import { getApiErrorToast, getToastMessage } from '../../utils';
import { ContractModel } from '../../api/dto/contract.model';
import { ProjectModel } from '../../api/dto/project.model';
import moment from 'moment'

interface Props {
  state: State;
  actions: Actions;
}

interface EmployeeRow {
  employee: EmployeeModel;
  projects: Set<ProjectModel> | undefined;
  contract: ContractModel | undefined;
  contracts: ContractModel[];
  actions: Actions;
}

const openEditForm = (event: Event, employee: EmployeeModel, contracts: ContractModel[], actions: Actions): void => {
  event.preventDefault();

  actions.form.contract.patchAll(contracts);
  actions.form.employee.patch({
    ...employee,
  });

  actions.form.employee.setOpen(true);
};

const deleteEmployee = (event: Event, employee: EmployeeModel, actions: Actions): void => {
  event.preventDefault();

  actions.employee
    .delete(employee.id)
    .then(() => {
      actions.toast.success(getToastMessage(`Employee '${employee.fullName}' successfully deleted.`));
    })
    .catch((error: Error) => {
      actions.toast.error(getApiErrorToast('Error deleting employee', error));
    });
};

const filterEmployees = (employees: EmployeeModel[], filterString: string): EmployeeModel[] => {
  if (filterString.length > 0) {
    return employees
      .filter((employee) => {
        if (employee.fullName.toLowerCase().indexOf(filterString) > -1) {
          return true;
        }

        return employee.roleName.toLowerCase().indexOf(filterString) > -1;
      });
  }

  return employees;
};

const EmployeeListItem: Component<EmployeeRow> = ({ employee, projects, contract, contracts, actions }) => {
  return (
    <tr>
      <td><AvatarItem fullName={employee.fullName} /></td>
      <td>{employee.roleName}</td>
      <td>{(projects != null) ? projects.size : 0}</td>
      <td>{(contract != null) ? `${contract.pensumPercentage}%` : "-"}</td>
      <td>{(contract != null) ? `${contract.startDate} – ${contract.endDate}` : "-"}</td>
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
                onclick={(event: Event) => openEditForm(event, employee, contracts, actions)}
              >
                Edit
              </a>
              <hr className="dropdown-divider" />
              <a
                href="#"
                className="dropdown-item"
                onclick={(event: Event) => deleteEmployee(event, employee, actions)}
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

const EmployeeList: Component<Props> = ({ state, actions }) => {
  const { filterString } = state.view.employees;
  const employees = state.employee.list;
  const contracts = state.contract.list;
  const allocations = state.allocation.list;
  const projects = state.project.list;

  const filteredEmployees = filterEmployees(employees, filterString);

  const employeesProjectMap: Map<number, Set<ProjectModel>> = new Map();
  const employeesLatestContractMap: Map<number, ContractModel | undefined> = new Map();

  allocations.forEach((allocation) => {
    const { projectId, contractId } = allocation;

    const contract = contracts.find(c => c.id === contractId);
    const project = projects.find(p => p.id === projectId);

    if (contract && project) {
      const employeeId = contract.employeeId;
      if (!employeesProjectMap.has(employeeId)) {
        employeesProjectMap.set(employeeId, new Set())
      }

      const set = employeesProjectMap.get(employeeId)!;
      set.add(project);
    }
  });

  projects.forEach((project) => {
    const { projectManagerId } = project;

    if (project) {
      if (!employeesProjectMap.has(projectManagerId)) {
        employeesProjectMap.set(projectManagerId, new Set())
      }

      const set = employeesProjectMap.get(projectManagerId)!;
      set.add(project);
    }
  });

  employees.forEach((employee) => {
    const sortedContracts = contracts
                              .filter(c => c.employeeId == employee.id)
                              .sort((a, b) => a.endDate.diff(b.endDate))
    var latestContract: ContractModel | undefined = undefined;
    if (sortedContracts.length > 0) {
      latestContract = sortedContracts.reduce((prev, curr) => {
        if (moment().isAfter(curr.endDate)) {
          return curr;
        } else {
          return prev ? prev : curr;
        }
      });
    }
    employeesLatestContractMap.set(employee.id, latestContract);
  });

  const createEmployeeListItem = (employee: EmployeeModel) => {
    const employeeContracts = contracts!.filter(contract => contract.employeeId === employee.id);
    const projects = employeesProjectMap.get(employee.id);
    const latestContract = employeesLatestContractMap.get(employee.id);

    return <EmployeeListItem
              key={employee.id}
              employee={employee}
              projects={projects}
              contract={latestContract}
              contracts={employeeContracts}
              actions={actions} />;
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
