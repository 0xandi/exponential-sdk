import type { TrpcClient } from './client.js';
import type { Action, KanbanStatus } from './types/action.js';

export interface ActionsListOptions {
  projectId?: string;
  status?: KanbanStatus;
  assigneeId?: string;
}

export interface ActionsKanbanOptions {
  projectId?: string;
  status?: KanbanStatus;
  assigneeId?: string;
}

export class ActionsApi {
  constructor(private client: TrpcClient) {}

  async list(options: ActionsListOptions = {}): Promise<Action[]> {
    const { projectId, status, assigneeId } = options;
    let actions: Action[];

    if (projectId) {
      actions = await this.client.action.getProjectActions.query({
        projectId,
        assigneeId,
      }) as Action[];
    } else if (status) {
      actions = await this.client.action.getKanbanActions.query({
        kanbanStatus: status,
        assigneeId,
      }) as Action[];
    } else {
      actions = await this.client.action.getAll.query({
        assigneeId,
      }) as Action[];
    }

    // Match CLI behavior: hide completed/cancelled unless status specified
    if (!status) {
      actions = actions.filter(action =>
        action.status !== 'COMPLETED' &&
        action.status !== 'CANCELLED' &&
        action.kanbanStatus !== 'DONE' &&
        action.kanbanStatus !== 'CANCELLED'
      );
    }

    return actions;
  }

  async getToday(workspaceId?: string): Promise<Action[]> {
    return await this.client.action.getToday.query({
      workspaceId,
    }) as Action[];
  }

  async getByDateRange(start: Date, end: Date, workspaceId?: string): Promise<Action[]> {
    return await this.client.action.getByDateRange.query({
      startDate: start,
      endDate: end,
      workspaceId,
    }) as Action[];
  }

  async getKanban(options: ActionsKanbanOptions = {}): Promise<Action[]> {
    const { projectId, status, assigneeId } = options;

    return await this.client.action.getKanbanActions.query({
      projectId,
      kanbanStatus: status,
      assigneeId,
    }) as Action[];
  }

  async getProjectActions(projectId: string, assigneeId?: string): Promise<Action[]> {
    return await this.client.action.getProjectActions.query({
      projectId,
      assigneeId,
    }) as Action[];
  }
}
