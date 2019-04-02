import { Component, h } from 'hyperapp';
import { FormSelect, FormSelectProps } from '../FormSelect/FormSelect';
import { EmployeeModel } from '../../api/dto/employee.model';
import { Employee } from '../../api/dto/employee';

export const EmployeeSelect: Component<FormSelectProps<EmployeeModel>> = (props) => {
  return (
    <FormSelect
      {...props}
      searchEnabled={true}
      comparer={(item: Employee, selected: Employee) => item.id === selected.id}
      labler={(e: EmployeeModel) => e.fullName}
    />
  );
};

export default EmployeeSelect;
