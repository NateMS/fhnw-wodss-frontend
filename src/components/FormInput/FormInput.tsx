import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<string> {
  type: string;
}

export const FormInput: Component<Props> = (props) => {
  let className = 'input';

  if (props.isLoading) {
    className = `${className} is-loading`;
  }

  return (
    <input
      className={className}
      name={props.name}
      type={props.type}
      value={props.value ? props.value : undefined}
      disabled={props.disabled}
      placeholder={props.placeholder}
      oninput={(e: any) => props.onInputChange({ name: props.name, value: e.target.value })}
    />
  );
};

export default FormInput;
