import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DataTable,
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Toast } from "primereact/toast";
import { Link } from "react-router";

// ---- Types (query + rows) ----
export interface RideQueueQuery {
  page: number; // 1-based (PrimeReact DataTable 'first' থেকে কনভার্ট করব)
  pageSize: number; // rows per page
  status?: ("pending" | "investigating")[];
  sort?: { field: "createdAt" | "riskScore"; dir: "asc" | "desc" };
  text?: string; // rideId / names / free text
}

interface RideRow {
  rideId: string;
  createdAt: string; // ISO time
  driver: string;
  rider: string;
  flags: string[];
  status: "pending" | "investigating";
  riskScore: number; // 0-100
}

// ---- Demo server (replace with real API) ----
async function fetchRideQueue(
  query: RideQueueQuery
): Promise<{ data: RideRow[]; total: number }> {
  // 👉 এখানে তুমি আসল API কল করবে (fetch/axios)। নিচে demo ডেটা + server-side filter/sort/page দেখানো হলো।
  const all: RideRow[] = [
    {
      rideId: "RIDE123",
      createdAt: "2025-10-22T10:30:00Z",
      driver: "Fahim Rahman",
      rider: "Rafiul Hasan",
      flags: ["fare anomaly", "detour 8%"],
      status: "investigating",
      riskScore: 85,
    },
    {
      rideId: "RIDE124",
      createdAt: "2025-10-22T11:00:00Z",
      driver: "Mehedi",
      rider: "Tanvir",
      flags: ["cancel streak"],
      status: "pending",
      riskScore: 65,
    },
    {
      rideId: "RIDE125",
      createdAt: "2025-10-22T11:10:00Z",
      driver: "Sadia",
      rider: "Arif",
      flags: ["detour 12%"],
      status: "investigating",
      riskScore: 92,
    },
  ];

  // text filter
  let filtered = all.filter((r) => {
    if (!query.text) return true;
    const t = query.text.toLowerCase();
    return (
      r.rideId.toLowerCase().includes(t) ||
      r.driver.toLowerCase().includes(t) ||
      r.rider.toLowerCase().includes(t) ||
      r.flags.join(" ").toLowerCase().includes(t)
    );
  });

  // status filter
  if (query.status && query.status.length) {
    filtered = filtered.filter((r) => query.status!.includes(r.status));
  }

  // priority sort default: high risk first (যদি sort না দেয়া থাকে)
  if (query.sort) {
    const { field, dir } = query.sort;
    filtered.sort((a, b) => {
      const av = field === "createdAt" ? Date.parse(a.createdAt) : a.riskScore;
      const bv = field === "createdAt" ? Date.parse(b.createdAt) : b.riskScore;
      return dir === "asc" ? av - bv : bv - av;
    });
  } else {
    filtered.sort((a, b) => b.riskScore - a.riskScore); // উচ্চ-ঝুঁকি আগে
  }

  // pagination (1-based page)
  const start = (query.page - 1) * query.pageSize;
  const end = start + query.pageSize;
  const pageSlice = filtered.slice(start, end);

  // ছোট delay যেন loading UI দেখা যায়
  await new Promise((res) => setTimeout(res, 300));

  return { data: pageSlice, total: filtered.length };
}

export default function RideQueuePage() {
  // ---- table state ----
  const [rows, setRows] = useState<RideRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // DataTable pagination params
  const [first, setFirst] = useState(0); // zero-based index of first row on current page
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // sort
  const [sortField, setSortField] = useState<
    "createdAt" | "riskScore" | undefined
  >(undefined);
  const [sortOrder, setSortOrder] = useState<1 | -1 | 0>(0); // 1=asc, -1=desc, 0=no sort

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ("pending" | "investigating")[] | undefined
  >(undefined);

  // toast
  const toastRef = useRef<Toast>(null);

  // ---- Build query for server (derive from UI state) ----
  const query: RideQueueQuery = useMemo(() => {
    return {
      page: Math.floor(first / rowsPerPage) + 1, // 1-based
      pageSize: rowsPerPage,
      text: search.trim() || undefined,
      status: statusFilter && statusFilter.length ? statusFilter : undefined,
      sort:
        sortField && sortOrder
          ? { field: sortField, dir: sortOrder === 1 ? "asc" : "desc" }
          : undefined,
    };
  }, [first, rowsPerPage, search, statusFilter, sortField, sortOrder]);

  // ---- Debounce search: user টাইপ করতেই সার্ভার হিট না করি ----
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  // ---- Fetch server data whenever debouncedQuery changes ----
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchRideQueue(debouncedQuery)
      .then((res) => {
        if (cancelled) return;
        setRows(res.data);
        setTotal(res.total);
      })
      .catch(() => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to load rides",
        });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // ---- DataTable event handlers ----
  const onPage = (e: DataTablePageEvent) => {
    setFirst(e.first);
    setRowsPerPage(e.rows);
  };

  const onSort = (e: DataTableSortEvent) => {
    // e.sortField: string | Function; e.sortOrder: 1 | -1 | 0
    if (e.sortField === "createdAt" || e.sortField === "riskScore") {
      setSortField(e.sortField);
      setSortOrder((e.sortOrder ?? 0) as 1 | -1 | 0);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter(undefined);
    setSortField(undefined);
    setSortOrder(0);
    setFirst(0);
  };

  // ---- Cell templates ----
  const flagTemplate = (row: RideRow) =>
    row.flags.map((f, i) => <Tag key={i} value={f} className="mr-1" />);

  const statusTemplate = (row: RideRow) => (
    <Tag
      value={row.status}
      severity={row.status === "investigating" ? "danger" : "warning"}
    />
  );

  const actionTemplate = (row: RideRow) => (
    <div className="flex gap-2">
      <Button icon="pi pi-envelope" rounded text tooltip="Nudge Message" />
      <Button icon="pi pi-comments" rounded text tooltip="Open Chat" />
      <Button icon="pi pi-lock" rounded text tooltip="Temp Lock" />
    </div>
  );

  // ---- UI ----
  return (
    <div className="p-4">
      <Toast ref={toastRef} />
      <h2 className="text-xl font-semibold mb-3">Ride Queue</h2>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-3 items-center mb-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setFirst(0);
            }}
            placeholder="Search rideId / driver / rider / flags"
            style={{ width: 320 }}
          />
        </span>

        <MultiSelect
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.value);
            setFirst(0);
          }}
          options={[
            { label: "Pending", value: "pending" },
            { label: "Investigating", value: "investigating" },
          ]}
          placeholder="Status filter"
          display="chip"
          className="w-64"
        />

        <Button
          label="Reset"
          icon="pi pi-filter-slash"
          text
          onClick={resetFilters}
        />
      </div>

      {/* DataTable */}
      <DataTable
        value={rows}
        loading={loading}
        paginator
        rows={rowsPerPage}
        totalRecords={total}
        first={first}
        onPage={onPage}
        lazy // 👉 server-driven paging/sort/filter নির্দেশ করে
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
        removableSort
        tableStyle={{ minWidth: "70rem" }}
        emptyMessage="No rides found"
      >
        <Column
          field="rideId"
          header="Ride ID"
          body={(r: any) => (
            <Link
              to={`/dashboard/mod/rides/${r.rideId}`}
              className="text-primary underline"
            >
              {r.rideId}
            </Link>
          )}
        />
        <Column
          field="createdAt"
          header="Time"
          sortable
          body={(r: RideRow) => new Date(r.createdAt).toLocaleString()}
        />
        <Column field="driver" header="Driver" />
        <Column field="rider" header="Rider" />
        <Column header="Flags" body={flagTemplate} />
        <Column header="Status" body={statusTemplate} sortable field="status" />
        <Column header="Risk" field="riskScore" sortable />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
}
