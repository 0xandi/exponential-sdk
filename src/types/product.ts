// Product types matching the Exponential API responses.
// A "product" sits beneath a workspace and groups features, tickets, etc.

export interface Product {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  funTicketIds: boolean;
  ticketCounter: number;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    features?: number;
    tickets?: number;
    researches?: number;
    retrospectives?: number;
  };
}
