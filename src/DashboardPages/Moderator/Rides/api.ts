import { RideQueueItem } from "./type";

export interface RideQueueQuery {
  page: number;         // 1-based
  pageSize: number;     // e.g., 25
  status?: ("pending" | "investigating")[];
  assignee?: "me" | "unassigned" | string;
  minRisk?: number;
  hasEvidence?: boolean;
  sort?: { field: "createdAt" | "riskScore" | "slaSecondsRemaining"; dir: "asc" | "desc" };
  text?: string; // search rideId / locations
}

export interface RideQueueResponse {
  items: RideQueueItem[];
  total: number;
}

const BASE = "/api/mod/rides/queue";

export async function fetchRideQueue(q: RideQueueQuery, signal?: AbortSignal): Promise<RideQueueResponse> {
  const params = new URLSearchParams({
    page: String(q.page),
    pageSize: String(q.pageSize),
    ...(q.status?.length ? { status: q.status.join(",") } : {}),
    ...(q.assignee ? { assignee: q.assignee } : {}),
    ...(q.minRisk != null ? { minRisk: String(q.minRisk) } : {}),
    ...(q.hasEvidence != null ? { hasEvidence: String(q.hasEvidence) } : {}),
    ...(q.sort ? { sort: `${q.sort.field}:${q.sort.dir}` } : {}),
    ...(q.text ? { text: q.text } : {}),
  });
  const res = await fetch(`${BASE}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`Queue fetch failed: ${res.status}`);
  return res.json();
}

export async function assignRides(rideIds: string[], assignee: "me" | "unassigned" | string) {
  const res = await fetch(`${BASE}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideIds, assignee }),
  });
  if (!res.ok) throw new Error("Assign failed");
  return res.json();
}

export async function bulkStatus(rideIds: string[], status: "investigating" | "resolved" | "rejected") {
  const res = await fetch(`${BASE}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideIds, status }),
  });
  if (!res.ok) throw new Error("Bulk status failed");
  return res.json();
}
