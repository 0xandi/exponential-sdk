export type InteractionType =
  | 'EMAIL'
  | 'TELEGRAM'
  | 'PHONE_CALL'
  | 'MEETING'
  | 'NOTE'
  | 'LINKEDIN'
  | 'OTHER';

export type InteractionDirection = 'INBOUND' | 'OUTBOUND';

export interface Contact {
  id: string;
  workspaceId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  linkedIn: string | null;
  telegram: string | null;
  twitter: string | null;
  github: string | null;
  bluesky: string | null;
  about: string | null;
  profileType: string | null;
  skills: string[];
  tags: string[];
  organizationId: string | null;
  connectionScore: number | null;
  lastInteractionAt: Date | null;
  lastInteractionType: string | null;
  importSource: string | null;
  createdAt: Date;
  updatedAt: Date;
  organization?: {
    id: string;
    name: string;
    workspaceId: string;
    websiteUrl: string | null;
    logoUrl: string | null;
    description: string | null;
    industry: string | null;
    size: string | null;
  } | null;
  createdBy?: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

export interface ContactInteraction {
  id: string;
  contactId: string;
  workspaceId: string;
  userId: string | null;
  type: string;
  direction: string;
  subject: string | null;
  notes: string | null;
  metadata: unknown;
  occurredAt: Date;
  createdAt: Date;
}

export interface ContactListOutput {
  contacts: Contact[];
  nextCursor?: string;
}
