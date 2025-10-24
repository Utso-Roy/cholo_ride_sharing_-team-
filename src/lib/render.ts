export function renderString(tmpl: string, data: Record<string, any>) {
  return tmpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const val = key.split(".").reduce((o, k) => (o ? (o as any)[k] : undefined), data);
    return (val ?? "");
  });
}
