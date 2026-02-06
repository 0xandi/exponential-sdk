import type { TrpcClient } from './client.js';
import type { Project } from './types/project.js';

export interface ProjectsListOptions {
  workspaceId?: string;
  includeActions?: boolean;
}

export class ProjectsApi {
  constructor(private client: TrpcClient) {}

  async list(options: ProjectsListOptions = {}): Promise<Project[]> {
    const { workspaceId, includeActions } = options;

    return await this.client.project.getAll.query({
      workspaceId,
      include: includeActions ? { actions: true } : undefined,
    }) as Project[];
  }
}
