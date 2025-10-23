// ---------- Types ----------
export type DisputeStatus = "open" | "investigating" | "resolved" | "escalated";

export interface DisputeListItem {
  id: string;
  rideId: string;
  opener: "Rider" | "Driver";
  amount: number;          // BDT
  createdAt: string;       // ISO
  status: DisputeStatus;
  slaSecondsRemaining: number;
}

export interface DisputeListQuery {
  page?: number;           // 1-based
  pageSize?: number;       // default 25
  status?: DisputeStatus | "all";
  minAmount?: number;
  maxAmount?: number;
  maxAgeHours?: number;    // e.g., 72
  search?: string;         // rideId / user
  sort?: { field: "createdAt" | "amount" | "slaSecondsRemaining"; dir: "asc" | "desc" };
}

export interface PagedResp<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DisputeDetailDTO {
  // same shape you used in the skeleton; keep minimal here
  id: string;
  rideId: string;
  openerType: "Rider" | "Driver";
  openerUserId: string;
  createdAt: string;
  status: DisputeStatus;
  amountClaimed: number;
  currency: "BDT" | "USD";
  slaSecondsRemaining: number;
  reasonCode: string;
  fare: { base: number; timeComponent: number; distanceComponent: number; surgeMultiplier?: number; total: number; };
  gps: { path: [number, number][], start: [number, number], end: [number, number] };
  chat: { messages: { at: string; from: "rider"|"driver"|"support"; text: string }[] };
  evidence: { items: { id: string; kind: "image"|"note"|"file"; title: string; url?: string; note?: string }[] };
  discussion: { items: { at: string; by: string; note: string }[] };
  audit: { records: { at: string; by: string; action: string; meta?: Record<string, any> }[] };
  related: { rideLink: string; reportLink?: string };
  reopenRateHint?: string;
}

// ---------- Client ----------
const BASE = "/api/disputes";

function q(obj: Record<string, any>) {
  const u = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "" || v === "all") return;
    if (typeof v === "object" && "field" in v) {
      u.set("sort", `${v.field}:${v.dir}`);
    } else {
      u.set(k, String(v));
    }
  });
  return u.toString();
}

export async function listDisputes(query: DisputeListQuery): Promise<PagedResp<DisputeListItem>> {
  const res = await fetch(`${BASE}?${q(query)}`);
  if (!res.ok) throw new Error("Failed to fetch disputes");
  return res.json();
}

export async function getDispute(id: string): Promise<DisputeDetailDTO> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch dispute");
  return res.json();
}

export async function resolveDispute(id: string, payload: { reason: string; notifyTemplate: string }) {
  const res = await fetch(`${BASE}/${id}/resolve`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("Failed to resolve dispute");
  return res.json();
}

export async function proposePartial(id: string, payload: { amount: number; reason: string }) {
  const res = await fetch(`${BASE}/${id}/partial`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("Failed to propose partial");
  return res.json();
}

export async function escalateDispute(id: string, payload: { reason: string }) {
  const res = await fetch(`${BASE}/${id}/escalate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("Failed to escalate");
  return res.json();
}

export async function addNote(id: string, payload: { note: string }) {
  const res = await fetch(`${BASE}/${id}/notes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("Failed to add note");
  return res.json();
}
