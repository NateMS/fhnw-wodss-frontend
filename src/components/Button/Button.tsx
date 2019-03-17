import { Component, h } from 'hyperapp';

interface Props {
  label: string;
  theme?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => any;
}

export const Button: Component<Props> = ({ label, isLoading, theme, disabled, onClick }) => {
  let className = 'button';

  if (theme) {
    className = `${className} is-${theme}`;
  }

  if (isLoading) {
    className = `${className} is-loading`;
  }

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onclick={onClick && (() => onClick())}
    >
      {label}
    </button>
  );
};

export default Button;
