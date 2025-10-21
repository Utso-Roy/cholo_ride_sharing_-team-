import React, { useRef, useState, useEffect } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { RideQueueFilters } from "./RideQueueFilters";
import { RideQueueTable } from "./RideQueueTable";
import { assignRides, bulkStatus } from "./api";

export default function RideQueuePage() {
  const toast = useRef<Toast>(null);

  // central query state -> filters + table
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 25,
    status: ["pending", "investigating"] as ("pending" | "investigating")[],
    assignee: "unassigned" as "me" | "unassigned" | string,
    minRisk: 0,
    hasEvidence: undefined as boolean | undefined,
    sort: { field: "slaSecondsRemaining" as const, dir: "asc" as const },
    text: "",
  });

  // selection comes back from table
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const left = (
    <div className="flex items-center gap-2">
      <Button
        label="Assign to me"
        icon="pi pi-user-plus"
        disabled={!selectedIds.length}
        onClick={() => {
          confirmDialog({
            message: `Assign ${selectedIds.length} ride(s) to you?`,
            accept: async () => {
              await assignRides(selectedIds, "me");
              setSelectedIds([]);
              setQuery({ ...query }); // refetch via table
              toast.current?.show({ severity: "success", summary: "Assigned", detail: "Rides assigned to you" });
            },
          });
        }}
      />
      <Button
        label="Mark resolved"
        icon="pi pi-check-circle"
        severity="success"
        outlined
        disabled={!selectedIds.length}
        onClick={() => {
          confirmDialog({
            message: `Resolve ${selectedIds.length} ride(s)?`,
            accept: async () => {
              await bulkStatus(selectedIds, "resolved");
              setSelectedIds([]);
              setQuery({ ...query });
              toast.current?.show({ severity: "success", summary: "Resolved", detail: "Rides updated" });
            },
          });
        }}
      />
    </div>
  );

  const right = (
    <div className="text-sm text-color-secondary pr-2">
      {selectedIds.length ? `${selectedIds.length} selected` : null}
    </div>
  );

  return (
    <div className="p-3">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="mb-3">
        <Toolbar start={left} end={right} />
      </div>

      <RideQueueFilters value={query} onChange={setQuery} />

      <RideQueueTable
        query={query}
        onQueryChange={setQuery}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
      />
    </div>
  );
}
