// src/features/templates/TemplateListPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import {
  listTemplates, deleteTemplate, duplicateTemplate, updateTemplate, createTemplate
} from "./api";
import { MessageTemplate } from "./types";
import { TemplateFormDialog } from "./TemplateFormDialog";

export const TemplateListPage: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [pinnedOnly, setPinnedOnly] = useState<boolean | undefined>(undefined);

  const [rows, setRows] = useState<MessageTemplate[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState<MessageTemplate | null>(null);
  const [creating, setCreating] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await listTemplates({
        q, category: category || undefined, folder: folder || undefined,
        pinned: pinnedOnly, page, pageSize, sort: "updatedAt:desc"
      });
      setRows(res.items);
      setTotal(res.total);
    } catch (e:any) {
      toast.current?.show({ severity: "error", summary: "Load failed", detail: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); /* eslint-disable */ }, [q, category, folder, pinnedOnly, page, pageSize]);

  const onDelete = (id: string) => {
    confirmDialog({
      message: "Delete this template?",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await deleteTemplate(id);
        toast.current?.show({ severity: "success", summary: "Deleted" });
        fetch();
      }
    });
  };

  const onDuplicate = async (id: string) => {
    await duplicateTemplate(id);
    toast.current?.show({ severity: "success", summary: "Duplicated" });
    fetch();
  };

  const togglePin = async (row: MessageTemplate) => {
    await updateTemplate(row._id, { pinned: !row.pinned });
    fetch();
  };

  const left = (
    <div className="flex items-center gap-2">
      <Button label="New Template" icon="pi pi-plus" onClick={() => setCreating(true)} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title / body / key" />
      </span>
      <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={["", "report","dispute","verification"]} placeholder="Category" />
      <InputText value={folder} onChange={(e)=>setFolder(e.target.value)} placeholder="Folder" />
      <Dropdown value={pinnedOnly as any} onChange={(e)=>setPinnedOnly(e.value)} options={[
        { label: "All", value: undefined }, { label: "Pinned only", value: true }, { label: "Unpinned", value: false }
      ]} placeholder="Pinned" />
    </div>
  );

  const actionsBody = (row: MessageTemplate) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded text onClick={() => setEditing(row)} tooltip="Edit" />
      <Button icon="pi pi-copy" rounded text onClick={() => onDuplicate(row._id)} tooltip="Duplicate" />
      <Button icon={row.pinned ? "pi pi-star-fill" : "pi pi-star"} rounded text onClick={() => togglePin(row)} tooltip="Toggle Pin" />
      <Button icon="pi pi-trash" severity="danger" rounded text onClick={() => onDelete(row._id)} tooltip="Delete" />
    </div>
  );

  const subjectBody = (row: MessageTemplate) => (
    <div>
      <div className="font-medium">{row.currentVersion.subject}</div>
      <div className="text-xs opacity-70">v{row.currentVersion.version} • {new Date(row.currentVersion.updatedAt).toLocaleString()}</div>
    </div>
  );

  const variablesBody = (row: MessageTemplate) => (
    <div className="flex gap-1 flex-wrap">
      {row.variables?.map(v => <Tag key={v} value={`{{${v}}}`} />)}
    </div>
  );

  const onPage = (e: DataTablePageEvent) => {
    setPage(Math.floor((e.first ?? 0) / (e.rows ?? pageSize)) + 1);
    setPageSize(e.rows ?? 10);
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Toolbar left={left} />
      <DataTable value={rows} loading={loading} paginator
        rows={pageSize} first={(page-1)*pageSize} totalRecords={total}
        onPage={onPage} rowsPerPageOptions={[10,20,50]} dataKey="_id" stripedRows>
        <Column field="title" header="Title" sortable />
        <Column field="category" header="Category" body={(r) => <Tag value={r.category} />} />
        <Column field="folder" header="Folder" />
        <Column header="Subject" body={subjectBody} />
        <Column header="Vars" body={variablesBody} />
        <Column header="Used" body={(r) => r.usageStats?.usedCount ?? 0} />
        <Column header="" body={actionsBody} style={{ width: 220 }} />
      </DataTable>

      {creating && (
        <TemplateFormDialog
          visible={creating}
          onHide={() => setCreating(false)}
          onSubmit={async (payload) => {
            await createTemplate(payload);
            setCreating(false);
            toast.current?.show({ severity: "success", summary: "Created" });
            fetch();
          }}
        />
      )}

      {editing && (
        <TemplateFormDialog
          visible={!!editing}
          template={editing}
          onHide={() => setEditing(null)}
          onSubmit={async (payload) => {
            await updateTemplate(editing!._id, payload);
            setEditing(null);
            toast.current?.show({ severity: "success", summary: "Updated" });
            fetch();
          }}
        />
      )}
    </div>
  );
};
