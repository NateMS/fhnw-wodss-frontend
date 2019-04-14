import { FormControl } from '../state/form/types';

export interface FormControlProps<T> extends FormControl<T> {
  onInputChange: (control: FormControl<T>) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
}
