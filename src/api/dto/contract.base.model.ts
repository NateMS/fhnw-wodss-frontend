import { Contract } from './contract';

export class ContractBaseModel implements Contract {
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly pensumPercentage: number;
  public readonly employeeId: number;

  constructor(contract: Contract) {
    if (contract.startDate != null) {
      if (Array.isArray(contract.startDate)) {
        // TODO Remove once backend fixes it
        this.startDate = contract.startDate
          .map(num => num < 10 ? `0${num}` : `${num}`)
          .join('-');
      } else {
        this.startDate = contract.startDate;
      }
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (contract.endDate != null) {
      if (Array.isArray(contract.endDate)) {
        // TODO Remove once backend fixes it
        this.endDate = contract.endDate
          .map(num => num < 10 ? `0${num}` : `${num}`)
          .join('-');
      } else {
        this.endDate = contract.endDate;
      }
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
