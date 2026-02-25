import { createClient, isTRPCError, TRPCClientError, type TrpcClient } from './client.js';
import { ActionsApi } from './actions.js';
import { ProjectsApi } from './projects.js';
import { WorkspacesApi } from './workspaces.js';
import { ContactsApi } from './contacts.js';
import { PipelinesApi } from './pipelines.js';

export class ExponentialClient {
  private client: TrpcClient;
  actions: ActionsApi;
  projects: ProjectsApi;
  workspaces: WorkspacesApi;
  contacts: ContactsApi;
  pipelines: PipelinesApi;

  constructor(private config: { token: string; apiUrl: string }) {
    this.client = createClient(this.config);
    this.actions = new ActionsApi(this.client);
    this.projects = new ProjectsApi(this.client);
    this.workspaces = new WorkspacesApi(this.client);
    this.contacts = new ContactsApi(this.client);
    this.pipelines = new PipelinesApi(this.client);
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
export type {
  ActionCreateInput,
  ActionUpdateInput,
  ActionStatus,
} from './actions.js';
export type { Project, ProjectOutput, ProjectsListOutput } from './types/project.js';
export type { Workspace, WorkspaceOutput, WorkspacesListOutput } from './types/workspace.js';
export type {
  Contact,
  ContactInteraction,
  ContactListOutput,
  InteractionType,
  InteractionDirection,
} from './types/contact.js';
export type {
  ContactCreateInput,
  ContactUpdateInput,
  AddInteractionInput,
  ContactsListOptions,
} from './contacts.js';
export type {
  Pipeline,
  PipelineStage,
  Deal,
  DealActivity,
} from './types/pipeline.js';
export type {
  DealCreateInput,
  DealUpdateInput,
  DealMoveInput,
} from './pipelines.js';
export { isTRPCError, TRPCClientError };
