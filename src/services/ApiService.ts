enum RequestMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface ConfigurationParameters {
  apiKey?: string | ((name: string) => string);
  username?: string;
  password?: string;
  accessToken?: string | ((name: string, scopes?: string[]) => string);
  basePath?: string;
}

type URLParams = {[key: string]: string | undefined};

class Configuration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey?: string | ((name: string) => string);

  /**
   * parameter for oauth2 security
   * @param name security name
   * @param scopes oauth2 scope
   * @memberof Configuration
   */
  accessToken?: string | ((name: string, scopes?: string[]) => string);

  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string;

  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey;
    this.accessToken = param.accessToken;
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

    if (queryParams != null) {
      Object
        .keys(queryParams)
        .filter((key) => queryParams[key] != null)
        .map((key) => {
          url.searchParams.append(key, queryParams[key]!);
      });
    }

    return fetch(url.toString(), {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response
        .json()
        .then(body => body as T);
    })
    .catch((error: Error) => {
      throw error;
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService({
        apiKey: '',
        basePath: process.env.BACKEND_URL,
      });
    }

    return ApiService.instance;
  }
}

export const apiService = ApiService.getInstance();
export default apiService;
