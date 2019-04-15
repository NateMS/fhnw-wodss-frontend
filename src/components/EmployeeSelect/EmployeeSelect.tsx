import { Component, h } from 'hyperapp';
import { FormSelect, FormSelectProps } from '../FormSelect/FormSelect';
import { EmployeeModel } from '../../api/dto/employee.model';
import { Employee } from '../../api/dto/employee';

export const EmployeeSelect: Component<FormSelectProps<EmployeeModel, string>> = (props) => {
  return (
    <FormSelect
      {...props}
      searchEnabled={true}
      comparer={(item: Employee, selected: string) => item.id === selected}
      valueMapper={(e: EmployeeModel) => e.id}
      labeler={(e: EmployeeModel) => e.fullName}
    />
  );
};

export default EmployeeSelect;
