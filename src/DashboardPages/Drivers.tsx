import React, { useEffect, useMemo, useRef, useState } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import api from "../lib/api";

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
    email?: string;
  };
  vehicle: {
    brand: string;
    model: string;
    regNo: string;
    year?: string;
    fitnessNo: string;
    taxTokenNo: string;
    routePermitNo?: string;
    insuranceExpiry?: string;
  };
};

type ApiResponse = {
  page: number;
  limit: number;
  total: number;
  items: DriverDoc[];
};

const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "—");
const toAbsolute = (url?: string) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const base = (api as any)?.defaults?.baseURL || "";
  if (!base) return url;
  return `${base.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
};

export default function Drivers() {
  const [rows, setRows] = useState<DriverDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<DriverDoc | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const toast = useRef<Toast>(null);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<ApiResponse>("/api/drivers", {
        params: {
          page,
          limit,
          q: q.trim() || undefined,
          status: status !== "all" ? status : undefined,
        },
      });
      setRows(data.items || []);
      setTotal(data.total || 0);
    } catch (e: any) {
      toast.current?.show({ severity: "error", summary: "Load failed", detail: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, status]);

  const onPage = (e: DataTablePageEvent) => {
    const nextLimit = e.rows ?? limit;
    const first = e.first ?? (page - 1) * nextLimit;
    setLimit(nextLimit);
    setPage(Math.floor(first / nextLimit) + 1);
  };

  const openDetail = async (id: string) => {
    try {
      setLoadingDetail(true);
      const { data } = await api.get<DriverDoc>(`/api/drivers/${id}`);
      setSelected(data);
      setDrawer(true);
    } catch (e: any) {
      toast.current?.show({ severity: "error", summary: "Error", detail: e.message });
    } finally {
      setLoadingDetail(false);
    }
  };

  // table cells
  const nameBody = (d: DriverDoc) => (
    <div className="flex items-center gap-2">
      <div className="font-medium">
        {d.driver.firstName} {d.driver.lastName}
      </div>
      <span className="text-xs px-2 py-0.5 border-round bg-gray-100 uppercase">{d.vehicleType}</span>
    </div>
  );

  const vehicleBody = (d: DriverDoc) => (
    <div>
      {d.vehicle.brand} {d.vehicle.model}
    </div>
  );

  const statusBody = (d: DriverDoc) => {
    const map = {
      approved: { label: "Approved", severity: "success" as const },
      rejected: { label: "Rejected", severity: "danger" as const },
      pending: { label: "Pending", severity: "warning" as const },
    }[d.status];
    return <Tag value={map.label} severity={map.severity} />;
  };

  const actionsBody = (d: DriverDoc) => (
    <Button size="small" label="View" icon="pi pi-eye" onClick={() => openDetail(d._id)} />
  );

  // Sidebar chip styles per new palette
  const statusChip = (s: DriverDoc["status"]) => {
    if (s === "approved")
      return (
        <div className="mt-2 inline-flex items-center rounded-full bg-primary/20 dark:bg-primary/30 px-3 py-1 text-xs font-medium text-primary dark:text-primary-accent">
          Active
        </div>
      );
    if (s === "pending")
      return (
        <div className="mt-2 inline-flex items-center rounded-full bg-yellow-500/20 dark:bg-yellow-500/30 px-3 py-1 text-xs font-medium text-white dark:text-black">
          Pending
        </div>
      );
    return (
      <div className="mt-2 inline-flex items-center rounded-full bg-rose-500/20 dark:bg-rose-500/30 px-3 py-1 text-xs font-medium text-rose-700 dark:text-rose-300">
        Rejected
      </div>
    );
  };

  const showOnlinePing = selected?.status === "approved";

  return (
    <div className="p-4 bg-gray-100 dark:bg-background-dark min-h-screen">
      <Toast ref={toast} />

      <Toolbar
        start={<h2 className="m-0 text-text-dark dark:text-text-light">Drivers</h2>}
        end={
          <div className="flex gap-2 items-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage(1);
                    load();
                  }
                }}
                placeholder="Search name/phone/city/license/reg no…"
                style={{ width: 280 }}
              />
            </span>
            <Dropdown
              value={status}
              onChange={(e) => {
                setStatus(e.value);
                setPage(1);
              }}
              options={[
                { label: "All", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
              ]}
              style={{ width: 160 }}
            />
            <Dropdown value={limit} onChange={(e) => setLimit(e.value)} options={[10, 20, 50].map((n) => ({ label: `${n}/page`, value: n }))} style={{ width: 120 }} />
            <Button icon="pi pi-refresh" label="Refresh" onClick={() => { setPage(1); load(); }} />
          </div>
        }
      />

      <DataTable
        value={rows}
        loading={loading}
        dataKey="_id"
        paginator
        rows={limit}
        totalRecords={total}
        first={(page - 1) * limit}
        onPage={onPage}
        responsiveLayout="scroll"
        emptyMessage="No drivers found."
      >
        <Column header="Driver" body={nameBody} />
        <Column header="Phone" field="driver.phone" />
        <Column header="City" field="driver.city" />
        <Column header="Vehicle" body={vehicleBody} />
        <Column header="Reg No" field="vehicle.regNo" />
        <Column header="Status" body={statusBody} />
        <Column header="Applied" body={(d: DriverDoc) => fmtDate(d.createdAt)} />
        <Column header="Actions" body={actionsBody} style={{ width: 140 }} />
      </DataTable>

      <div className="mt-2 text-sm text-text-dark/70 dark:text-text-light/70">
        Showing {(page - 1) * limit + (rows.length ? 1 : 0)}–{Math.min(page * limit, total)} of {total}
      </div>

      {/* Detail Drawer — updated to your new theme */}
      <Sidebar
      className="bg-[#efe9d5]"
        visible={drawer}
        onHide={() => setDrawer(false)}
        position="right"
        modal
        blockScroll
        showCloseIcon
        style={{ width: "420px", maxWidth: "100%" }}
        pt={{
          root: { style: { borderLeft: "1px solid rgba(0,0,0,0.06)" } },
          content: { style: { padding: 0 } },
        }}
      >
        {loadingDetail && <div className="p-4 text-text-dark dark:text-text-light">Loading…</div>}
        {!loadingDetail && selected && (
          <div className="bg-[#efe9d5]">
            <div className="p-6 flex flex-col gap-8">
              {/* Profile */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24"
                    style={{
                      backgroundImage: `url("${toAbsolute(selected.driver.photoUrl) || "https://placehold.co/192x192?text=Driver"}")`,
                    }}
                    data-alt={`${selected.driver.firstName} ${selected.driver.lastName}`}
                  />
                  {showOnlinePing && (
                    <span className="absolute bottom-1 right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white dark:border-background-light" />
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-bold text-text-dark dark:text-text-light">
                    {selected.driver.firstName} {selected.driver.lastName}
                  </h1>
                  <p className="text-sm text-text-dark/70 dark:text-text-light/70">
                    Driver ID: {selected._id}
                  </p>
                  {statusChip(selected.status)}
                </div>
              </div>


              {/* Driver Details */}
              <div className="flex flex-col gap-4 rounded-xl dark:bg-black/20 p-4">
                <div>
                  <h2 className="text-lg font-bold text-text-dark dark:text-text-light text-center">Driver Details</h2>
                </div>
                <div className="grid grid-cols-1">
                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">Contact Number</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.driver.phone}</p>
                  </div>

                  {selected.driver.email && (
                    <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                      <p className="text-sm text-text-dark/70 dark:text-text-light/70">Email Address</p>
                      <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.driver.email}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">License Number</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.driver.license}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">NID</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.driver.nid}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">Date of Birth</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{fmtDate(selected.driver.dob)}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="flex flex-col gap-4 rounded-xl bg-white/50 dark:bg-black/20 p-4">
                <div>
                  <h2 className="text-lg font-bold text-text-dark dark:text-text-light text-center">Vehicle Information</h2>
                </div>
                <div className="grid grid-cols-1">
                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">Make &amp; Model</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">
                      {selected.vehicle.brand} {selected.vehicle.model}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">License Plate</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.vehicle.regNo}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">Year</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.vehicle.year || "—"}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">Fitness No</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.vehicle.fitnessNo}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                    <p className="text-sm text-text-dark/70 dark:text-text-light/70">Tax Token No</p>
                    <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.vehicle.taxTokenNo}</p>
                  </div>

                  {selected.vehicle.routePermitNo && (
                    <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                      <p className="text-sm text-text-dark/70 dark:text-text-light/70">Route Permit No</p>
                      <p className="text-sm font-medium text-text-dark dark:text-text-light">{selected.vehicle.routePermitNo}</p>
                    </div>
                  )}

                  {selected.vehicle.insuranceExpiry && (
                    <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 py-4">
                      <p className="text-sm text-text-dark/70 dark:text-text-light/70">Insurance Expiry</p>
                      <p className="text-sm font-medium text-text-dark dark:text-text-light">
                        {fmtDate(selected.vehicle.insuranceExpiry)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Sidebar>
    </div>
  );
}
