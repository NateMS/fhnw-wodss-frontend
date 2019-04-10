import { Component, h } from 'hyperapp';
import flatpickr from 'flatpickr';
import { FormControlProps } from '../FormControlProps';

interface Props extends FormControlProps<string> {
  min?: string | null;
  max?: string | null;
}

const createFlatPickrInstance = (element: any, props: Props): void => {
  const { min, max, name, onInputChange } = props;
  flatpickr(element, {
    minDate: min ? min : undefined,
    maxDate: max ? max : undefined,
    onValueUpdate: (_, value: string) => {
      console.log(props.name, 'change', value);
      onInputChange({
        name,
        value,
      });
    },
  });
};

const updateFlatPickrInstance = (element: any, props: Props): void => {
  if (element._flatpickr != null) {
    // TODO CHECK FOR BETTER SOLUTION
    // Workaround, because setting config value triggers onUpdateValue
    // which leads to an endless loop:
    // element._flatpickr.set({
      //   minDate: props.min ? props.min : undefined,
      // });
    destroyFlatPickrInstance(element);
    createFlatPickrInstance(element, props);
  }
};

const destroyFlatPickrInstance = (element: any): void => {
  if (element._flatpickr != null) {
    element._flatpickr.destroy();
  }
};

export const DatePicker: Component<Props> = (props) => {
  const inputClassName = props.isLoading ? 'input is-loading' : 'input';

  return (
    <div
      className="control has-icons-left"
      oncreate={(element: any) => createFlatPickrInstance(element, props)}
      ondestroy={(element: any) => destroyFlatPickrInstance(element)}
      onupdate={(element: any) => updateFlatPickrInstance(element, props)}
    >
      <input
        className={inputClassName}
        name={props.name}
        type="text"
        value={props.value ? props.value : undefined}
        disabled={props.disabled}
        min={props.min || undefined}
        max={props.max || undefined}
      />
      <span className="icon is-left">
        <i className="fas fa-calendar-alt"/>
      </span>
    </div>
  );
};

export default DatePicker;
