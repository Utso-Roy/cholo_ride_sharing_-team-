import api from "../../../lib/api";

const getBase = () => (api as any)?.defaults?.baseURL || "";

export const toAbsolute = (url?: string) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;            // already absolute
  const base = getBase() || "http://localhost:3000";    // fallback
  if (url.startsWith("/")) return `${base}${url}`;
  return `${base}/${url.replace(/^\/+/, "")}`;
};