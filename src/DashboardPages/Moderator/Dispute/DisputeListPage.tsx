import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { listDisputes, DisputeListItem, DisputeListQuery } from "./disputesApi";
import { useNavigate, useSearchParams } from "react-router";

function useDebounce<T>(value: T, ms = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export default function DisputeListPage() {
  const [rows, setRows] = useState<DisputeListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();

  const [disputes, setDisputes] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    status: sp.get("status") || "all",
    minAmount: sp.get("minAmount") || "",
    maxAmount: sp.get("maxAmount") || "",
    age: sp.get("age") || "",
    search: sp.get("q") || "",
  });

  const [page, setPage] = useState(Number(sp.get("page") || 1));
  const [pageSize, setPageSize] = useState(Number(sp.get("pageSize") || 10));
  const toast = useRef<Toast>(null);

  const debouncedSearch = useDebounce(filters.search);

  useEffect(() => {
    const q: DisputeListQuery = {
      page, pageSize,
      status: (filters.status as any) || "all",
      minAmount: filters.minAmount ? Number(filters.minAmount) : undefined,
      maxAmount: filters.maxAmount ? Number(filters.maxAmount) : undefined,
      maxAgeHours: filters.age ? Number(filters.age) : undefined,
      search: debouncedSearch || undefined,
      sort: { field: "createdAt", dir: "desc" }
    };

    const nextSP: Record<string, string> = {
      page: String(page),
      pageSize: String(pageSize),
      status: String(filters.status || "all"),
    };
    if (filters.minAmount) nextSP.minAmount = filters.minAmount;
    if (filters.maxAmount) nextSP.maxAmount = filters.maxAmount;
    if (filters.age) nextSP.age = filters.age;
    if (debouncedSearch) nextSP.q = debouncedSearch;
    setSp(nextSP, { replace: true });

    setLoading(true);
    listDisputes(q)
      .then((res) => { setRows(res.data); setTotal(res.total); })
      .finally(() => setLoading(false));
  }, [page, pageSize, filters.status, filters.minAmount, filters.maxAmount, filters.age, debouncedSearch]);

  const slaBadge = (r: DisputeListItem) => {
    const secs = r.slaSecondsRemaining;
    const breached = secs < 0;
    const abs = Math.abs(secs);
    const h = Math.floor(abs / 3600);
    const m = Math.floor((abs % 3600) / 60);
    return <Tag value={breached ? `SLA -${h}h ${m}m` : `SLA ${h}h ${m}m`} severity={breached ? "danger" : "info"} rounded />;
  };

  const actionsTemplate = (row: DisputeListItem) => (
    <div className="flex gap-2">
      <Button label="Open" text size="small" onClick={() => navigate(`/dashboard/mod/disputes/${row.id}`)} />
      <Button label="Partial" text size="small" onClick={() => navigate(`/dashboard/mod/disputes/${row.id}?action=partial`)} />
      <Button label="Escalate" text size="small" severity="danger" onClick={() => navigate(`/dashboard/mod/disputes/${row.id}?action=escalate`)} />
    </div>
  );

  const leftToolbar = (
    <div className="flex gap-3 items-center">
      <Dropdown
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.value })}
        options={["open", "investigating", "resolved"]}
        placeholder="Status"
      />
      <InputText
        value={filters.minAmount}
        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
        placeholder="Min Amount"
        className="w-24"
      />
      <InputText
        value={filters.maxAmount}
        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
        placeholder="Max Amount"
        className="w-24"
      />
      <InputText
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search ride/user"
      />
    </div>
  );

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2 className="text-xl font-semibold mb-3">Dispute List</h2>

      <Toolbar left={leftToolbar} />

      <DataTable value={rows} loading={loading} paginator rows={pageSize} totalRecords={total}
        onPage={(e) => { setPage(e.page + 1); setPageSize(e.rows); }}
        emptyMessage="No disputes found. 🎉 Check trends or summary below."
      >
        <Column field="id" header="ID" sortable />
        <Column field="amount" header="Amount (৳)" sortable />
        <Column header="Age" body={(r) => new Date(r.createdAt).toLocaleString()} />
        <Column field="opener" header="Opener" />
        <Column field="status" header="Status" body={(r) => <Tag value={r.status} />} />
        <Column header="SLA" body={slaBadge} />
        <Column header="Actions" body={actionsTemplate} />
      </DataTable>
    </div>
  );
}
