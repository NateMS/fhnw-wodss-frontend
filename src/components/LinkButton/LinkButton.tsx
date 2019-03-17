import { Component, h } from 'hyperapp';

interface Props {
  label: string;
  theme?: string;
  href: string;
}

export const LinkButton: Component<Props> = ({ label, theme, href }) => {
  let className = 'button';

  if (theme) {
    className = `${className} is-${theme}`;
  }

  return <a href={href} className={className}>{label}</a>;
};

export default LinkButton;
