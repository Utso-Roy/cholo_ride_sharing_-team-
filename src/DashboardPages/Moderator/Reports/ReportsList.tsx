import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DataTable,
  DataTableSelectionChangeEvent,
  DataTableSortEvent,
  DataTablePageEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { bulkAction, fetchReports, ReportRow, ReportsQuery } from "./reportsApi";

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Review", value: "in_review" },
  { label: "Need Info", value: "need_info" },
  { label: "Resolved", value: "resolved" },
  { label: "Escalated", value: "escalated" },
];
const categoryOptions = [
  { label: "Abuse", value: "abuse" },
  { label: "Fare", value: "fare" },
  { label: "Safety", value: "safety" },
];
const yesNo = [
  { label: "Has evidence", value: "true" },
  { label: "No evidence", value: "false" },
];
const ageOptions = [
  { label: "> 24h", value: "24h" },
  { label: "> 48h", value: "48h" },
  { label: "> 72h", value: "72h" },
];

function getSlaSeverity(deadlineAt: string, warnBeforeHours = 4 as number): "success"|"warning"|"danger" {
  const diffMs = new Date(deadlineAt).getTime() - Date.now();
  if (isNaN(diffMs)) return "danger"; // invalid date → fail safe
  if (diffMs <= 0) return "danger";
  return diffMs / 36e5 < warnBeforeHours ? "warning" : "success";
}
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();
}

const ReportsList: React.FC = () => {
  const toast = useRef<Toast>(null);

  // table state
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [total, setTotal] = useState(0);

  const [selection, setSelection] = useState<ReportRow[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<1 | -1>(-1);

  // filters
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [hasEvidence, setHasEvidence] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // add note dialog
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  // 7 days summary (comes with API when empty)
  const [summary7d, setSummary7d] = useState<{
    opened: number;
    resolved: number;
    breachPct: number;
    topCategories: Array<{ category: string; count: number }>;
  } | null>(null);

  const query: ReportsQuery = useMemo(
    () => ({
      page,
      limit,
      sort: sortField,
      order: sortOrder === 1 ? "asc" : "desc",
      status: status ?? undefined,
      category: category ?? undefined,
      assignee: assignee ?? undefined,
      hasEvidence: hasEvidence ?? undefined,
      age: age ?? undefined,
      search: search || undefined,
    }),
    [page, limit, sortField, sortOrder, status, category, assignee, hasEvidence, age, search]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchReports(query);
        setRows(res.data);
        setTotal(res.total);
        setSummary7d(res.summary7d ?? null);
      } catch {
        toast.current?.show({
          severity: "error",
          summary: "Load failed",
          detail: "Could not fetch reports.",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  // pagination
  const onPage = (e: DataTablePageEvent) => {
    setPage(e.page + 1);
    setLimit(e.rows);
  };

  // sorting
  const onSort = (e: DataTableSortEvent) => {
    setSortField(String(e.sortField));
    setSortOrder((e.sortOrder as 1 | -1) ?? -1);
  };

  // bulk: assign to me
  const doAssignToMe = () => {
    if (!selection.length) return;
    confirmDialog({
      header: "Assign to me",
      message: `Assign ${selection.length} report(s) to you?`,
      acceptLabel: "Yes",
      rejectLabel: "No",
      accept: async () => {
        try {
          await bulkAction({
            ids: selection.map((s) => s._id),
            action: "assign_to_me",
            reason: "Taking ownership",
          });
          toast.current?.show({ severity: "success", summary: "Assigned", detail: "Selected reports assigned." });
          const res = await fetchReports(query);
          setRows(res.data);
          setTotal(res.total);
          setSelection([]);
        } catch {
          toast.current?.show({ severity: "error", summary: "Failed", detail: "Could not assign." });
        }
      },
    });
  };

  // bulk: change status
  const [statusChangeValue, setStatusChangeValue] = useState<string | null>(null);
  const doChangeStatus = () => {
    if (!selection.length || !statusChangeValue) return;
    confirmDialog({
      header: "Change status",
      message: `Change status of ${selection.length} report(s) to "${statusChangeValue}"?`,
      acceptLabel: "Confirm",
      rejectLabel: "Cancel",
      accept: async () => {
        try {
          await bulkAction({
            ids: selection.map((s) => s._id),
            action: "status",
            value: statusChangeValue,
            reason: "Bulk status update",
          });
          toast.current?.show({ severity: "success", summary: "Updated", detail: "Status updated." });
          const res = await fetchReports(query);
          setRows(res.data);
          setTotal(res.total);
          setSelection([]);
          setStatusChangeValue(null);
        } catch {
          toast.current?.show({ severity: "error", summary: "Failed", detail: "Status change failed." });
        }
      },
    });
  };

  // bulk: add note
  const doAddNote = async () => {
    if (!selection.length || !noteText.trim()) return;
    try {
      await bulkAction({
        ids: selection.map((s) => s._id),
        action: "add_note",
        value: noteText.trim(),
        reason: "Moderator note",
      });
      toast.current?.show({ severity: "success", summary: "Noted", detail: "Note added to selected." });
      setNoteOpen(false);
      setNoteText("");
      const res = await fetchReports(query);
      setRows(res.data);
      setTotal(res.total);
      setSelection([]);
    } catch {
      toast.current?.show({ severity: "error", summary: "Failed", detail: "Could not add note." });
    }
  };

  // cells
  const createdAtBody = (r: ReportRow) => <span>{formatDate(r.createdAt)}</span>;

  const reporterSubjectBody = (r: ReportRow) => (
    <div className="flex flex-col">
      <span className="font-medium">
        {r.reporter.name} → {r.subject.name}
      </span>
      <span className="text-xs opacity-70">{r.reporter.email ?? ""}</span>
    </div>
  );

  const statusTag = (val: ReportRow["status"]) => {
    const map: Record<string, "info" | "warning" | "success" | "danger" | "secondary"> = {
      open: "info",
      in_review: "warning",
      need_info: "secondary",
      resolved: "success",
      escalated: "danger",
    };
    return <Tag value={val.replace("_", " ")} severity={map[val]} rounded />;
  };
  const statusBody = (r: ReportRow) => statusTag(r.status);

  const assigneeBody = (r: ReportRow) =>
    r.assigneeId ? <Tag severity="secondary" value={r.assigneeId} /> : <span className="opacity-60">Unassigned</span>;

  const slaBody = (r: ReportRow) => {
    const sev = getSlaSeverity(r.deadlineAt);
    const remainingHrs = Math.floor((new Date(r.deadlineAt).getTime() - Date.now()) / 36e5);
    const label = remainingHrs < 0 ? "Overdue" : `${remainingHrs}h left`;
    return <Tag value={label} severity={sev as any} rounded />;
  };

  const repeatBody = (r: ReportRow) =>
    r.repeatCount > 1 ? <Tag value={`Repeat ×${r.repeatCount}`} severity="warning" icon="pi pi-exclamation-triangle" /> : null;

  // empty-state
  const emptyTemplate = () => (
    <div className="p-6 text-center text-sm">
      <div className="text-lg font-semibold mb-2">No open reports — last 7 days summary</div>
      {summary7d ? (
        <div className="flex gap-3 justify-center">
          <Tag value={`Opened: ${summary7d.opened}`} />
          <Tag value={`Resolved: ${summary7d.resolved}`} />
          <Tag severity={summary7d.breachPct > 10 ? "warning" : "success"} value={`SLA breach: ${summary7d.breachPct}%`} />
          <Tag value={`Top: ${summary7d.topCategories.map((t) => `${t.category}(${t.count})`).join(", ")}`} />
        </div>
      ) : (
        <span className="opacity-70">No data</span>
      )}
    </div>
  );

  const leftToolbar = (
    <div className="flex items-center gap-2">
      <Button label="Assign to me" icon="pi pi-user-plus" onClick={doAssignToMe} disabled={!selection.length} />
      <Dropdown
        value={statusChangeValue}
        onChange={(e) => setStatusChangeValue(e.value)}
        options={statusOptions}
        placeholder="Change status"
        className="w-44"
        disabled={!selection.length}
        showClear
      />
      <Button label="Apply" icon="pi pi-check" outlined onClick={doChangeStatus} disabled={!selection.length || !statusChangeValue} />
      <Button label="Add note" icon="pi pi-comment" severity="secondary" onClick={() => setNoteOpen(true)} disabled={!selection.length} />
    </div>
  );

  const rightToolbar = (
    <div className="flex items-center gap-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search id/email/text" className="w-56" />
      </span>
      <Dropdown value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder="Status" className="w-36" showClear />
      <Dropdown value={category} options={categoryOptions} onChange={(e) => setCategory(e.value)} placeholder="Category" className="w-36" showClear />
      <Dropdown value={hasEvidence} options={yesNo} onChange={(e) => setHasEvidence(e.value)} placeholder="Evidence" className="w-40" showClear />
      <Dropdown value={age} options={ageOptions} onChange={(e) => setAge(e.value)} placeholder="Age" className="w-28" showClear />
      {/* Assignee selector placeholder; replace with your team list */}
      <InputText value={assignee ?? ""} onChange={(e) => setAssignee(e.target.value || null)} placeholder="Assignee ID" className="w-40" />
    </div>
  );

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      <h2 className="text-xl font-semibold mb-3">Reports</h2>

      <Toolbar start={leftToolbar} end={rightToolbar} className="mb-3" />

      <DataTable
        value={rows}
        loading={loading}
        dataKey="_id"
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e: DataTableSelectionChangeEvent<ReportRow[]>) => setSelection(e.value as ReportRow[])}
        paginator
        first={(page - 1) * limit}
        rows={limit}
        totalRecords={total}
        onPage={onPage}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
        emptyMessage={emptyTemplate()}
        responsiveLayout="scroll"
        stripedRows
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="createdAt" header="CreatedAt" sortable body={createdAtBody} />
        <Column field="category" header="Category" sortable />
        <Column header="Reporter → Subject" body={reporterSubjectBody} />
        <Column field="rideId" header="RideId" />
        <Column field="status" header="Status" sortable body={statusBody} />
        <Column header="Assignee" body={assigneeBody} />
        <Column header="SLA" body={slaBody} />
        <Column header="" body={repeatBody} />
        <Column
          header=""
          body={(r: ReportRow) => (
            <Button
              label="Open detail"
              icon="pi pi-external-link"
              text
              onClick={() => {
                // NOTE: চাইলে react-router-dom useNavigate দিয়ে করুন
                window.location.href = `/dashboard/mod/reports/${r._id}`;
              }}
            />
          )}
        />
      </DataTable>

      {/* Add Note Dialog */}
      <Dialog header="Add note to selected reports" visible={noteOpen} onHide={() => setNoteOpen(false)} style={{ width: "32rem" }}>
        <div className="flex flex-col gap-3">
          <textarea
            className="p-inputtext p-component w-full h-32"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write a short note…"
          />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setNoteOpen(false)} />
            <Button label="Add note" icon="pi pi-check" onClick={doAddNote} disabled={!noteText.trim()} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReportsList;

