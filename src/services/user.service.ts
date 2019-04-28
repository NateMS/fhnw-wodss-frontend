import jwtDecode from 'jwt-decode';
import { apiService, ApiService } from './api.service';
import { Credentials } from '../api/dto/credentials';
import { Token } from '../api/dto/token';
import { TokenPayload } from '../api/dto/token-payload';
import { ApiError } from '../api/api-error';
import { ResponseStatusCode } from '../api/response-status-code.enum';
import { ServiceError } from './service-error';
import { LOCAL_STORAGE_USER_TOKEN } from '../constants';

class UserService {
  private static instance: UserService;

  private constructor(private api: ApiService) {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(apiService);
    }

    return UserService.instance;
  }

  public login(credentials: Credentials): Promise<string> {
    return this.api.post<Token>('/api/token', credentials)
      .then(response => response.token)
      .catch((error: ApiError) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Employee not found or invalid password');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for the username/password failed');
        }

        throw error;
      });
  }

  public refresh(): Promise<string> {
    const token = this.getToken();

    if (token == null) {
      return Promise.reject(new ServiceError('No token available to refresh'));
    }

    const payload: Token = { token };

    return this.api.put<Token>(`/api/token`, payload)
      .then(response => response.token)
      .catch((error) => {
        ApiService.checkDefaultResponseStatus(error);

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Token not valid or user not found');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for the token failed');
        }

        throw error;
      });
  }

  public decodeToken(token: string): TokenPayload {
    const payload: TokenPayload = jwtDecode(token);

    if (payload.employee == null) {
      throw new Error(`Expected 'employee' in the token payload.`);
    }

    return payload;
  }

  public getToken(): string | null {
    return window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
  }

  public setToken(token: string): void {
    window.localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token);
  }

  public removeToken(): void {
    window.localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN);
  }
}

export const userService = UserService.getInstance();
export default userService;
