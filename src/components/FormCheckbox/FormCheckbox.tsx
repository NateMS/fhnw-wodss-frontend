import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<boolean> {
  labelText: string;
}

export const FormCheckbox: Component<Props> = props => (
  <label className="checkbox">
    <input
      type="checkbox"
      disabled={props.disabled}
      value={props.value}
      onchange={() => props.onInputChange(!props.value)}
    /> {props.labelText}
  </label>
);
