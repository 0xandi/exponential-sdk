import type { TrpcClient } from './client.js';
import type { Workspace } from './types/workspace.js';

export class WorkspacesApi {
  constructor(private client: TrpcClient) {}

  async list(): Promise<Workspace[]> {
    return await this.client.workspace.list.query() as Workspace[];
  }
}
