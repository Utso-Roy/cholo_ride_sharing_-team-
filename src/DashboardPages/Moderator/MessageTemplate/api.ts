import api from "../../../lib/api";
import type { ListResponse } from "./types";

export async function listTemplates(params?: Record<string, any>) {
  const res = await api.get<ListResponse>("/api/template", { params });
  return res.data;
}

export async function getTemplate(id: string) {
  const res = await api.get(`/api/template/${id}`);
  return res.data;
}

export async function createTemplate(payload: any) {
  const res = await api.post("/api/template", payload);
  return res.data;
}

export async function updateTemplate(id: string, payload: any) {
  const res = await api.put(`/api/template/${id}`, payload);
  return res.data;
}

export async function duplicateTemplate(id: string) {
  const res = await api.post(`/api/template/${id}/duplicate`);
  return res.data;
}

export async function deleteTemplate(id: string) {
  const res = await api.delete(`/api/template/${id}`);
  return res.data;
}

export async function previewTemplate(id: string, data: Record<string, any>) {
  const res = await api.post(`/api/template/${id}/preview`, { data });
  return res.data;
}
