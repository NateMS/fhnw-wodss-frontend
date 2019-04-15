import { Component, h } from 'hyperapp';
import { FormControlProps } from '../FormControlProps';

export interface FormSelectItem<T> {
  value: T;
  label: string;
  selected?: boolean;
}

export interface FormSelectProps<I, T> extends FormControlProps<T> {
  items: ReadonlyArray<I>;
  searchEnabled?: boolean;
  valueMapper?: (t: T) => I;
  comparer?: (t: T, i: I) => boolean;
  labeler?: (t1: T) => string;
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
export const FormSelect: Component<FormSelectProps<any, any>> = (props) => {
  const selectedValue = props.value;

  // Identity comparer
  let compare = (o1: any, o2: any) => o1 === o2;
  let label = (o: any) => o;
  let value = (o: any) => o;

  if (props.comparer != null) {
    compare = (o1, o2) => o1 == null || o2 == null ? false : props.comparer!(o1, o2);
  }

  if (props.labeler != null) {
    label = o1 => o1 != null ? props.labeler!(o1) : '';
  }

  if (props.valueMapper != null) {
    value = o => o != null ? props.valueMapper!(o) : null;
  }

  const selectClassName = props.errors != null ? 'select is-danger' : 'select';

  const onCreate = (e: Element) => {
    if (props.onInputChange) {
      e.addEventListener('change', (event: any) => {
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
        value={value(item)}
        label={label(item)}
        selected={compare(item, selectedValue)}
      />
    );
  };

  return (
    <div className="control">
      <div className={selectClassName}>
        <select
          className="form-control"
          name={props.name}
          data-trigger={true}
          placeholder={props.placeholder}
          disabled={props.disabled}
          oncreate={(e: Element) => onCreate(e)}
        >
          <option value="" placeholder={true}>{props.placeholder}</option>
          {props.items.map(item => createOption(item))}
        </select>
      </div>
    </div>
  );
};
