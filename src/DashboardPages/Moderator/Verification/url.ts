import api from "../../../lib/api";

const getBase = () => (api as any)?.defaults?.baseURL || "";

export const toAbsolute = (url?: string) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url; // already absolute
  const base =
    getBase() || "https://cholo-ride-sharing-website-server-side.onrender.com"; // fallback
  if (url.startsWith("/")) return `${base}${url}`;
  return `${base}/${url.replace(/^\/+/, "")}`;
};
