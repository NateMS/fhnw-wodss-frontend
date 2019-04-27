import { Component, h } from 'hyperapp';

interface Props {
  color?: string;
  isFilled?: boolean;
  projectName?: string;
  pensum?: number;
  onClick?: (event: Event) => void;
}

export const AllocationCell: Component<Props> = (props) => {
  const { color, isFilled, projectName, pensum, onClick } = props;
  const onClickHandler = onClick != null ? onClick : () => {};
  let className = 'planning-col planning-col--day';

  if (isFilled === true) {
    className = `${className} planning-col--filled`;
  }

  return (
    <div
      onclick={onClickHandler}
      className={className}
      style={`background-color: ${color}; border-color: ${color}`}
    >
      {projectName && (
        <span className="planning-col__project">
          {projectName} | {pensum}%
        </span>
      )}
    </div>
  );
};

export default AllocationCell;
