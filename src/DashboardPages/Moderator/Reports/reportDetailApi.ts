import api from "../../../lib/api";


// ---- Shared with list ----
export type ReportRow = {
  _id: string;
  rideId: string;
  category: "abuse" | "fare" | "safety";
  status: "open" | "in_review" | "need_info" | "resolved" | "escalated";
  assigneeId?: string;
  hasEvidence: boolean;
  createdAt: string;   // ISO
  deadlineAt: string;  // ISO (SLA)
  reporter: { id: string; name: string; email?: string };
  subject:  { id: string; name: string; email?: string };
  repeatCount: number;
};

// ---- Detail-specific DTO ----
export type TimelineEntry = {
  at: string;               // ISO time
  type: "create" | "assign" | "status" | "note" | "request_info" | "resolve" | "escalate";
  by?: string;
  note?: string;
};

export type Evidence = {
  images?: string[];
  audio?: string[];
  chatIds?: string[];
};

export type ReportDetail = ReportRow & {
  summary: string;
  evidence: Evidence;
  notes?: Array<{ by?: string; at: string; text: string }>;
  timeline: TimelineEntry[];
  previousReports7d?: number;
  // optional helpful links
  rideUrl?: string;
};

export async function fetchReportDetail(id: string) {
  const res = await api.get<ReportDetail>(`/api/mod/reports/${id}`);
  return res.data;
}

export type ReportActionPayload =
  | { type: "request_info"; payload: { message: string } }
  | { type: "resolve"; payload: { outcome: "warning" | "suspend" | "no_action"; reason: string } }
  | { type: "escalate"; payload: { to: "lead_mod" | "admin"; reason: string } };

export async function actOnReport(id: string, body: ReportActionPayload) {
  const res = await api.post(`/api/mod/reports/${id}/actions`, body);
  return res.data as { ok: true };
}
