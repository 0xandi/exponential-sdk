export interface PipelineStage {
  id: string;
  projectId: string;
  name: string;
  color: string;
  order: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    deals: number;
  };
}

export interface Pipeline {
  id: string;
  name: string;
  workspaceId: string | null;
  status: string | null;
  pipelineStages: PipelineStage[];
}

export interface Deal {
  id: string;
  projectId: string;
  stageId: string;
  title: string;
  description: string | null;
  value: number | null;
  currency: string;
  probability: number | null;
  expectedCloseDate: Date | null;
  closedAt: Date | null;
  stageOrder: number;
  contactId: string | null;
  organizationId: string | null;
  workspaceId: string;
  createdById: string;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
  stage?: PipelineStage;
  contact?: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    organizationId?: string | null;
  } | null;
  organization?: {
    id: string;
    name: string;
  } | null;
  assignedTo?: {
    id: string;
    name: string | null;
    image: string | null;
    email?: string | null;
  } | null;
  activities?: DealActivity[];
}

export interface DealActivity {
  id: string;
  dealId: string;
  userId: string | null;
  type: string;
  content: string | null;
  metadata: unknown;
  createdAt: Date;
  user?: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}
