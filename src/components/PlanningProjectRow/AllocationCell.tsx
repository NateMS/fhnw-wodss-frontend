import { Component, h } from 'hyperapp';

interface Props {
  color?: string;
  isFilled?: boolean;
  projectName?: string;
  pensum?: number;
  onClick?: (event: Event) => void;
}

export const AllocationCell: Component<Props> = ({ color, isFilled, projectName, pensum, onClick }) => {
  const onClickHandler = onClick != null ? onClick : () => {};

  return (
    <div
      onclick={onClickHandler}
      className={`planning-col ${isFilled ? 'planning-col--filled' : ''}`}
      style={`background-color: ${color}; border-color: ${color}`}
    >
      {projectName && (
        <span
          className="planning-col__project"
          style={`background-color: ${color}; border-color: ${color}`}
        >
          {projectName} | {pensum}%
        </span>
      )}
    </div>
  );
};

export default AllocationCell;
