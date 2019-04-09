import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<boolean> {
  labelText: string;
}

export const FormCheckbox: Component<Props> = props => (
  <div className="control">
    <label className="checkbox">
      <input
        type="checkbox"
        name={props.name}
        disabled={props.disabled}
        checked={props.value}
        value={props.value}
        onchange={() => props.onInputChange({ name: props.name, value: !props.value })}
      /> {props.labelText}
    </label>
  </div>
);
