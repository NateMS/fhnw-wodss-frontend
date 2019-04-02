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
      oninput={(e: any) => props.onInputChange(e.target.value)}
    /> {props.labelText}
  </label>
);
