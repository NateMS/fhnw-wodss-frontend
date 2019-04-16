import { apiService, ApiService } from './ApiService';
import { Project } from '../api/dto/project';
import { ProjectModel } from '../api/dto/project.model';
import { ProjectBaseModel } from '../api/dto/project.base.model';
import { ProjectRequestModel } from '../api/dto/project.request.model';
import { ServiceError } from './ServiceError';
import { ResponseStatusCode } from '../api/response-status-code.enum';

class ProjectService {
  private static instance: ProjectService;

  private constructor(private api: ApiService) {}

  public create(project: ProjectBaseModel): Promise<ProjectModel> {
    return this.api.post<Project>('/api/project', new ProjectRequestModel(project))
      .then(e => new ProjectModel(e))
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to create project');
        }

        if (error.status === ResponseStatusCode.PreconditionFailed) {
          throw new ServiceError('Precondition for creating project failed');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public getAll(projectManagerId?: string, fromDate?: string, toDate?: string): Promise<ProjectModel[]> {
    const params = {
      projectManagerId,
      fromDate,
      toDate,
    };

    return this.api.get<Project[]>('/api/project', params)
      .then((list: Project[]) => list.map(e => new ProjectModel(e)))
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Project Manager not found');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public get(id: string): Promise<ProjectModel> {
    return this.api.get<Project>(`/api/project/${id}`)
      .then(e => new ProjectModel(e))
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to view project');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Project not found');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public update(project: ProjectBaseModel, id: string): Promise<ProjectModel> {
    return this.api.put<Project>(`/api/project/${id}`, new ProjectRequestModel(project))
     .then(e => new ProjectModel(e))
     .catch((error) => {
       if (error.status === ResponseStatusCode.Unauthorized) {
         throw new ServiceError('Unauthenticated or invalid token');
       }

       if (error.status === ResponseStatusCode.Forbidden) {
         throw new ServiceError('Not allowed to update project');
       }

       if (error.status === ResponseStatusCode.NotFound) {
         throw new ServiceError('Project not found');
       }

       if (error.status === ResponseStatusCode.PreconditionFailed) {
         throw new ServiceError('Precondition for updateing project failed');
       }

       if (error.status === ResponseStatusCode.InternalServerError) {
         throw new ServiceError('Internal server error');
       }

       if (error.status === ResponseStatusCode.NetworkError) {
         throw new ServiceError('Error contacting server');
       }

       throw error;
     });
  }

  public delete(id: string): Promise<void> {
    return this.api.delete<null>(`/api/project/${id}`)
      .then(() => {})
      .catch((error) => {
        if (error.status === ResponseStatusCode.Unauthorized) {
          throw new ServiceError('Unauthenticated or invalid token');
        }

        if (error.status === ResponseStatusCode.Forbidden) {
          throw new ServiceError('Not allowed to delete project');
        }

        if (error.status === ResponseStatusCode.NotFound) {
          throw new ServiceError('Project not found');
        }

        if (error.status === ResponseStatusCode.InternalServerError) {
          throw new ServiceError('Internal server error');
        }

        if (error.status === ResponseStatusCode.NetworkError) {
          throw new ServiceError('Error contacting server');
        }

        throw error;
      });
  }

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService(apiService);
    }

    return ProjectService.instance;
  }
}

export const projectService = ProjectService.getInstance();
export default projectService;
