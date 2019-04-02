/**
 * Looks whether the provided object contains the property.
 *
 * @param object
 * @param property
 */
export function hasProp(object: {}, property: string): boolean {
  if (object == null) {
    return false;
  }

  return object.hasOwnProperty(property);
}
