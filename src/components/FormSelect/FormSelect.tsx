import { Component, h } from 'hyperapp';
// import Choices from 'choices.js';
import { FormControlProps } from '../FormControlProps';

export interface FormSelectItem<T> {
  value: T;
  label: string;
  selected?: boolean;
}

export interface FormSelectProps<T> extends FormControlProps<T> {
  items: T[];
  searchEnabled?: boolean;
  comparer?: (t1: T, t2: T) => boolean;
  labler?: (t1: T) => string;
}

const FormSelectOption: Component<FormSelectItem<any>> = (props) => {
  return (
    <option
      key={props.value}
      value={props.value}
      selected={props.selected}
    >
      {props.label}
    </option>
  );
};

/**
 * @TODO: On Destroy?
 * @param props
 * @constructor
 */
export const FormSelect: Component<FormSelectProps<any>> = (props) => {
  const selectedValue = props.value;

  // Identity comparer
  let compare = (o1: any, o2: any) => o1 === o2;
  let lable = (o1: any) => o1;

  if (props.comparer != null) {
    compare = (o1, o2) => o1 == null || o2 == null ? false : props.comparer!(o1, o2);
  }

  if (props.labler != null) {
    lable = o1 => o1 != null ? props.labler!(o1) : '';
  }

  const onCreate = (e: Element) => {
    // new Choices(e, {
    //   items: props.items,
    //   searchEnabled: props.searchEnabled || false,
    //   itemSelectText: '',
    // });

    if (props.onInputChange) {
      e.addEventListener('change', (event: any) => {
        // props.onInputChange(event.detail.value);
        props.onInputChange({
          name: props.name,
          value: event.target.value,
        });
      });
    }
  };

  const createOption = (item: any) => {
    return (
      <FormSelectOption
        value={item}
        label={lable(item)}
        selected={compare(item, selectedValue)}
      />
    );
  };

  return (
    <select
      className="form-control"
      name={props.name}
      data-trigger={true}
      placeholder={props.placeholder}
      disabled={props.disabled}
      oncreate={(e: Element) => onCreate(e)}
    >
      <option placeholder={true}>{props.placeholder}</option>
      {props.items.map(item => createOption(item))}
    </select>
  );
};
