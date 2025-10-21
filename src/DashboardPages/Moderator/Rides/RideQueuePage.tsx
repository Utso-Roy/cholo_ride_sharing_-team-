import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

interface RideRow {
  rideId: string;
  time: string;
  driver: string;
  rider: string;
  flags: string[];
  status: string;
  riskScore: number;
}

export default function RideQueuePage() {
  const [rides, setRides] = useState<RideRow[]>([]);

  useEffect(() => {
    // demo data
    setRides([
      {
        rideId: "RIDE123",
        time: "2025-10-22 10:30 AM",
        driver: "Fahim Rahman",
        rider: "Rafiul Hasan",
        flags: ["fare anomaly", "detour 8%"],
        status: "investigating",
        riskScore: 85,
      },
      {
        rideId: "RIDE124",
        time: "2025-10-22 11:00 AM",
        driver: "Mehedi",
        rider: "Tanvir",
        flags: ["cancel streak"],
        status: "pending",
        riskScore: 65,
      },
    ]);
  }, []);

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
      <Button
        icon="pi pi-envelope"
        rounded
        text
        tooltip="Nudge Message"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        icon="pi pi-comments"
        rounded
        text
        tooltip="Open Chat"
      />
      <Button
        icon="pi pi-lock"
        rounded
        text
        tooltip="Temp Lock"
      />
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Ride Queue</h2>
      <DataTable value={rides} paginator rows={10} tableStyle={{ minWidth: "60rem" }}>
        <Column field="rideId" header="Ride ID"></Column>
        <Column field="time" header="Time"></Column>
        <Column field="driver" header="Driver"></Column>
        <Column field="rider" header="Rider"></Column>
        <Column header="Flags" body={flagTemplate}></Column>
        <Column header="Status" body={statusTemplate}></Column>
        <Column header="Actions" body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
