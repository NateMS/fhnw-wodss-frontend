/**
 * Enumeration of the possible roles an employee can have.
 * @export
 * @enum {string}
 */

export enum Role {
  ADMINISTRATOR = 'ADMINISTRATOR',
  PROJECTMANAGER = 'PROJECTMANAGER',
  DEVELOPER = 'DEVELOPER',
}

export const roleNameMap: {[key in Role]: string} = Object.freeze({
  [Role.ADMINISTRATOR]: 'Administrator',
  [Role.PROJECTMANAGER]: 'Project Manager',
  [Role.DEVELOPER]: 'Developer',
});

export const roleList: ReadonlyArray<Role> = Object.freeze(
  Object
  .keys(roleNameMap)
  .map(r => (r as Role)),
);
