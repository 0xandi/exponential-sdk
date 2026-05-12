import type { TrpcClient } from './client.js';
import type { Epic, EpicPriority, EpicStatus } from './types/epic.js';

export interface EpicListOptions {
  workspaceId: string;
  status?: EpicStatus;
}

export interface EpicCreateInput {
  workspaceId: string;
  name: string;
  description?: string;
  priority?: EpicPriority;
  startDate?: Date;
  targetDate?: Date;
}

export interface EpicUpdateInput {
  id: string;
  name?: string;
  description?: string | null;
  status?: EpicStatus;
  priority?: EpicPriority;
  startDate?: Date | null;
  targetDate?: Date | null;
}

export class EpicsApi {
  constructor(private client: TrpcClient) {}

  async list(options: EpicListOptions): Promise<Epic[]> {
    return await this.client.epic.list.query({
      workspaceId: options.workspaceId,
      status: options.status,
    }) as Epic[];
  }

  async get(id: string): Promise<Epic> {
    return await this.client.epic.getById.query({ id }) as Epic;
  }

  async create(input: EpicCreateInput): Promise<Epic> {
    return await this.client.epic.create.mutate(input) as Epic;
  }

  async update(input: EpicUpdateInput): Promise<Epic> {
    return await this.client.epic.update.mutate(input) as Epic;
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return await this.client.epic.delete.mutate({ id }) as {
      success: boolean;
    };
  }
}
