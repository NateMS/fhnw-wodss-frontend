import { Allocation } from './allocation';
import moment from 'moment';

export class AllocationBaseModel implements Allocation {
  public readonly startDate: moment.Moment;
  public readonly endDate: moment.Moment;
  public readonly pensumPercentage: number;
  public readonly contractId: string;
  public readonly projectId: string;

  constructor(allocation: Allocation) {
    if (allocation.startDate) {
      this.startDate = moment(allocation.startDate);
    } else {
      throw new Error(`The field 'startDate' is missing.`);
    }

    if (allocation.endDate) {
      this.endDate = moment(allocation.endDate);
    } else {
      throw new Error(`The field 'endDate' is missing.`);
    }

    if (allocation.pensumPercentage) {
      this.pensumPercentage = allocation.pensumPercentage;
    } else {
      throw new Error(`The field 'pensumPercentage' is missing.`);
    }

    if (allocation.contractId) {
      this.contractId = allocation.contractId;
    } else {
      throw new Error(`The field 'contractId' is missing.`);
    }

    if (allocation.projectId) {
      this.projectId = allocation.projectId;
    } else {
      throw new Error(`The field 'projectId' is missing.`);
    }
  }
}
