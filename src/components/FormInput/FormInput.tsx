import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<string | number> {
  type: string;
  suffix?: string;
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
  const inputClassName = props.isLoading ? 'input is-loading' : 'input';

  return (
    <div className={controlClassName}>
      <input
        className={inputClassName}
        name={props.name}
        type={props.type}
        value={props.value ? props.value : undefined}
        disabled={props.disabled}
        placeholder={props.placeholder}
        oninput={(e: any) => props.onInputChange({ name: props.name, value: e.target.value })}
      />
      {props.suffix && <FormInputSuffix suffix={props.suffix} />}
    </div>
  );
};

export default FormInput;
