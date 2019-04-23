import { Component, h } from 'hyperapp';
import { Moment } from 'moment';
import './PlanningProjectRow';
import { createDateList } from '../../utils';
import { ProjectExtendedModel } from '../../models/project-extended.model';
import AllocationCell from './AllocationCell';
import './PlanningProjectRow.scss';
import { AllocationModel } from '../../api/dto/allocation.model';

type callback = (project: ProjectExtendedModel, allocation: AllocationModel) => void;

interface Props {
  startDate: Moment;
  project: ProjectExtendedModel;
  numberOfDays: number;
  onClick: callback;
}

const createCell = (day: Moment, project: ProjectExtendedModel, callback: callback) => {
  const allocation = project.getAllocationByDate(day);

  if (allocation != null) {
    return (
      <AllocationCell
        isFilled={true}
        project={project}
        onClick={() => callback(project, allocation)}
      />
    );
  }

  return (
    <AllocationCell
      isFilled={false}
      project={project}
    />
  );

};

export const PlanningProjectRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, project, onClick } = props;

  const days: Moment[] = createDateList(startDate, numberOfDays);

  return (
    <div className="planning-project-row">
      {days.map(day => createCell(day, project, onClick))}
    </div>
  );
};
