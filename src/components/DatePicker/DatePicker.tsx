import { Component, h } from 'hyperapp';
import moment, { Moment } from 'moment';
import flatpickr from 'flatpickr';
import { FormControlProps } from '../FormControlProps';
import { DATE_FORMAT_STRING } from '../../constants';

interface Props extends FormControlProps<Moment> {
  min?: Moment | null;
  max?: Moment | null;
}

const createFlatPickrInstance = (element: any, props: Props): void => {
  const { min, max, name, onInputChange } = props;
  flatpickr(element, {
    minDate: min ? min.toDate() : undefined,
    maxDate: max ? max.toDate() : undefined,
    onValueUpdate: (_, value: string) => {
      onInputChange({
        name,
        value: moment(value),
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
  let inputClassName = 'input';
  inputClassName = props.isLoading ? inputClassName + ' is-loading' : inputClassName;
  inputClassName = props.hasError ? inputClassName + ' is-danger' : inputClassName;
  const formattedDate = props.value ? props.value.format(DATE_FORMAT_STRING) : undefined;

  return (
    <div
      className="control has-icons-left"
      oncreate={(element: any) => createFlatPickrInstance(element, props)}
      ondestroy={(element: any) => destroyFlatPickrInstance(element)}
    >
      <input
        className={inputClassName}
        name={props.name}
        type="text"
        value={formattedDate}
        disabled={props.disabled}
        min={props.min || undefined}
        max={props.max || undefined}
        readonly={true}
      />
      <span className="icon is-left">
        <i className="fas fa-calendar-alt"/>
      </span>
    </div>
  );
};

export default DatePicker;
