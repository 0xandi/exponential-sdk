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
  crmApi: {
    contactList: { query: (input: { workspaceId: string; search?: string; tags?: string[]; organizationId?: string; limit?: number; cursor?: string }) => Promise<unknown> };
    contactGet: { query: (input: { id: string; includeInteractions?: boolean }) => Promise<unknown> };
    contactCreate: { mutate: (input: { workspaceId: string; firstName?: string; lastName?: string; email?: string | null; phone?: string; linkedIn?: string; telegram?: string; twitter?: string; github?: string; bluesky?: string; about?: string; profileType?: string; skills?: string[]; tags?: string[]; organizationId?: string }) => Promise<unknown> };
    contactUpdate: { mutate: (input: { id: string; firstName?: string; lastName?: string; email?: string | null; phone?: string | null; linkedIn?: string | null; telegram?: string | null; twitter?: string | null; github?: string | null; bluesky?: string | null; about?: string; profileType?: string; skills?: string[]; tags?: string[]; organizationId?: string | null }) => Promise<unknown> };
    contactDelete: { mutate: (input: { id: string }) => Promise<unknown> };
    contactAddInteraction: { mutate: (input: { contactId: string; type: string; direction: string; subject?: string; notes?: string; metadata?: unknown }) => Promise<unknown> };
    pipelineGet: { query: (input: { workspaceId: string }) => Promise<unknown> };
    pipelineGetStages: { query: (input: { workspaceId: string }) => Promise<unknown[]> };
    dealList: { query: (input: { workspaceId: string }) => Promise<unknown[]> };
    dealGet: { query: (input: { id: string }) => Promise<unknown> };
    dealCreate: { mutate: (input: { workspaceId: string; stageId: string; title: string; description?: string; value?: number; currency?: string; probability?: number; expectedCloseDate?: Date; contactId?: string; organizationId?: string; assignedToId?: string }) => Promise<unknown> };
    dealUpdate: { mutate: (input: { id: string; title?: string; description?: string | null; value?: number | null; currency?: string; probability?: number | null; expectedCloseDate?: Date | null; contactId?: string | null; organizationId?: string | null; assignedToId?: string | null }) => Promise<unknown> };
    dealMove: { mutate: (input: { id: string; stageId: string; stageOrder: number }) => Promise<unknown> };
    dealDelete: { mutate: (input: { id: string }) => Promise<unknown> };
  };
  actionComment: {
    getComments: { query: (input: { actionId: string }) => Promise<unknown[]> };
    addComment: { mutate: (input: { actionId: string; content: string }) => Promise<unknown> };
    updateComment: { mutate: (input: { commentId: string; content: string }) => Promise<unknown> };
    deleteComment: { mutate: (input: { commentId: string }) => Promise<unknown> };
  };
  product: {
    ticket: {
      addComment: { mutate: (input: { ticketId: string; content: string }) => Promise<unknown> };
      deleteComment: { mutate: (input: { id: string }) => Promise<unknown> };
    };
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
