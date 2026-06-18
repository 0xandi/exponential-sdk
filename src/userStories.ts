import type { TrpcClient } from './client.js';
import type { Feature } from './types/feature.js';
import type { UserStory } from './types/userStory.js';

export interface UserStoryListOptions {
  featureId: string;
}

export interface UserStoryCreateInput {
  featureId: string;
  asA?: string;
  iWant?: string;
  soThat?: string;
  acceptanceCriteria?: string;
  scopeId?: string;
}

export interface UserStoryUpdateInput {
  id: string;
  asA?: string;
  iWant?: string;
  soThat?: string;
  acceptanceCriteria?: string;
  scopeId?: string | null;
}

/**
 * Native, structured user stories on a feature (As a / I want / So that).
 *
 * Mirrors the existing `FeaturesApi` shape and the `client.product.feature.*`
 * call style. `list` derives from the feature's `getById` payload, which
 * already includes `userStories` ordered by `displayOrder` — there is no
 * dedicated list procedure.
 */
export class UserStoriesApi {
  constructor(private client: TrpcClient) {}

  async list(options: UserStoryListOptions): Promise<UserStory[]> {
    const feature = await this.client.product.feature.getById.query({
      id: options.featureId,
    }) as Feature & { userStories?: UserStory[] };
    return feature.userStories ?? [];
  }

  async create(input: UserStoryCreateInput): Promise<UserStory> {
    return await this.client.product.feature.addUserStory.mutate(
      input,
    ) as UserStory;
  }

  async update(input: UserStoryUpdateInput): Promise<UserStory> {
    return await this.client.product.feature.updateUserStory.mutate(
      input,
    ) as UserStory;
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return await this.client.product.feature.deleteUserStory.mutate({
      id,
    }) as { success: boolean };
  }
}
