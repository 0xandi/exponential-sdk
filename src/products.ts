import type { TrpcClient } from './client.js';
import type { Product } from './types/product.js';

export interface ProductCreateInput {
  workspaceId: string;
  name: string;
  /** Kebab-case slug; must match `/^[a-z0-9-]+$/`. */
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface ProductUpdateInput {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  funTicketIds?: boolean;
}

export class ProductsApi {
  constructor(private client: TrpcClient) {}

  async list(workspaceId: string): Promise<Product[]> {
    return await this.client.product.product.list.query({
      workspaceId,
    }) as Product[];
  }

  async get(id: string): Promise<Product> {
    return await this.client.product.product.getById.query({ id }) as Product;
  }

  async getBySlug(workspaceId: string, slug: string): Promise<Product> {
    return await this.client.product.product.getBySlug.query({
      workspaceId,
      slug,
    }) as Product;
  }

  /**
   * Resolve a product reference (slug or CUID) to a full Product. Falls back
   * to slug lookup if the bare CUID lookup fails — callers can pass either.
   */
  async resolve(workspaceId: string, slugOrId: string): Promise<Product> {
    // Heuristic: CUIDs from Prisma start with 'c' and are 25 chars; otherwise
    // try slug first. We try both to stay forgiving.
    const looksLikeId = /^c[a-z0-9]{20,}$/.test(slugOrId);
    if (looksLikeId) {
      try {
        return await this.get(slugOrId);
      } catch {
        // fall through to slug
      }
    }
    return await this.getBySlug(workspaceId, slugOrId);
  }

  async create(input: ProductCreateInput): Promise<Product> {
    return await this.client.product.product.create.mutate(input) as Product;
  }

  async update(input: ProductUpdateInput): Promise<Product> {
    return await this.client.product.product.update.mutate(input) as Product;
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return await this.client.product.product.delete.mutate({ id }) as {
      success: boolean;
    };
  }
}
