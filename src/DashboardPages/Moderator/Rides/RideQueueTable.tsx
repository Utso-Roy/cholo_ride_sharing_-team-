import React, { useEffect, useMemo, useState } from "react";
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableRowClickEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { fetchRideQueue } from "./api";
import { RideQueueItem } from "./types";

export interface RideQueueTableProps {
  query: {
    page: number;
    pageSize: number;
    status?: ("pending" | "investigating" | "resolved" | "rejected")[];
    assignee?: "me" | "unassigned" | string;
    minRisk?: number;
    hasEvidence?: boolean;
    sort?: { field: "createdAt" | "riskScore" | "slaSecondsRemaining"; dir: "asc" | "desc" };
    text?: string;
  };
  onQueryChange: (q: RideQueueTableProps["query"]) => void;
  selectedIds: string[];
  onSelectedIdsChange: (ids: string[]) => void;
  onOpenRide?: (rideId: string) => void; // optional → table is reusable elsewhere
}

export function RideQueueTable({
  query,
  onQueryChange,
  selectedIds,
  onSelectedIdsChange,
  onOpenRide,
}: RideQueueTableProps) {
  const [rows, setRows] = useState<RideQueueItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // fetch on query change (server-side, lazy)
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

  // PrimeReact selection expects row objects – map to/from ids
  const selection = useMemo(
    () => rows.filter((r) => selectedIds.includes(r.rideId)),
    [rows, selectedIds]
  );

  const onSelectionChange = (e: DataTableSelectionMultipleChangeEvent<RideQueueItem[]>) => {
    onSelectedIdsChange((e.value ?? []).map((r) => r.rideId));
  };

  const onPage = (e: DataTablePageEvent) => {
    // e.page may be undefined in some PrimeReact versions; compute from first/rows
    const nextZeroBased = (e.page ?? e.first / e.rows) || 0;
    onQueryChange({ ...query, page: nextZeroBased + 1, pageSize: e.rows });
  };

  const onSort = (e: DataTableSortEvent) => {
    if (!e.sortField) return;
    onQueryChange({
      ...query,
      sort: {
        field: e.sortField as "createdAt" | "riskScore" | "slaSecondsRemaining",
        dir: e.sortOrder === 1 ? "asc" : "desc",
      },
      page: 1,
    });
  };

  return (
    <DataTable
      value={rows}
      loading={loading}
      dataKey="rideId"
      selection={selection}
      onSelectionChange={onSelectionChange}
      paginator
      lazy
      rows={query.pageSize}
      first={(query.page - 1) * query.pageSize}
      totalRecords={total}
      onPage={onPage}
      sortField={query.sort?.field}
      sortOrder={query.sort?.dir === "asc" ? 1 : -1}
      onSort={onSort}
      responsiveLayout="scroll"
      showGridlines
      size="small"
      stripedRows
      emptyMessage="No rides match these filters."
      rowHover
      onRowClick={
        onOpenRide
          ? (e: DataTableRowClickEvent) => onOpenRide(e.data.rideId)
          : undefined
      }
      className={onOpenRide ? "cursor-pointer" : undefined}
    >
      {/* Checkbox selection via column keeps row click free for navigation */}
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
        body={(r: RideQueueItem) => riskTag(r.riskScore)}
        style={{ width: "7rem" }}
      />

      <Column
        field="createdAt"
        header="Created"
        sortable
        body={(r: RideQueueItem) => new Date(r.createdAt).toLocaleString()}
        style={{ width: "12rem" }}
      />

      <Column
        header="Ride"
        body={(r: RideQueueItem) => (
          <div>
            <div className="font-medium">{r.rideId}</div>
            <div className="text-color-secondary text-xs">{r.pickup} → {r.dropoff}</div>
          </div>
        )}
      />

      <Column
        header="Flags"
        body={(r: RideQueueItem) => (
          <div className="flex flex-wrap gap-1">
            {r.flags.map((f) => (
              <Tag key={f} value={f} rounded />
            ))}
          </div>
        )}
        style={{ width: "12rem" }}
      />

      <Column
        field="assignee.name"
        header="Assignee"
        body={(r: RideQueueItem) => r.assignee?.name ?? "—"}
        style={{ width: "10rem" }}
      />

      <Column
        field="status"
        header="Status"
        body={(r: RideQueueItem) => <Tag value={r.status} />}
        style={{ width: "9rem" }}
      />

      {/* Small explicit action that doesn't toggle selection */}
      <Column
        header=""
        body={(r: RideQueueItem) => (
          <button
            className="p-button p-button-text p-button-sm p-1"
            onClick={(e) => {
              e.stopPropagation();
              onOpenRide?.(r.rideId);
            }}
            title="Open details"
            aria-label={`Open ride ${r.rideId}`}
          >
            <i className="pi pi-external-link" />
          </button>
        )}
        style={{ width: "4rem", textAlign: "right" as const }}
        headerStyle={{ width: "4rem" }}
      />
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
