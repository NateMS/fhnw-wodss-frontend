import { Component, h } from 'hyperapp';

interface Props {
  label: string;
  theme?: string;
}

export const FormHint: Component<Props> = ({ label, theme }) => {
  let className = 'help';

  if (theme) { className = `${className} is-${theme}`; }

  return (
    <p className={className}>
      {label}
    </p>
  );
};

export default FormHint;
