import api from "../../../lib/api";


export type ReportRow = {
  _id: string;
  rideId: string;
  category: "abuse" | "fare" | "safety";
  status: "open" | "in_review" | "need_info" | "resolved" | "escalated";
  assigneeId?: string;
  hasEvidence: boolean;
  createdAt: string;      // ISO
  deadlineAt: string;     // ISO (SLA)
  reporter: { id: string; name: string; email?: string };
  subject: { id: string; name: string; email?: string };
  repeatCount: number;    // same ride/subject repeats in last 7d
};

export type ReportsListResponse = {
  data: ReportRow[];
  total: number;
  summary7d?: {
    opened: number;
    resolved: number;
    breachPct: number;
    topCategories: Array<{ category: string; count: number }>;
  };
};

export type ReportsQuery = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  status?: string;
  category?: string;
  assignee?: string;
  hasEvidence?: string; // "true" | "false"
  age?: string;         // e.g., "24h", "48h"
  search?: string;
};

export async function fetchReports(q: ReportsQuery) {
  const res = await api.get<ReportsListResponse>("/api/mod/reports", { params: q });
  return res.data;
}

export async function bulkAction(payload: {
  ids: string[];
  action: "assign_to_me" | "status" | "add_note";
  value?: any;
  reason: string;
  actorId: string;
}) {
  const res = await api.post("/api/mod/reports/bulk", payload);
  return res.data;
}
