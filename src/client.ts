import { createTRPCClient, httpBatchLink, TRPCClientError } from '@trpc/client';
import superjson from 'superjson';

type ActionInput = {
  assigneeId?: string;
};

type KanbanInput = {
  projectId?: string;
  assigneeId?: string;
  kanbanStatus?: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'CANCELLED';
};

type TodayInput = {
  workspaceId?: string;
};

type DateRangeInput = {
  startDate: Date;
  endDate: Date;
  workspaceId?: string;
};

type ProjectInput = {
  include?: {
    actions?: boolean;
  };
  workspaceId?: string;
};

type ActionStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DELETED' | 'DRAFT';
type ActionKanbanStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'CANCELLED';
type ActionPriority = 'Quick' | 'Scheduled' | '1st Priority' | '2nd Priority' | '3rd Priority' | '4th Priority' | '5th Priority' | 'Errand' | 'Remember' | 'Watch' | 'Someday Maybe';

type ActionCreateInput = {
  name: string;
  description?: string;
  projectId?: string;
  workspaceId?: string;
  dueDate?: Date;
  scheduledStart?: Date;
  scheduledEnd?: Date;
  duration?: number;
  priority?: ActionPriority;
  status?: ActionStatus;
  epicId?: string;
  effortEstimate?: number;
  blockedByIds?: string[];
};

type ActionUpdateInput = {
  id: string;
  name?: string;
  description?: string;
  projectId?: string;
  workspaceId?: string | null;
  dueDate?: Date | null;
  scheduledStart?: Date | null;
  scheduledEnd?: Date | null;
  duration?: number | null;
  priority?: ActionPriority;
  status?: ActionStatus;
  kanbanStatus?: ActionKanbanStatus;
  epicId?: string | null;
  effortEstimate?: number | null;
  blockedByIds?: string[];
};

export interface TrpcClient {
  action: {
    getAll: { query: (input?: ActionInput) => Promise<unknown[]> };
    getKanbanActions: { query: (input?: KanbanInput) => Promise<unknown[]> };
    getToday: { query: (input?: TodayInput) => Promise<unknown[]> };
    getByDateRange: { query: (input: DateRangeInput) => Promise<unknown[]> };
    getProjectActions: { query: (input: { projectId: string; assigneeId?: string }) => Promise<unknown[]> };
    create: { mutate: (input: ActionCreateInput) => Promise<unknown> };
    update: { mutate: (input: ActionUpdateInput) => Promise<unknown> };
  };
  project: {
    getAll: { query: (input?: ProjectInput) => Promise<unknown[]> };
  };
  workspace: {
    list: { query: () => Promise<unknown[]> };
  };
}

export function createClient(config: { token: string; apiUrl: string }): TrpcClient {
  const apiUrl = config.apiUrl.replace(/\/+$/, '');

  return createTRPCClient<any>({
    links: [
      httpBatchLink({
        url: `${apiUrl}/api/trpc`,
        headers() {
          return {
            Authorization: `Bearer ${config.token}`,
          };
        },
        transformer: superjson,
      }),
    ],
  }) as unknown as TrpcClient;
}

export function isTRPCError(error: unknown): error is TRPCClientError<any> {
  return error instanceof TRPCClientError;
}

export { TRPCClientError };
