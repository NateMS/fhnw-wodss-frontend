import { Component, h } from 'hyperapp';
import { Moment } from 'moment';
import './PlanningProjectRow';
import { createDateList, formatDateRange, getRandomHexColor } from '../../utils';
import { ProjectExtendedModel } from '../../models/project-extended.model';
import AllocationCell from './AllocationCell';
import './PlanningProjectRow.scss';
import { AllocationModel } from '../../api/dto/allocation.model';
import ToolTip from '../ToolTip/ToolTip';

type callback = (project: ProjectExtendedModel, allocation: AllocationModel) => void;

interface Props {
  startDate: Moment;
  project?: ProjectExtendedModel;
  numberOfDays: number;
  onClick?: callback;
}

const createAllocationTooltip = (project: ProjectExtendedModel, allocation: AllocationModel): string => {
  return `
    <b>${project.name} (${allocation.pensumPercentage}%)</b>
    <br />
    Allocation Duration: ${formatDateRange(allocation.startDate, allocation.endDate)}
    <br/>
    Project Duration: ${formatDateRange(project.startDate, project.endDate)}
  `;
};

const createProjectTooltip = (project: ProjectExtendedModel): string => {
  return `
    <b>${project.name}</b>
    <br/>
    Project Duration: ${formatDateRange(project.startDate, project.endDate)}
  `;
};

export const PlanningProjectRow: Component<Props> = (props) => {
  const { startDate, numberOfDays, project, onClick } = props;
  const onClickHandler = onClick != null ? onClick : () => {};

  const days: Moment[] = createDateList(startDate, numberOfDays);
  const allocationCells: any[] = [];

  let prevAllocation: AllocationModel | undefined = undefined;
  let dayIndex = 0;

  while (dayIndex < numberOfDays) {
    const day = days[dayIndex];

    if (project != null) {
      const allocation = project.getAllocationByDate(day);

      if (allocation != null) {
        allocationCells.push((
          <ToolTip
            content={createAllocationTooltip(project, allocation)}
            placement="bottom"
            delay={500}
          >
            <AllocationCell
              color={getRandomHexColor(`${project.id}-${project.name}`)}
              projectName={(!prevAllocation || allocation !== prevAllocation)  ? project.name : undefined}
              pensum={allocation.pensumPercentage}
              isFilled={true}
              onClick={() => onClickHandler(project, allocation)}
            />
          </ToolTip>
        ));

        prevAllocation = allocation;
      } else {
        allocationCells.push((
          <ToolTip content={createProjectTooltip(project)} placement="bottom" delay={500}>
            <AllocationCell />
          </ToolTip>
        ));
      }
    } else {
      // Creates dummy rows
      allocationCells.push(<AllocationCell />);
    }

    dayIndex = dayIndex + 1;
  }

  return <div className="planning-project-row">{allocationCells}</div>;
};
