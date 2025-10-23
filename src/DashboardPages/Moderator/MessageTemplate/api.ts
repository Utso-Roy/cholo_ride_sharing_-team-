import api from "../../../lib/api";
import { ListResponse } from "./types";


export const BASE = api;

export async function listTemplates(params: Partial<{
  q: string; category: string; folder: string; pinned: boolean;
  page: number; pageSize: number; sort: string;
}> = {}) : Promise<ListResponse> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k,v]) => {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  });
  const r = await fetch(`Base/api/templates?${qs.toString()}`);
  if (!r.ok) throw new Error("Failed to fetch");
  return r.json();
}

export async function getTemplate(id: string) {
  const r = await fetch(`BASE/api/templates/${id}`);
  if (!r.ok) throw new Error("Not found");
  return r.json();
}

export async function createTemplate(payload: {
  key: string; title: string; category: string; folder?: string | null; pinned?: boolean;
  subject: string; body: string; variables?: string[]; notes?: string; userId?: string;
}) {
  const r = await fetch(`BASE/api/templates`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error("Create failed");
  return r.json();
}

export async function updateTemplate(id: string, payload: Partial<{
  title: string; category: string; folder?: string | null; pinned?: boolean;
  variables?: string[]; subject?: string; body?: string; notes?: string; userId?: string;
}>) {
  const r = await fetch(`BASE/api/templates/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error("Update failed");
  return r.json();
}

export async function duplicateTemplate(id: string) {
  const r = await fetch(`BASE/api/templates/${id}/duplicate`, { method: "POST" });
  if (!r.ok) throw new Error("Duplicate failed");
  return r.json();
}

export async function deleteTemplate(id: string) {
  const r = await fetch(`BASE/api/templates/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Delete failed");
  return r.json();
}

export async function previewTemplate(id: string, data: Record<string, any>) {
  const r = await fetch(`BASE/api/templates/${id}/preview`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data })
  });
  if (!r.ok) throw new Error("Preview failed");
  return r.json() as Promise<{ subject: string; body: string }>;
}
