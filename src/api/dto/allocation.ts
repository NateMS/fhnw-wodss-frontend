/**
 * Represents the work unit an employee is doing for a project
 * @export
 * @interface Allocation
 */
export interface Allocation {
  /**
   * Allocation ID
   * @type {number}
   * @memberof Allocation
   */
  id?: number;
  /**
   * Allocation start date (YYYY-MM-DD)
   * @type {string}
   * @memberof Allocation
   */
  startDate: string;
  /**
   * Allocation end date (YYYY-MM-DD)
   * @type {string}
   * @memberof Allocation
   */
  endDate: string;
  /**
   * Full time equivalent for the contract as percentage value (0.5 FTE = 50)
   * @type {number}
   * @memberof Allocation
   */
  pensumPercentage: number;
  /**
   * Contract ID of the allocation
   * @type {number}
   * @memberof Allocation
   */
  contractId: number;
  /**
   * Project ID of the allocation
   * @type {number}
   * @memberof Allocation
   */
  projectId: number;
}
