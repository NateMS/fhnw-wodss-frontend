import { Moment } from 'moment';

/**
 * Represents a FHNW research project with a
 * given full-time-equivalent (FTE) workload in
 * percentages managed by a project manager employee
 * @export
 * @interface Project
 */
export interface Project {
  /**
   * Project ID
   * @type {string}
   * @memberof Project
   */
  id?: string;

  /**
   * Project name
   * @type {string}
   * @memberof Project
   */
  name: string;

  /**
   * Full time equivalent represented as
   * a percentage value (1 FTE = 100% = 1 person working 1 day)
   * @type {number}
   * @memberof Project
   */
  ftePercentage: number;

  /**
   * Project start date (YYYY-MM-DD)
   * @type {string}
   * @memberof Project
   */
  startDate: string | Moment;

  /**
   * Project end date (YYYY-MM-DD)
   * @type {string}
   * @memberof Project
   */
  endDate: string | Moment;

  /**
   * Project manager employee ID
   * @type {string}
   * @memberof Project
   */
  projectManagerId: string;
}
