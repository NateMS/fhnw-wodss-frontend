import { Component, h } from 'hyperapp';
import { Link } from '@hyperapp/router';

interface Props {
  label: string;
  theme?: string;
  to: string;
}

export const LinkButton: Component<Props> = ({ label, theme, to }) => {
  let className = 'button';

  if (theme) {
    className = `${className} is-${theme}`;
  }

  return <Link to={to} className={className}>{label}</Link>;
};

export default LinkButton;
