import { Employee } from './employee';

export interface TokenPayload {
  employee: Employee;
  sub?: string;
  exp?: number;
  iat?: number;
}
