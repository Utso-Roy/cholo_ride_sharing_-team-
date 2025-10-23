import api from "../../../lib/api";

export type DisputeStatus = "open" | "investigating" | "resolved" | "escalated";

export interface DisputeListItem {
  id: string;
  rideId: string;
  opener: "Rider" | "Driver";
  amount: number;               // ৳
  createdAt: string;            // ISO
  status: DisputeStatus;
  slaSecondsRemaining: number;
}

export interface PagedResp<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DisputeListQuery {
  page?: number;
  pageSize?: number;
  status?: DisputeStatus | "all";
  minAmount?: number;
  maxAmount?: number;
  maxAgeHours?: number;
  q?: string;
  sort?: { field: "createdAt" | "amount" | "slaSecondsRemaining"; dir: "asc" | "desc" };
}


function toQS(q: DisputeListQuery = {}) {
  const p = new URLSearchParams();
  if (q.page) p.set("page", String(q.page));
  if (q.pageSize) p.set("pageSize", String(q.pageSize));
  if (q.status && q.status !== "all") p.set("status", q.status);
  if (q.minAmount != null) p.set("minAmount", String(q.minAmount));
  if (q.maxAmount != null) p.set("maxAmount", String(q.maxAmount));
  if (q.maxAgeHours != null) p.set("maxAgeHours", String(q.maxAgeHours));
  if ((q as any).search) p.set("q", String((q as any).search));
  if (q.q) p.set("q", q.q);
  if (q.sort) p.set("sort", `${q.sort.field}:${q.sort.dir}`);
  return p.toString();
}

export async function listDisputes(q: DisputeListQuery = {}) {
  const params = {
    page: 1, pageSize: 10, sort: "createdAt:desc", ...q,
  };
  if (q.sort) params.sort = `${q.sort.field}:${q.sort.dir}`;
//   console.log("[listDisputes] axios GET /api/disputes", params);
  const { data } = await api.get("/api/disputes", { params }); // ✅
  return data;
}

