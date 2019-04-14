import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<string | number> {
  type: string;
  suffix?: string;
  min?: number | null;
  max?: number | null;
  minLength?: number | null;
  maxLength?: number | null;
  hasError?: boolean;
}

interface FormInputSuffixProps {
  suffix: string;
}

const FormInputSuffix: Component<FormInputSuffixProps> = ({ suffix }) => (
  <span className="icon is-right">
    <i className={suffix} />
  </span>
);

export const FormInput: Component<Props> = (props) => {
  const controlClassName = props.suffix ? 'control has-icons-right' : 'control';
  let inputClassName = 'input';
  inputClassName = props.isLoading ? inputClassName + ' is-loading' : inputClassName;
  inputClassName = props.hasError ? inputClassName + ' is-danger' : inputClassName;

  return (
    <div className={controlClassName}>
      <input
        className={inputClassName}
        name={props.name}
        type={props.type}
        value={props.value ? props.value : undefined}
        disabled={props.disabled}
        placeholder={props.placeholder}
        min={props.min != null ? props.min : undefined}
        max={props.max != null ? props.max : undefined}
        minLength={props.minLength != null ? props.minLength : undefined}
        maxLength={props.maxLength != null ? props.maxLength : undefined}
        oninput={(e: any) => props.onInputChange({ name: props.name, value: e.target.value })}
      />
      {props.suffix && <FormInputSuffix suffix={props.suffix} />}
    </div>
  );
};

export default FormInput;
