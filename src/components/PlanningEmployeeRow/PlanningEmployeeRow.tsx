import { Component, h } from 'hyperapp';
import { Moment } from 'moment';
import './PlanningEmployeeRow.scss';
import { AllocationModel } from '../../api/dto/allocation.model';
import { AvatarItem } from '../Avatar/Avatar';
import { PlanningProjectRow } from '../PlanningProjectRow/PlanningProjectRow';
import { EmployeeExtendedModel } from '../../models/employee-extended.model';

interface Props {
  startDate: Moment;
  numberOfDays: number;
  employee: EmployeeExtendedModel;
  onAllocationClick: (allocation: AllocationModel) => void;
}

export const PlanningEmployeeRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, employee, onAllocationClick } = props;
  const { projects } = employee;

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
              onClick={(_, allocation) => onAllocationClick(allocation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
