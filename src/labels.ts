import type { TrpcClient } from './client.js';
import type { Tag, TagEntityType, TagListResult } from './types/tag.js';

export interface LabelListOptions {
  workspaceId?: string;
  category?: string | null;
}

export interface LabelCreateInput {
  workspaceId: string;
  name: string;
  color: string;
  description?: string;
  category?: string | null;
}

export interface SetEntityTagsInput {
  entityType: TagEntityType;
  entityId: string;
  tagIds: string[];
}

export interface ListForEntityInput {
  entityType: TagEntityType;
  entityId: string;
}

export interface SetEntityTagsResult {
  entityType: TagEntityType;
  entityId: string;
  tags: Tag[];
}

/**
 * Labels API. Backed by the server's `tag.*` tRPC procedures. "Label" is the
 * user-facing word for a Tag (specifically when `category` is null).
 */
export class LabelsApi {
  constructor(private client: TrpcClient) {}

  async list(options: LabelListOptions = {}): Promise<TagListResult> {
    return (await this.client.tag.list.query({
      workspaceId: options.workspaceId,
      category: options.category,
    })) as TagListResult;
  }

  async create(input: LabelCreateInput): Promise<Tag> {
    return (await this.client.tag.create.mutate({
      workspaceId: input.workspaceId,
      name: input.name,
      color: input.color,
      description: input.description,
      category: input.category,
    })) as Tag;
  }

  async setEntityTags(input: SetEntityTagsInput): Promise<SetEntityTagsResult> {
    return (await this.client.tag.setEntityTags.mutate(input)) as SetEntityTagsResult;
  }

  async listForEntity(input: ListForEntityInput): Promise<Tag[]> {
    return (await this.client.tag.listForEntity.query(input)) as Tag[];
  }
}
