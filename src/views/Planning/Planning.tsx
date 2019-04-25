import { Component, h } from 'hyperapp';
import { ViewProps } from '../ViewProps';
import { Actions } from '../../actions';
import ProjectModalForm from '../../components/ProjectModelForm/ProjectModalForm';
import { showProjectCreateForm } from '../../actions/form/project-form.actions';
import Button from '../../components/Button/Button';
import { showAllocationCreateForm, showManageAllocationModal } from '../../actions/form/allocation-form.actions';
import { hasAdminRole, hasPrivilegedRole } from '../../utils';
import AllocationModalForm from '../../components/AllocationModalForm/AllocationModalForm';
import { AllocationModel } from '../../api/dto/allocation.model';
import PlanningCalendarRow from '../../components/PlanningCalendarRow/PlanningCalendarRow';
import { PlanningEmployeeRow } from '../../components/PlanningEmployeeRow/PlanningEmployeeRow';
import { EmployeeExtendedModel } from '../../models/employee-extended.model';
import { ProjectModel } from '../../api/dto/project.model';
import { ProjectExtendedModel } from '../../models/project-extended.model';
import { AllocationExtendedModel } from '../../models/allocation-extended.model';
import { showNext, showPrevious } from '../../actions/view/planning-view.actions';

const onRender = (actions: Actions) => {
  actions.employee.fetchAll();
  actions.project.fetchAll();
  actions.contract.fetchAll();
  actions.allocation.fetchAll();
};

export const Planning: Component<ViewProps> = ({ state, actions }) => {
  const userRole = state.user.employee!.role;
  const { startDate, granularity } = state.view.planning;

  const employees = state.employee.list;
  const contracts = state.contract.list;
  const allocations = state.allocation.list;
  const projects = state.project.list;

  const projectMap: Map<string, ProjectModel> = ProjectModel.createMap(projects);
  const contractAllocationMap: Map<string, Set<AllocationModel>> = AllocationModel.createMapByContractId(allocations);
  const extendedEmployees: EmployeeExtendedModel[] = [];

  employees.forEach((employee) => {
    const employeeContracts = contracts.filter(contract => contract.employeeId === employee.id);
    const projectExtendedMap: Map<string, ProjectExtendedModel> = new Map();

    employeeContracts.forEach((contract) => {
      const employeeAllocations = contractAllocationMap.get(contract.id);

      if (employeeAllocations != null) {
        employeeAllocations.forEach((_, allocation) => {
          const { projectId } = allocation;
          const extendedAllocation = new AllocationExtendedModel(allocation, contract);
          const project = projectMap.get(projectId);

          if (!projectExtendedMap.has(projectId) && project != null) {
            projectExtendedMap.set(projectId, new ProjectExtendedModel(project, []));
          }

          const extendedProject = projectExtendedMap.get(projectId);

          if (extendedProject != null) {
            projectExtendedMap.set(projectId, new ProjectExtendedModel(
              extendedProject,
              [...extendedProject.allocations, extendedAllocation],
            ));
          }
        });
      }
    });

    extendedEmployees.push(new EmployeeExtendedModel(employee, [...projectExtendedMap.values()]));
  });

  return (
    <div oncreate={() => onRender(actions)}>
      <div className="view-container">
        <h1 className="title">Planning</h1>
        {hasAdminRole(userRole) && (
          <Button
            theme="primary"
            label="Create Project"
            onClick={() => showProjectCreateForm(true, actions)}
          />
        )}

        {hasPrivilegedRole(userRole) && (
          <Button
            theme="primary"
            label="Create Allocation"
            onClick={() => showAllocationCreateForm(true, actions)}
          />
        )}
      </div>
      <Button
        theme="primary"
        label="Prev"
        onClick={() => showPrevious(startDate, granularity, actions)}
      />
      <Button
        theme="primary"
        label="Next"
        onClick={() => showNext(startDate, granularity, actions)}
      />
      <div className="planning-board">
        <PlanningCalendarRow
          startDate={startDate}
          numberOfDays={granularity}
        />
        {extendedEmployees.map(employee => (
          <PlanningEmployeeRow
            startDate={startDate}
            numberOfDays={granularity}
            employee={employee}
            onAllocationClick={allocation => showManageAllocationModal(allocation, contracts, actions)}
          />
        ))}
      </div>
      {state.form.project.isOpen && <ProjectModalForm state={state} actions={actions} />}
      {state.form.allocation.isOpen && <AllocationModalForm state={state} actions={actions} />}
    </div>
  );
};

export default Planning;
