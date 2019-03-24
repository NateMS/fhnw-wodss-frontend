import { Contract } from "./contract";

export class ContractModel implements Contract {
  public readonly id?: number | undefined;  
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly pensumPercentage: number;
  public readonly employeeId: number;

  constructor(contract : Contract) {
    this.id = contract.id;

    if (contract.startDate) {
      this.startDate = contract.startDate;
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (contract.endDate) {
      this.endDate = contract.endDate;
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (contract.pensumPercentage) {
      this.pensumPercentage = contract.pensumPercentage;
    } else {
      throw new Error(`The field 'pensumPercentage' is missing.`);
    }

    if (contract.employeeId) {
      this.employeeId = contract.employeeId;
    } else {
      throw new Error(`The field 'employeeId' is missing.`);
    }
  }
}