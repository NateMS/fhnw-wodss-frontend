import { Contract } from './contract';
import moment from 'moment';

export class ContractBaseModel implements Contract {
  public readonly startDate: moment.Moment;
  public readonly endDate: moment.Moment;
  public readonly pensumPercentage: number;
  public readonly employeeId: string;

  constructor(contract: Contract) {
    if (contract.startDate != null) {
      this.startDate = moment(contract.startDate);
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (contract.endDate != null) {
      this.endDate = moment(contract.endDate);
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
