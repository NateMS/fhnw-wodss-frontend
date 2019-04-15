import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<boolean> {
  labelText: string;
}

export const FormCheckbox: Component<Props> = props => {
  const checkboxClassName = props.errors != null ? 'is-checkradio has-background-color is-danger' : 'is-checkradio has-background-color';

  return (
    <div className="control">
      <input
          type="checkbox"
          className={checkboxClassName}
          id={props.name}
          name={props.name}
          disabled={props.disabled}
          checked={props.value}
          value={props.value}
          onchange={() => props.onInputChange({ name: props.name, value: !props.value })}
        />
      <label for={props.name}>
         {props.labelText}
      </label>
    </div>
  )
};
