import { DATE_FORMAT_STRING } from '../../constants';
import { Contract } from './contract';
import { ContractModel } from './contract.model';
import { ContractBaseModel } from './contract.base.model';

export class ContractRequestModel implements Contract {
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly pensumPercentage: number;
  public readonly employeeId: number;

  constructor(contract: ContractBaseModel | ContractModel) {
    if (contract.startDate != null) {
      this.startDate = contract.startDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (contract.endDate != null) {
      this.endDate = contract.endDate.format(DATE_FORMAT_STRING);
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (contract.pensumPercentage != null) {
      this.pensumPercentage = +contract.pensumPercentage;
    } else {
      throw new Error(`The field 'pensumPercentage' is missing.`);
    }

    if (contract.employeeId != null) {
      this.employeeId = contract.employeeId;
    } else {
      throw new Error(`The field 'employeeId' is missing.`);
    }
  }
}
