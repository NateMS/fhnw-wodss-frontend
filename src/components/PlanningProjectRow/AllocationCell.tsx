import { Component, h } from 'hyperapp';
import { ProjectExtendedModel } from '../../models/project-extended.model';

interface Props {
  isFilled: boolean;
  showProjectName: boolean;
  project: ProjectExtendedModel;
  onClick?: (event: Event) => void;
}

export const AllocationCell: Component<Props> = ({ isFilled, showProjectName, project, onClick }) => {
  const onClickHandler = onClick != null ? onClick : () => {};

  return (
    <div onclick={onClickHandler} className={`planning-col ${isFilled ? 'planning-col--filled' : ''}`}>
      {showProjectName && <span className="planning-col__project">{project.name}</span>}
    </div>
  );
};

export default AllocationCell;
