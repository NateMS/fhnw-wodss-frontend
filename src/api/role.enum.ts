/**
 * Enumeration of the possible roles an employee can have.
 * @export
 * @enum {string}
 */

export enum RoleEnum {
  ADMINISTRATOR = 'ADMINISTRATOR',
  PROJECTMANAGER = 'PROJECTMANAGER',
  DEVELOPER = 'DEVELOPER',
}

export const roleNameMap: {[key in RoleEnum]: string} = Object.freeze({
  [RoleEnum.ADMINISTRATOR]: 'Administrator',
  [RoleEnum.PROJECTMANAGER]: 'Project Manager',
  [RoleEnum.DEVELOPER]: 'Developer',
});
