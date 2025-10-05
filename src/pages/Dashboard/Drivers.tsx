import React, { useEffect, useMemo, useState } from "react";

type DriverDoc = {
  _id: string;
  vehicleType: "bike" | "car" | "cng";
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  driver: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    license: string;
    photoUrl?: string;
  };
  vehicle: {
    brand: string;
    model: string;
    regNo: string;
    year?: string;
  };
};

type ApiResponse = {
  page: number;
  limit: number;
  total: number;
  items: DriverDoc[];
};

const API_BASE = import.meta.env.VITE_API_URL || ""; // e.g. http://localhost:3000

const Drivers: React.FC = () => {
  const [data, setData] = useState<DriverDoc[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all"|"pending"|"approved"|"rejected">("all");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  useEffect(() => {
    const abort = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (q.trim()) qs.set("q", q.trim());
        if (status !== "all") qs.set("status", status);

        const res = await fetch(`${API_BASE}/api/drivers?${qs.toString()}`, {
          signal: abort.signal,
        });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const json: ApiResponse = await res.json();
        setData(json.items || []);
        setTotal(json.total || 0);
      } catch (e: any) {
        if (e.name !== "AbortError") setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
    return () => abort.abort();
  }, [page, limit, q, status]);

  return (
    <div className="py-6">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Drivers</h1>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder="Search name/phone/city/license/reg no…"
            className="input input-bordered px-3 py-2 rounded border outline-none"
          />
          <select
            value={status}
            onChange={(e) => { setPage(1); setStatus(e.target.value as any); }}
            className="px-3 py-2 rounded border"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Driver</th>
              <th className="p-3">Phone</th>
              <th className="p-3">City</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Reg No</th>
              <th className="p-3">Status</th>
              <th className="p-3">Applied</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="p-3" colSpan={8}>Loading…</td></tr>
            )}
            {!loading && err && (
              <tr><td className="p-3 text-red-600" colSpan={8}>{err}</td></tr>
            )}
            {!loading && !err && data.length === 0 && (
              <tr><td className="p-3" colSpan={8}>No drivers found.</td></tr>
            )}
            {data.map((d) => (
              <tr key={d._id} className="border-t">
                <td className="p-3 font-medium">
                  {d.driver.firstName} {d.driver.lastName}
                  <span className="ml-2 text-xs rounded px-2 py-0.5 bg-gray-100">{d.vehicleType}</span>
                </td>
                <td className="p-3">{d.driver.phone}</td>
                <td className="p-3">{d.driver.city}</td>
                <td className="p-3">{d.vehicle.brand} {d.vehicle.model}</td>
                <td className="p-3">{d.vehicle.regNo}</td>
                <td className="p-3">
                  <span className={
                    "px-2 py-1 rounded text-xs " +
                    (d.status === "approved" ? "bg-green-100 text-green-700" :
                     d.status === "rejected" ? "bg-red-100 text-red-700" :
                     "bg-yellow-100 text-yellow-800")
                  }>
                    {d.status}
                  </span>
                </td>
                <td className="p-3">
                  {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="p-3">
                  <button className="px-2 py-1 border rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Prev</button>
          <span className="px-2 py-1">{page}/{totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
