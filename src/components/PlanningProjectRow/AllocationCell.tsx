import { Component, h } from 'hyperapp';
import { ProjectExtendedModel } from '../../models/project-extended.model';

interface Props {
  isFilled: boolean;
  project: ProjectExtendedModel;
}

export const AllocationCell: Component<Props> = ({ isFilled, project }) => {
  return (
    <div className={`planning-col ${isFilled ? 'planning-col--filled' : ''}`}>
      <span className="planning-col__project">{project.name}</span>
    </div>
  );
};

export default AllocationCell;
