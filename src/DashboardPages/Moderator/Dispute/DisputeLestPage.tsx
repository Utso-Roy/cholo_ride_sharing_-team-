import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

export default function DisputeListPage() {
  const [disputes, setDisputes] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    status: null,
    minAmount: "",
    maxAmount: "",
    age: "",
    search: "",
  });
  const toast = useRef<Toast>(null);

  useEffect(() => {
    // ✅ Fake data load (later: fetch from API)
    setDisputes([
      { id: "D1001", amount: 250, age: "2d", opener: "Rider", status: "open" },
      { id: "D1002", amount: 130, age: "5h", opener: "Driver", status: "investigating" },
    ]);
  }, []);

  const statusTemplate = (row: any) => (
    <Tag
      value={row.status}
      severity={
        row.status === "open"
          ? "warning"
          : row.status === "investigating"
          ? "info"
          : "success"
      }
    />
  );

  const actionsTemplate = (row: any) => (
    <div className="flex gap-2">
      <Button label="Open" text size="small" />
      <Button label="Credit" text size="small" severity="success" />
      <Button label="Escalate" text size="small" severity="danger" />
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

      <DataTable
        value={disputes}
        paginator
        rows={10}
        emptyMessage="No disputes found. 🎉 Check trends or summary below."
      >
        <Column field="id" header="ID" sortable />
        <Column field="amount" header="Amount ($)" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="opener" header="Opened By" />
        <Column field="status" header="Status" body={statusTemplate} />
        <Column header="Actions" body={actionsTemplate} />
      </DataTable>
    </div>
  );
}
