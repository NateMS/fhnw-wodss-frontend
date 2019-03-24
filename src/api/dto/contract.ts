/**
 * Represents the contract an employee can have (Multiple contracts are possible, but date overlapping is not allowed)
 * @export
 * @interface Contract
 */
export interface Contract {
  /**
   * Contract ID
   * @type {number}
   * @memberof Contract
   */
  id?: number;
  /**
   * Contract start date (YYYY-MM-DD)
   * @type {string}
   * @memberof Contract
   */
  startDate: string;
  /**
   * Contract end date (YYYY-MM-DD)
   * @type {string}
   * @memberof Contract
   */
  endDate: string;
  /**
   * Full time equivalent for the contract as percentage value (0.5 FTE = 50)
   * @type {number}
   * @memberof Contract
   */
  pensumPercentage: number;
  /**
   * Employee ID of the contract
   * @type {number}
   * @memberof Contract
   */
  employeeId: number;
}
