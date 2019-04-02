export interface GenericForm {
  isSaving: boolean;
}

export interface ModalForm extends GenericForm {
  isOpen: boolean;
}

export interface EmployeeContractForm extends GenericForm {
  id: number | null;
  from: string | null;
  to: string | null;
  pensum: number | null;
}

export interface AuthenticationForm extends GenericForm {
  emailAddress: string | null;
  rawPassword: string | null;
}

export interface EmployeeForm extends ModalForm {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  emailAddress: string | null;
  password: string | null;
  // contracts?: EmployeeContractForm[] | null;
  status: boolean | null;
  active: boolean | null;
}

export interface FormState {
  authentication: AuthenticationForm;
  employee: EmployeeForm;
  [key: string]: any;
}

export const initAuthenticationForm: () => AuthenticationForm = () => ({
  emailAddress: null,
  rawPassword: null,
  isSaving: false,
});

export const initEmployeeForm: () => EmployeeForm = () => ({
  isOpen: false,
  isSaving: false,
  id: null,
  firstName: null,
  lastName: null,
  role: null,
  emailAddress: null,
  password: null,
  status: null,
  active: null,
});

export const defaultFormState: FormState = {
  authentication: initAuthenticationForm(),
  employee: initEmployeeForm(),
};
