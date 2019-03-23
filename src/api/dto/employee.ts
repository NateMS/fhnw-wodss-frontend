import { Employee } from "../role.enum";

/**
 * Represents the employee of the FHNW. An employee can have several non-overlapping contracts. In addition he can work in multiple projects and act as project leader
 * @export
 * @interface Employee
 */
export interface Employee {
  /**
   * 
   * @type {boolean}
   * @memberof Employee
   */
  active?: boolean;
  /**
   * Employee ID
   * @type {number}
   * @memberof Employee
   */
  id?: number;
  /**
   * Employee first name
   * @type {string}
   * @memberof Employee
   */
  firstName: string;
  /**
   * Employee last name
   * @type {string}
   * @memberof Employee
   */
  lastName: string;
  /**
   * Employee email address
   * @type {string}
   * @memberof Employee
   */
  emailAddress: string;
  /**
   * Single employee role
   * @type {string}
   * @memberof Employee
   */
  role?: Employee.RoleEnum;
}
