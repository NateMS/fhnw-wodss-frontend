/**
 * Looks whether the provided object contains the property.
 *
 * @param object
 * @param property
 */
import { ToastMessage } from './actions/toast.actions';
import { Role } from './api/role';
import moment, { Moment } from 'moment';
import { DATE_FORMAT_STRING } from './constants';
import { Project } from './api/dto/project';
import { EmployeeModel } from './api/dto/employee.model';

export function hasProp(object: {}, property: string): boolean {
  if (object == null) {
    return false;
  }

  return object.hasOwnProperty(property);
}

/**
 * Helper function to create toast message for API errors.
 *
 * @param title
 * @param error
 */
export const getApiErrorToast: (title: string, error: Error) => ToastMessage = (title, error) => ({
  title,
  message: `${error}`,
});

/**
 * Creates a toast just containing a message.
 *
 * @param message
 */
export const getToastMessage = (message: string): ToastMessage => ({
  message,
});

/**
 * Checks if user has one of the roles.
 * @param roles
 */
export const hasRole = (...roles: Role[]) => (role: Role): boolean => {
  return roles.indexOf(role) > -1;
};

/**
 * Checks if user is administrator.
 */
export const hasAdminRole = hasRole(Role.ADMINISTRATOR);

/**
 * Checks if user is project manager.
 */
export const hasProjectManagerRole = hasRole(Role.PROJECTMANAGER);

/**
 * User is either administrator or project manager.
 */
export const hasPrivilegedRole = hasRole(Role.ADMINISTRATOR, Role.PROJECTMANAGER);

/**
 * Formats the received dates the following way: end date - start date
 * @param from
 * @param to
 */
export const formatDateRange = (from: Moment, to: Moment): string => {
  return `${from.format(DATE_FORMAT_STRING)} - ${to.format(DATE_FORMAT_STRING)}`;
};

/**
 * Returns the number of days from a date range.
 *
 * @param from
 * @param to
 * @param includeEod - if set to true, considers the end date as a full day (+1)
 */
export const getDaysOfDateRange = (from: Moment, to: Moment, includeEod: boolean = false): number => {
  return to.diff(from, 'days') + (includeEod ? 1 : 0);
};

/**
 * Checks if a provided date is between two dates.
 * @param start
 * @param end
 * @param date
 */
export const isBetweenDates = (start: Moment, end: Moment, date: Moment): boolean => {
  return date.isSameOrAfter(start) && date.isSameOrBefore(end);
};

/**
 * Returns a sequential list of days starting from a specific day.
 * @param start
 * @param numberOfDays
 */
export const createDateList = (start: Moment, numberOfDays: number): Moment[] => {
  return Array.from(
    Array(numberOfDays),
    (_, index) => moment(start).add(index, 'days'),
  );
};

/**
 * Generates a deterministic random hex color.
 *
 * @param unique1
 * @param unique2
 */
export const getRandomHexColor = (unique1: string, unique2?: string): string => {
  let hash = 0;
  const str = `${unique1}${unique2}`;
  let colour = '#';

  for (let i = 0; i < str.length; i = i + 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (let i = 0; i < 3; i = i + 1) {
    const value = (hash >> (i * 8)) & 0xFF;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
};

/**
 * Compares project by name. Useful for sort functions
 *
 * @param p1
 * @param p2
 */
export const compareProjectByName = (p1: Project, p2: Project): number => {
  const name1 = p1.name.toUpperCase();
  const name2 = p2.name.toUpperCase();

  return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
};

/**
 * Compares employees by name. Useful for sort functions
 *
 * @param p1
 * @param p2
 */
export const compareEmployeeByName = (e1: EmployeeModel, e2: EmployeeModel): number => {
  const name1 = e1.fullName.toUpperCase();
  const name2 = e2.fullName.toUpperCase();

  return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
};

