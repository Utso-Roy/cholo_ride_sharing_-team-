export type TemplateCategory = "report" | "dispute" | "verification" | string;

export interface TemplateVersion {
  version: number;
  subject: string;
  body: string;
  updatedBy: string;
  updatedAt: string; // ISO
  notes?: string;
}

export interface MessageTemplate {
  _id: string;
  key: string;
  title: string;
  category: TemplateCategory;
  folder?: string | null;
  pinned: boolean;
  variables: string[];
  currentVersion: TemplateVersion;
  versions: TemplateVersion[];
  usageStats?: { usedCount: number; lastUsedAt?: string | null };
  createdAt: string;
  updatedAt: string;
}

export interface ListResponse {
  items: MessageTemplate[];
  total: number;
  page: number;
  pageSize: number;
}
