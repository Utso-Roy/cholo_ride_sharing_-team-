export async function logAudit(rideId: string, action: string, details?: string) {
  await fetch("/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rideId,
      action,
      details,
      ts: new Date().toISOString(),
    }),
  });
}
