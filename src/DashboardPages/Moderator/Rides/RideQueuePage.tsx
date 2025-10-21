import React, { useRef, useState, useEffect } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { RideQueueFilters } from "./RideQueueFilters";
import { RideQueueTable } from "./RideQueueTable";
import { assignRides, bulkStatus, RideQueueQuery } from "./api";
import { useSearchParams } from "react-router";

export default function RideQueuePage() {
  const toast = useRef<Toast>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultQuery: RideQueueQuery = {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 25,
    status: searchParams.get("status")?.split(",") as ("pending" | "investigating")[] || ["pending", "investigating"],
    assignee: (searchParams.get("assignee") as "me" | "unassigned" | string) || "unassigned",
    minRisk: Number(searchParams.get("minRisk")) || 0,
    hasEvidence: searchParams.get("hasEvidence") === "true" ? true : undefined,
    sort: searchParams.get("sort")
      ? (() => {
          const [field, dir] = searchParams.get("sort")!.split(":");
          return { field, dir } as RideQueueQuery["sort"];
        })()
      : { field: "slaSecondsRemaining", dir: "asc" },
    text: searchParams.get("text") || "",
  };

  const [query, setQuery] = useState<RideQueueQuery>(defaultQuery);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const params: Record<string, string> = {
      page: String(query.page),
      pageSize: String(query.pageSize),
      status: query.status?.join(",") ?? "",
      assignee: query.assignee ?? "",
      minRisk: String(query.minRisk ?? 0),
      ...(query.hasEvidence !== undefined && { hasEvidence: String(query.hasEvidence) }),
      ...(query.sort && { sort: `${query.sort.field}:${query.sort.dir}` }),
      ...(query.text && { text: query.text }),
    };
    setSearchParams(params, { replace: true });
  }, [query, setSearchParams]);

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
              toast.current?.show({
                severity: "success",
                summary: "Assigned",
                detail: "Rides assigned to you",
              });
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
              toast.current?.show({
                severity: "success",
                summary: "Resolved",
                detail: "Rides updated",
              });
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
