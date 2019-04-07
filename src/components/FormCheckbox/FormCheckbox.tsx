import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<boolean> {
  labelText: string;
}

export const FormCheckbox: Component<Props> = props => (
  <label className="checkbox">
    <input
      type="checkbox"
      name={props.name}
      disabled={props.disabled}
      value={props.value}
      onchange={() => props.onInputChange({ name: props.name, value: !props.value })}
    /> {props.labelText}
  </label>
);
