import api from "../../../lib/api"; 
export type AppType = "bike" | "car" | "cng";
export type AppStatus = "pending" | "approved" | "rejected" | "need_info";

export interface ApplicationRow {
  _id: string;
  type: AppType;
  status: AppStatus;
  submittedAt: string;
  driver: {
    firstName: string;
    lastName: string;
    phone: string;
    nid?: string;
    license?: string;
    photoUrl?: string;
    city?: string;
    gender?: string;
    dob?: string;
  };
  vehicle: {
    brand?: string;
    model?: string;
    regNo?: string;
    year?: string;
    fitnessNo?: string;
    taxTokenNo?: string;
    routePermitNo?: string;
  };
}

export type Paged<T> = { data: T[]; total: number; page: number; limit: number };

type Query = {
  page?: number;
  limit?: number;
  search?: string;
  status?: AppStatus | "all";
  sort?: string;
  order?: "asc" | "desc";
};

const q = (o: Record<string, any>) =>
  "?" +
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");

const getApiBase = (): string => api.defaults.baseURL || "";

//  base + path safely join
const withBase = (path: string) => {
  const base = getApiBase();
  if (!base) return path;
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

// ------------------- API CALLS -------------------

export async function fetchApplications(query: Query): Promise<Paged<ApplicationRow>> {
  const url = withBase(`/api/mod/verification/applications${q(query)}`);
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from API: ${text.slice(0, 200)}`);
  }
}

async function postDecision(path: string, body?: any) {
  const url = withBase(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    try {
      const e = JSON.parse(text);
      throw new Error(e?.error || "Action failed");
    } catch {
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
  }
}

export const approve = (type: AppType, id: string, notes?: string) =>
  postDecision(`/api/mod/verification/applications/${type}/${id}/approve`, { notes });

export const rejectApp = (type: AppType, id: string, notes?: string) =>
  postDecision(`/api/mod/verification/applications/${type}/${id}/reject`, { notes });

export const needInfo = (type: AppType, id: string, notes: string) =>
  postDecision(`/api/mod/verification/applications/${type}/${id}/need-info`, { notes });
