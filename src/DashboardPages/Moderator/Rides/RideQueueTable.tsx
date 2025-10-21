import React, { useEffect, useMemo, useState } from "react";
import { DataTable, DataTableSelectionMultipleChangeEvent, DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { fetchRideQueue } from "./api";
import { RideQueueItem } from "./type";

export function RideQueueTable({
  query,
  onQueryChange,
  selectedIds,
  onSelectedIdsChange,
}: {
  query: any;
  onQueryChange: (q: any) => void;
  selectedIds: string[];
  onSelectedIdsChange: (ids: string[]) => void;
}) {
  const [rows, setRows] = useState<RideQueueItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // fetch on query change (server-side)
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetchRideQueue(query, ctrl.signal)
      .then(({ items, total }) => {
        setRows(items);
        setTotal(total);
      })
      .catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [JSON.stringify(query)]);


  const selection = useMemo(
    () => rows.filter((r) => selectedIds.includes(r.rideId)),
    [rows, selectedIds]
  );

  const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<RideQueueItem[]>) => {
    onSelectedIdsChange((e.value ?? []).map((r) => r.rideId));
  };

  const onPage = (e: DataTablePageEvent) => {
  const nextPage = e.page ?? e.first / e.rows;
  onQueryChange({ ...query, page: nextPage + 1, pageSize: e.rows });
};

  const onSort = (e: DataTableSortEvent) => {
    if (!e.sortField) return;
    onQueryChange({
      ...query,
      sort: { field: e.sortField, dir: e.sortOrder === 1 ? "asc" : "desc" },
      page: 1,
    });
  };

  return (
    <DataTable
      value={rows}
      loading={loading}
      dataKey="rideId"
      selectionMode="multiple"
      selection={selection}
      onSelectionChange={onSelectionChange}
      paginator
      lazy
      rows={query.pageSize}
      first={(query.page - 1) * query.pageSize}
      totalRecords={total}
      onPage={onPage}
      sortField={query.sort.field}
      sortOrder={query.sort.dir === "asc" ? 1 : -1}
      onSort={onSort}
      responsiveLayout="scroll"
      showGridlines
      size="small"
      stripedRows
      className="rounded"
      emptyMessage="No rides match these filters."
    >
      <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

      <Column
        field="slaSecondsRemaining"
        header="SLA"
        sortable
        body={(r: RideQueueItem) => formatSLA(r.slaSecondsRemaining)}
        headerClassName="whitespace-nowrap"
        style={{ width: "8rem" }}
      />
      <Column
        field="riskScore"
        header="Risk"
        sortable
        body={(r) => riskTag(r.riskScore)}
        style={{ width: "7rem" }}
      />
      <Column
        field="createdAt"
        header="Created"
        sortable
        body={(r) => new Date(r.createdAt).toLocaleString()}
        style={{ width: "12rem" }}
      />
      <Column
        header="Ride"
        body={(r) => (
          <div>
            <div className="font-medium">{r.rideId}</div>
            <div className="text-color-secondary text-xs">{r.pickup} → {r.dropoff}</div>
          </div>
        )}
      />
      <Column
        header="Flags"
        body={(r) => (
          <div className="flex flex-wrap gap-1">
            {r.flags.map((f) => (
              <Tag key={f} value={f} rounded />
            ))}
          </div>
        )}
        style={{ width: "12rem" }}
      />
      <Column field="assignee.name" header="Assignee" body={(r) => r.assignee?.name ?? "—"} style={{ width: "10rem" }} />
      <Column field="status" header="Status" body={(r) => <Tag value={r.status} />} style={{ width: "9rem" }} />
    </DataTable>
  );
}

function formatSLA(s?: number) {
  if (s == null) return "—";
  const abs = Math.max(0, s);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const text = `${h}h ${m}m`;
  return s <= 0 ? `BREACHED (${text})` : text;
}

function riskTag(score: number) {
  const severity = score >= 80 ? "danger" : score >= 50 ? "warning" : "success";
  return <Tag value={score} severity={severity as any} />;
}
