// Epic types matching the Exponential API responses.
// Epics are workspace-scoped (NOT product-scoped); they group actions
// and tickets without belonging to a single product.

export type EpicStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type EpicPriority = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export interface Epic {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  status: EpicStatus;
  priority: EpicPriority;
  startDate: Date | null;
  targetDate: Date | null;
  ownerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  owner?: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
  _count?: {
    actions?: number;
    tickets?: number;
  };
}
