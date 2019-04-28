import { Moment } from 'moment';

/**
 * Represents the contract an employee can have (Multiple contracts are possible, but date overlapping is not allowed)
 * @export
 * @interface Contract
 */
export interface Contract {
  /**
   * Contract ID
   * @type {string}
   * @memberof Contract
   */
  id?: string;

  /**
   * Contract start date (YYYY-MM-DD)
   * @type {string}
   * @memberof Contract
   */
  startDate: string | Moment;

  /**
   * Contract end date (YYYY-MM-DD)
   * @type {string}
   * @memberof Contract
   */
  endDate: string | Moment;

  /**
   * Full time equivalent for the contract as percentage value (0.5 FTE = 50)
   * @type {number}
   * @memberof Contract
   */
  pensumPercentage: number;

  /**
   * Employee ID of the contract
   * @type {string}
   * @memberof Contract
   */
  employeeId: string;
}
