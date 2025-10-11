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
    nid: string;
    dob: string;
  };
  vehicle: {
    brand: string;
    model: string;
    regNo: string;
    year?: string;
    fitnessNo: string;
    taxTokenNo: string;
    routePermitNo: string;
  };
};

type ApiResponse = {
  page: number;
  limit: number;
  total: number;
  items: DriverDoc[];
};

import { api } from "../lib/api";

const Drivers: React.FC = () => {
  const [data, setData] = useState<DriverDoc[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [selected, setSelected] = useState<DriverDoc | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  useEffect(() => {
    const abort = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const qs = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (q.trim()) qs.set("q", q.trim());
        if (status !== "all") qs.set("status", status);

        const { data: json } = await api.get<ApiResponse>("/api/drivers", {
          params: {
            page,
            limit,
            q: q.trim() || undefined,
            status: status !== "all" ? status : undefined,
          },
          signal: abort.signal,
        });
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

  const handleView = async (id: string) => {
    try {
      setLoadingDetail(true);
      const { data } = await api.get<DriverDoc>(`/api/drivers/${id}`);
      setSelected(data);
      setSelected(data);
      setShowModal(true);
    } catch (err: any) {
      alert(err.message || "Error loading driver details");
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="py-6">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Drivers</h1>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Search name/phone/city/license/reg no…"
            className="input input-bordered px-3 py-2 rounded border outline-none"
          />
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value as any);
            }}
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
              <tr>
                <td className="p-3" colSpan={8}>
                  Loading…
                </td>
              </tr>
            )}
            {/* {!loading && err && (
              <tr>
                <td className="p-3 text-red-600" colSpan={8}>
                  {err}
                </td>
              </tr>
            )} */}
            {!loading && !err && data.length === 0 && (
              <tr>
                <td className="p-3" colSpan={8}>
                  No drivers found.
                </td>
              </tr>
            )}
            {data.map((d) => (
              <tr key={d._id} className="border-t">
                <td className="p-3 font-medium">
                  {d.driver.firstName} {d.driver.lastName}
                  <span className="ml-2 text-xs rounded px-2 py-0.5 bg-gray-100">
                    {d.vehicleType}
                  </span>
                </td>
                <td className="p-3">{d.driver.phone}</td>
                <td className="p-3">{d.driver.city}</td>
                <td className="p-3">
                  {d.vehicle.brand} {d.vehicle.model}
                </td>
                <td className="p-3">{d.vehicle.regNo}</td>
                <td className="p-3">
                  <span
                    className={
                      "px-2 py-1 rounded text-xs " +
                      (d.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : d.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800")
                    }
                  >
                    {d.status}
                  </span>
                </td>
                <td className="p-3">
                  {d.createdAt
                    ? new Date(d.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3">
                  <button
                    className="px-2 py-1 border rounded cursor-pointer"
                    onClick={() => handleView(d._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {selected.driver.firstName} {selected.driver.lastName}
              <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
                {selected.vehicleType.toUpperCase()}
              </span>
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>Phone:</strong> {selected.driver.phone}
              </p>
              <p>
                <strong>City:</strong> {selected.driver.city}
              </p>
              <p>
                <strong>License:</strong> {selected.driver.license}
              </p>
              <p>
                <strong>NID:</strong> {selected.driver.nid}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {new Date(selected.driver.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selected.status}
              </p>
            </div>

            <hr className="my-3" />

            <h3 className="font-semibold">Vehicle Info</h3>
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <p>
                <strong>Brand:</strong> {selected.vehicle.brand}
              </p>
              <p>
                <strong>Model:</strong> {selected.vehicle.model}
              </p>
              <p>
                <strong>Reg No:</strong> {selected.vehicle.regNo}
              </p>
              <p>
                <strong>Year:</strong> {selected.vehicle.year}
              </p>
              <p>
                <strong>Fitness No:</strong> {selected.vehicle.fitnessNo}
              </p>
              <p>
                <strong>Tax Token:</strong> {selected.vehicle.taxTokenNo}
              </p>
              {selected.vehicle.routePermitNo && (
                <p>
                  <strong>Route Permit:</strong>{" "}
                  {selected.vehicle.routePermitNo}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <img
                src={`${api.defaults.baseURL || ""}${selected.driver.photoUrl}`}
                alt="Driver"
                className="h-32 w-32 object-cover rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
          {total}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 py-1">
            {page}/{totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
