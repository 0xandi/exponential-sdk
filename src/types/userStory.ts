// User story types matching the Exponential API responses.
// A user story belongs to a feature and may optionally be grouped under a
// feature scope. Structured fields mirror the app's native As-a / I-want /
// So-that model; displayOrder is auto-assigned server-side.

export interface UserStory {
  id: string;
  featureId: string;
  scopeId: string | null;
  asA: string | null;
  iWant: string | null;
  soThat: string | null;
  acceptanceCriteria: string | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
