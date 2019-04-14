/**
 * Looks whether the provided object contains the property.
 *
 * @param object
 * @param property
 */
import { ToastMessage } from './actions/toast.actions';
import { Role } from './api/role';

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
