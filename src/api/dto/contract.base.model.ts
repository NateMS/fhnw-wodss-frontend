import { Contract } from './contract';

export class ContractBaseModel implements Contract {
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly pensumPercentage: number;
  public readonly employeeId: number;

  constructor(contract: Contract) {
    if (contract.startDate != null) {
      this.startDate = contract.startDate;
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (contract.endDate != null) {
      this.endDate = contract.endDate;
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (contract.pensumPercentage != null) {
      this.pensumPercentage = contract.pensumPercentage;
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
