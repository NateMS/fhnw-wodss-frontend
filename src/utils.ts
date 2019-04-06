/**
 * Looks whether the provided object contains the property.
 *
 * @param object
 * @param property
 */
import { ToastMessage } from './actions/toast.actions';

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
