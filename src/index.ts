import { createClient, isTRPCError, TRPCClientError, type TrpcClient } from './client.js';
import { ActionsApi } from './actions.js';
import { ProjectsApi } from './projects.js';
import { WorkspacesApi } from './workspaces.js';

export class ExponentialClient {
  private client: TrpcClient;
  actions: ActionsApi;
  projects: ProjectsApi;
  workspaces: WorkspacesApi;

  constructor(private config: { token: string; apiUrl: string }) {
    this.client = createClient(this.config);
    this.actions = new ActionsApi(this.client);
    this.projects = new ProjectsApi(this.client);
    this.workspaces = new WorkspacesApi(this.client);
  }
}

export {
  createConfigStore,
  loadConfig,
  saveConfig,
  clearConfig,
  isAuthenticated,
  getConfigPath,
} from './config.js';

export type { ExponentialConfig } from './config.js';
export type {
  Action,
  ActionOutput,
  ActionsListOutput,
  KanbanStatus,
  Priority,
} from './types/action.js';
export type { Project, ProjectOutput, ProjectsListOutput } from './types/project.js';
export type { Workspace, WorkspaceOutput, WorkspacesListOutput } from './types/workspace.js';
export { isTRPCError, TRPCClientError };
