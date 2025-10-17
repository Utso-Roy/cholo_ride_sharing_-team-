// src/modules/mod/verification/VerificationPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

import VerificationDrawer from "./VerificationDrawer";
import {
  fetchApplications,
  approve,
  rejectApp,
  needInfo,
  type ApplicationRow,
  type AppStatus,
} from "./api";

export default function VerificationPage() {
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<AppStatus | "all">("pending");
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<ApplicationRow | null>(null);
  const [drawer, setDrawer] = useState(false);

  const toast = useRef<Toast>(null);
  const load = async () => {
    const res = await fetchApplications({
      page,
      limit,
      status,
      search,
      sort: "submittedAt",
      order: "desc",
    });
    setRows(res.data);
    setTotal(res.total);
  };

  useEffect(() => {
    load().catch((e) =>
      toast.current?.show({
        severity: "error",
        summary: "Load failed",
        detail: e.message,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, status]);

  const onPage = (e: DataTablePageEvent) => {
    const nextLimit = e.rows ?? limit;
    const first = e.first ?? (page - 1) * nextLimit;
    setLimit(nextLimit);
    setPage(Math.floor(first / nextLimit) + 1);
  };

  const statusTag = (s: AppStatus) => {
    const map = {
      pending: { label: "Pending", severity: "info" as const },
      approved: { label: "Approved", severity: "success" as const },
      rejected: { label: "Rejected", severity: "danger" as const },
      need_info: { label: "Need Info", severity: "warning" as const },
    }[s];
    return <Tag value={map.label} severity={map.severity} />;
  };

  // actions wired with toast + reload
  const wrap =
    (fn: (...a: any[]) => Promise<void>) =>
    async (...a: any[]) => {
      try {
        await fn(...a);
        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: "Decision saved",
        });
        setDrawer(false);
        setSelected(null);
        await load();
      } catch (e: any) {
        toast.current?.show({
          severity: "error",
          summary: "Failed",
          detail: e.message,
        });
      }
    };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <Toolbar
        start={<h3 className="m-0">Verification Queue</h3>}
        end={
          <div className="flex gap-2 items-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPage(1);
                    load();
                  }
                }}
                placeholder="Search name/phone/reg no..."
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
                { label: "Need Info", value: "need_info" },
              ]}
              style={{ width: 160 }}
              placeholder="Status"
            />
            <Dropdown
              value={limit}
              onChange={(e) => setLimit(e.value)}
              options={[10, 20, 50].map((n) => ({
                label: `${n}/page`,
                value: n,
              }))}
              style={{ width: 120 }}
            />
            <Button
              icon="pi pi-refresh"
              label="Refresh"
              onClick={() => load()}
            />
          </div>
        }
      />

      <DataTable
        value={rows}
        dataKey="_id"
        paginator
        rows={limit}
        totalRecords={total}
        first={(page - 1) * limit}
        onPage={onPage}
        responsiveLayout="scroll"
        emptyMessage="No applications found"
        selectionMode="single"
        // onRowClick={(e) => {
        //   setSelected(e.data as ApplicationRow);
        //   setDrawer(true);
        // }}
      >
        <Column
          header="Type"
          body={(r: ApplicationRow) => (
            <span className="px-2 py-1 border-round text-xs uppercase">
              {r.type}
            </span>
          )}
          style={{ width: 90 }}
        />
        <Column
          header="Applicant"
          body={(r: ApplicationRow) => (
            <div>
              <b>
                {r.driver.firstName} {r.driver.lastName}
              </b>
              <div className="text-xs">{r.driver.phone}</div>
            </div>
          )}
        />
        <Column
          header="Vehicle"
          body={(r: ApplicationRow) => (
            <div>
              {r.vehicle.brand} {r.vehicle.model}{" "}
              {r.vehicle.year ? `(${r.vehicle.year})` : ""}
            </div>
          )}
        />
        <Column
          header="Reg No"
          body={(r: ApplicationRow) => r.vehicle.regNo || "-"}
          style={{ width: 160 }}
        />
        <Column header="Submitted" field="submittedAt" style={{ width: 170 }} />
        <Column
          header="Status"
          body={(r: ApplicationRow) => statusTag(r.status)}
          style={{ width: 140 }}
        />
        <Column
          header="Open"
          body={(rowData: ApplicationRow) => (
            <Button
              size="small"
              label="Open"
              icon="pi pi-eye"
              onClick={() => {
                setSelected(rowData);
                setDrawer(true);
              }}
            />
          )}
          style={{ width: 110 }}
        />
      </DataTable>

      <VerificationDrawer
        visible={drawer}
        onHide={() => setDrawer(false)}
        row={selected}
        onApprove={wrap(approve)}
        onReject={wrap(rejectApp)}
        onNeedInfo={wrap(async (type, id, notes) => {
          if (!notes?.trim()) throw new Error("Notes required for Need Info");
          await needInfo(type, id, notes);
        })}
      />
    </div>
  );
}
