import { Component, h } from 'hyperapp';
import { Moment } from 'moment';
import './PlanningProjectRow';
import { createDateList } from '../../utils';
import { ProjectExtendedModel } from '../../models/project-extended.model';
import AllocationCell from './AllocationCell';
import './PlanningProjectRow.scss';

interface Props {
  startDate: Moment;
  project: ProjectExtendedModel;
  numberOfDays: number;
}

const createCell = (day: Moment, project: ProjectExtendedModel) => {
  const isBetween = project.isAllocationBetween(day);

  return <AllocationCell isFilled={isBetween} project={project} />;
};

export const PlanningProjectRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, project } = props;

  const days: Moment[] = createDateList(startDate, numberOfDays);

  return (
    <div className="planning-project-row">
      {days.map(day => createCell(day, project))}
    </div>
  );
};
