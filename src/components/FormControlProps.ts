export interface FormControlProps<T> {
  fieldName: string;
  value: T | null;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onInputChange: (value: T | null) => void;
}
