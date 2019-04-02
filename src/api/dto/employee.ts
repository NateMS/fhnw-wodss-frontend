import { RoleEnum } from '../role.enum';

/**
 * Represents the employee of the FHNW.
 * An employee can have several non-overlapping contracts.
 * In addition he can work in multiple projects and act as project leader.
 * @export
 * @interface Employee
 */
export interface Employee {
  /**
   * Employee ID
   * @type {number}
   */
  id?: number;

  /**
   * @type {boolean}
   */
  active?: boolean;

  /**
   * Employee first name
   * @type {string}
   */
  firstName: string;

  /**
   * Employee last name
   * @type {string}
   */
  lastName: string;

  /**
   * Employee email address
   * @type {string}
   */
  emailAddress: string;

  /**
   * Single employee role
   * @type {string}
   */
  role?: RoleEnum;
}
