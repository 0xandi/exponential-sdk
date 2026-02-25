import type { TrpcClient } from './client.js';
import type { Pipeline, PipelineStage, Deal } from './types/pipeline.js';

export interface DealCreateInput {
  workspaceId: string;
  stageId: string;
  title: string;
  description?: string;
  value?: number;
  currency?: string;
  probability?: number;
  expectedCloseDate?: Date;
  contactId?: string;
  organizationId?: string;
  assignedToId?: string;
}

export interface DealUpdateInput {
  id: string;
  title?: string;
  description?: string | null;
  value?: number | null;
  currency?: string;
  probability?: number | null;
  expectedCloseDate?: Date | null;
  contactId?: string | null;
  organizationId?: string | null;
  assignedToId?: string | null;
}

export interface DealMoveInput {
  id: string;
  stageId: string;
  stageOrder: number;
}

export class PipelinesApi {
  constructor(private client: TrpcClient) {}

  async get(workspaceId: string): Promise<Pipeline | null> {
    return await this.client.crmApi.pipelineGet.query({ workspaceId }) as Pipeline | null;
  }

  async getStages(workspaceId: string): Promise<PipelineStage[]> {
    return await this.client.crmApi.pipelineGetStages.query({ workspaceId }) as PipelineStage[];
  }

  async listDeals(workspaceId: string): Promise<Deal[]> {
    return await this.client.crmApi.dealList.query({ workspaceId }) as Deal[];
  }

  async getDeal(id: string): Promise<Deal> {
    return await this.client.crmApi.dealGet.query({ id }) as Deal;
  }

  async createDeal(input: DealCreateInput): Promise<Deal> {
    return await this.client.crmApi.dealCreate.mutate(input) as Deal;
  }

  async updateDeal(input: DealUpdateInput): Promise<Deal> {
    return await this.client.crmApi.dealUpdate.mutate(input) as Deal;
  }

  async moveDeal(input: DealMoveInput): Promise<Deal> {
    return await this.client.crmApi.dealMove.mutate(input) as Deal;
  }

  async deleteDeal(id: string): Promise<void> {
    await this.client.crmApi.dealDelete.mutate({ id });
  }
}
