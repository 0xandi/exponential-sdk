// Tag (aka label) types matching the Exponential API responses.

export type TagEntityType = 'action' | 'ticket' | 'feature' | 'epic';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string | null;
  category: string | null;
  isSystem: boolean;
  workspaceId: string | null;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagListResult {
  globalTags: Tag[];
  workspaceTags: Tag[];
  allTags: Tag[];
}
