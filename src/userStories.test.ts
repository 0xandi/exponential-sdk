import { describe, it, expect, vi } from 'vitest';
import { UserStoriesApi } from './userStories.js';
import type { TrpcClient } from './client.js';

function makeClient() {
  const addUserStory = vi.fn().mockResolvedValue({ id: 'us1' });
  const updateUserStory = vi.fn().mockResolvedValue({ id: 'us1' });
  const deleteUserStory = vi.fn().mockResolvedValue({ success: true });
  const getById = vi.fn().mockResolvedValue({
    id: 'feat1',
    userStories: [
      { id: 'b', displayOrder: 1 },
      { id: 'a', displayOrder: 0 },
    ],
  });

  const client = {
    product: {
      feature: {
        getById: { query: getById },
        addUserStory: { mutate: addUserStory },
        updateUserStory: { mutate: updateUserStory },
        deleteUserStory: { mutate: deleteUserStory },
      },
    },
  } as unknown as TrpcClient;

  return { client, addUserStory, updateUserStory, deleteUserStory, getById };
}

describe('UserStoriesApi', () => {
  it('create maps the full input to addUserStory.mutate', async () => {
    const { client, addUserStory } = makeClient();
    const api = new UserStoriesApi(client);

    await api.create({
      featureId: 'feat1',
      asA: 'CLI user',
      iWant: 'to add a story',
      soThat: 'it shows as a native row',
      acceptanceCriteria: 'it appears',
      scopeId: 'scope1',
    });

    expect(addUserStory).toHaveBeenCalledTimes(1);
    expect(addUserStory).toHaveBeenCalledWith({
      featureId: 'feat1',
      asA: 'CLI user',
      iWant: 'to add a story',
      soThat: 'it shows as a native row',
      acceptanceCriteria: 'it appears',
      scopeId: 'scope1',
    });
  });

  it('create passes through when optional fields are absent', async () => {
    const { client, addUserStory } = makeClient();
    const api = new UserStoriesApi(client);

    await api.create({ featureId: 'feat1', iWant: 'just this' });

    expect(addUserStory).toHaveBeenCalledWith({
      featureId: 'feat1',
      iWant: 'just this',
    });
  });

  it('update maps the input to updateUserStory.mutate (incl. null scopeId)', async () => {
    const { client, updateUserStory } = makeClient();
    const api = new UserStoriesApi(client);

    await api.update({ id: 'us1', asA: 'maintainer', scopeId: null });

    expect(updateUserStory).toHaveBeenCalledWith({
      id: 'us1',
      asA: 'maintainer',
      scopeId: null,
    });
  });

  it('delete maps the id to deleteUserStory.mutate', async () => {
    const { client, deleteUserStory } = makeClient();
    const api = new UserStoriesApi(client);

    const result = await api.delete('us1');

    expect(deleteUserStory).toHaveBeenCalledWith({ id: 'us1' });
    expect(result).toEqual({ success: true });
  });

  it('list reads the feature getById payload userStories in displayOrder', async () => {
    const { client, getById } = makeClient();
    const api = new UserStoriesApi(client);

    const stories = await api.list({ featureId: 'feat1' });

    expect(getById).toHaveBeenCalledWith({ id: 'feat1' });
    // The procedure already orders by displayOrder; we return as-is.
    expect(stories.map((s) => s.id)).toEqual(['b', 'a']);
  });

  it('list returns an empty array when the feature has no userStories', async () => {
    const { client } = makeClient();
    (client.product.feature.getById.query as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ id: 'feat1' });
    const api = new UserStoriesApi(client);

    const stories = await api.list({ featureId: 'feat1' });

    expect(stories).toEqual([]);
  });
});
