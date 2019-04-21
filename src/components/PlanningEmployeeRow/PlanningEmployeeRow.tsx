import { Component, h } from 'hyperapp';
import { Moment } from 'moment';
import './PlanningEmployeeRow.scss';
import { AllocationModel } from '../../api/dto/allocation.model';
import { AvatarItem } from '../Avatar/Avatar';
import { PlanningProjectRow, ProjectPlanningRow } from '../PlanningProjectRow/PlanningProjectRow';
import { EmployeeExtendedModel } from '../../models/employee-extended.model';

interface Props {
  startDate: Moment;
  numberOfDays: number;
  employee: EmployeeExtendedModel;
  onAllocationClick: (allocation: AllocationModel) => void;
}

export const PlanningEmployeeRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, employee } = props;
  const { projects } = employee;

  // const projectStartDate = project.startDate;
  // const projectEndDate = project.endDate;

  // TODO CREATE DUMMY ROW IF NO PROJECTS ARE AVAILABLE

  return (
    <div className="planning-employee-row">
      <div className="planning-row planning-row--employee">
        <div className="planning-col planning-col--label">
          <AvatarItem fullName={employee.fullName}/>
        </div>
        <div className="planning-col-container">
          {projects.map(project => (
            <PlanningProjectRow
              startDate={startDate}
              numberOfDays={numberOfDays}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// {/*<div className={`planning-col ${isBetweenDates(projectStartDate, projectEndDate, day) ? 'planning-col--filled' : ''}`}></div>*/}
