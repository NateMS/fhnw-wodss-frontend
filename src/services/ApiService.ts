import { ApiError } from '../api/ApiError';
import { ResponseStatusCode } from '../api/response-status-code.enum';
import userService from './UserService';

enum RequestMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface ConfigurationParameters {
  apiKey?: string | ((name: string) => string);
  basePath?: string;
}

type URLParams = {[key: string]: string | number | undefined};

class Configuration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey?: string | ((name: string) => string);

  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string;

  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey;
    this.basePath = param.basePath;
  }
}

export class ApiService {
  private static instance: ApiService;

  protected constructor(private configuration: Configuration) {}

  public post<T>(url: string, body: any, queryParams?: URLParams): Promise<T> {
    return this.request(RequestMethods.POST, url, body, queryParams);
  }

  public put<T>(url: string, body: any, queryParams?: URLParams): Promise<T> {
    return this.request(RequestMethods.PUT, url, body, queryParams);
  }

  public get<T>(url: string, queryParams?: URLParams): Promise<T> {
    return this.request(RequestMethods.GET, url, undefined, queryParams);
  }

  public delete<T>(url: string): Promise<T> {
    return this.request(RequestMethods.DELETE, url);
  }

  public request<T>(method: string, endpoint: string, body?: any, queryParams?: URLParams): Promise<T> {
    const { basePath } = this.configuration;
    const url = new URL(`${basePath}${endpoint}`);
    const token = userService.getToken();
    let authorizationHeaders;

    if (token != null) {
      authorizationHeaders = {
        Authorization: `Bearer ${token}`,
      };
    }

    if (queryParams != null) {
      Object
        .keys(queryParams)
        .filter(key => queryParams[key] != null)
        .map((key) => {
          url.searchParams.append(key, `${queryParams[key]!}`);
        });
    }

    return fetch(url.toString(), {
      method,
      body: JSON.stringify(body),
      headers: {
        ...authorizationHeaders,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'same-origin',
    })
    .then((response: Response) => {
      if (!response.ok) {
        throw new ApiError(response.status, response.statusText);
      }

      if (response.status === ResponseStatusCode.NoContent) {
        return Promise.resolve();
      }

      return response
        .json()
        .then(body => body as T);
    })
    .catch((error: Error) => {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(ResponseStatusCode.InternalServerError, error.message);
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService({
        basePath: process.env.BACKEND_URL,
      });
    }

    return ApiService.instance;
  }
}

export const apiService = ApiService.getInstance();
export default apiService;
