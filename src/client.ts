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

export interface TrpcClient {
  action: {
    getAll: { query: (input?: ActionInput) => Promise<unknown[]> };
    getKanbanActions: { query: (input?: KanbanInput) => Promise<unknown[]> };
    getToday: { query: (input?: TodayInput) => Promise<unknown[]> };
    getByDateRange: { query: (input: DateRangeInput) => Promise<unknown[]> };
    getProjectActions: { query: (input: { projectId: string; assigneeId?: string }) => Promise<unknown[]> };
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
