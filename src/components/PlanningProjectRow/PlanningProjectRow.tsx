import { Component, h } from 'hyperapp';
import { Moment } from 'moment';
import './PlanningProjectRow';
import { createDateList, getRandomHexColor } from '../../utils';
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

export const PlanningProjectRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, project, onClick } = props;

  const days: Moment[] = createDateList(startDate, numberOfDays);
  const allocationCells: any[] = [];

  let prevAllocation: AllocationModel | undefined = undefined;
  let dayIndex = 0;

  while (dayIndex < numberOfDays) {
    const allocation = project.getAllocationByDate(days[dayIndex]);

    if (allocation != null) {
      allocationCells.push((
        <AllocationCell
          color={getRandomHexColor(`${project.id}-${project.name}`)}
          projectName={(!prevAllocation || allocation !== prevAllocation)  ? project.name : undefined}
          pensum={allocation.pensumPercentage}
          isFilled={true}
          onClick={() => onClick(project, allocation)}
        />
      ));
      prevAllocation = allocation;
    } else {
      allocationCells.push(<AllocationCell />);
    }

    dayIndex = dayIndex + 1;
  }

  return <div className="planning-project-row">{allocationCells}</div>;
};
