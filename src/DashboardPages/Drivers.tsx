import React, { useEffect, useRef, useState } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import api from "../lib/api"; // <-- default export (match your api.ts)

/** Types */
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

/** Helpers */
const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "—");
const toAbsolute = (url?: string) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const base = (api as any)?.defaults?.baseURL || "";
  if (!base) return url;
  return `${base.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
};

export default function Drivers() {
  /** table state */
  const [rows, setRows] = useState<DriverDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [first, setFirst] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /** filters */
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  /** ui state */
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<DriverDoc | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const toast = useRef<Toast>(null);

  /** derived */
  const page = Math.floor(first / rowsPerPage) + 1;

  /** data loader */
  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<ApiResponse>("/api/drivers", {
        params: {
          page,
          limit: rowsPerPage,
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

  /** load on paging/filter change */
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first, rowsPerPage, status]);

  /** debounce search */
  useEffect(() => {
    const t = setTimeout(() => {
      setFirst(0);
      load();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  /** pagination event */
  const onPage = (e: DataTablePageEvent) => {
    setFirst(e.first ?? 0);
    setRowsPerPage(e.rows ?? rowsPerPage);
  };

  /** open detail drawer */
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

  /** table cells */
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

  /** detail drawer chips */
  const statusChip = (s: DriverDoc["status"]) => {
    if (s === "approved")
      return (
        <div className="mt-2 inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-700">
          Active
        </div>
      );
    if (s === "pending")
      return (
        <div className="mt-2 inline-flex items-center rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-700">
          Pending
        </div>
      );
    return (
      <div className="mt-2 inline-flex items-center rounded-full bg-rose-500/20 px-3 py-1 text-xs font-medium text-rose-700">
        Rejected
      </div>
    );
  };

  const showOnlinePing = selected?.status === "approved";

  return (
    <div className="p-4">
      <Toast ref={toast} />

      <Toolbar
        start={<h2 className="m-0">Drivers</h2>}
        end={
          <div className="flex gap-2 items-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFirst(0);
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
                setFirst(0);
              }}
              options={[
                { label: "All", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
              ]}
              style={{ width: 160 }}
            />
            <Dropdown
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(e.value);
                setFirst(0);
              }}
              options={[5, 10, 20, 50].map((n) => ({ label: `${n}/page`, value: n }))}
              style={{ width: 120 }}
            />
          </div>
        }
      />

      <DataTable
        value={rows}
        loading={loading}
        paginator
        first={first}
        rows={rowsPerPage}
        totalRecords={total}
        onPage={onPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
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

      {/* Detail Drawer */}
      <Sidebar
        visible={drawer}
        onHide={() => setDrawer(false)}
        position="right"
        modal
        blockScroll
        showCloseIcon
        style={{ width: "420px", maxWidth: "100%" }}
      >
        {loadingDetail && <div className="p-4">Loading…</div>}
        {!loadingDetail && selected && (
          <div>
            <div className="p-6 flex flex-col gap-8">
              {/* Profile */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full"
                    style={{
                      width: 96,
                      height: 96,
                      backgroundImage: `url("${toAbsolute(selected.driver.photoUrl) || "https://placehold.co/192x192?text=Driver"}")`,
                    }}
                    data-alt={`${selected.driver.firstName} ${selected.driver.lastName}`}
                  />
                  {showOnlinePing && (
                    <span className="absolute bottom-1 right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-600 border-2 border-white" />
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <h1 className="text-xl font-bold">
                    {selected.driver.firstName} {selected.driver.lastName}
                  </h1>
                  <p className="text-sm text-gray-500">Driver ID: {selected._id}</p>
                  {statusChip(selected.status)}
                </div>
              </div>

              {/* Details */}
              <div className="px-1 grid grid-cols-2 gap-3 text-sm">
                <p><strong>Phone:</strong> {selected.driver.phone}</p>
                <p><strong>City:</strong> {selected.driver.city}</p>
                <p><strong>License:</strong> {selected.driver.license}</p>
                <p><strong>NID:</strong> {selected.driver.nid}</p>
                <p><strong>DOB:</strong> {fmtDate(selected.driver.dob)}</p>
                <p><strong>Status:</strong> {selected.status}</p>
                <p><strong>Brand:</strong> {selected.vehicle.brand}</p>
                <p><strong>Model:</strong> {selected.vehicle.model}</p>
                <p><strong>Reg No:</strong> {selected.vehicle.regNo}</p>
                <p><strong>Year:</strong> {selected.vehicle.year}</p>
                <p><strong>Fitness No:</strong> {selected.vehicle.fitnessNo}</p>
                <p><strong>Tax Token:</strong> {selected.vehicle.taxTokenNo}</p>
                {selected.vehicle.routePermitNo && (
                  <p><strong>Route Permit:</strong> {selected.vehicle.routePermitNo}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Sidebar>
    </div>
  );
}
