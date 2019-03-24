/**
 * Represents the credentials of employee with an email address and a raw password (Based on these information a JWT token is then issued)
 * @export
 * @interface Credentials
 */
export interface Credentials {
  /**
   * Employee email address
   * @type {string}
   * @memberof Credentials
   */
  emailAddress: string;
  /**
   * Raw employee password
   * @type {string}
   * @memberof Credentials
   */
  rawPassword: string;
}
