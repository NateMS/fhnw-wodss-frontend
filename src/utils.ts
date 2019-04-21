/**
 * Looks whether the provided object contains the property.
 *
 * @param object
 * @param property
 */
import { ToastMessage } from './actions/toast.actions';
import { Role } from './api/role';
import { Moment } from 'moment';
import { DATE_FORMAT_STRING } from './constants';
import moment from 'moment';

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

export const isBetweenDates = (start: Moment, endDate: Moment, date: Moment): boolean => {
  return date.isSameOrAfter(start) && date.isSameOrBefore(endDate);
};

export const createDateList = (start: Moment, numberOfDays: number): Moment[] => {
  return Array.from(
    Array(numberOfDays),
    (_, index) => moment(start).add(index, 'days'),
  );
};
