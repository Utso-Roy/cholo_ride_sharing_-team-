import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import type { ApplicationRow, AppType } from "./api";
import { toAbsolute } from "./url";

type Props = {
  visible: boolean;
  onHide: () => void;
  row: ApplicationRow | null;
  onApprove: (type: AppType, id: string, notes?: string) => Promise<void>;
  onReject: (type: AppType, id: string, notes?: string) => Promise<void>;
  onNeedInfo: (type: AppType, id: string, notes: string) => Promise<void>;
};

export default function VerificationDrawer({
  visible,
  onHide,
  row,
  onApprove,
  onReject,
  onNeedInfo,
}: Props) {
  const [notes, setNotes] = useState("");

  if (!row) return null;

  const fullName = `${row.driver.firstName ?? ""} ${
    row.driver.lastName ?? ""
  }`.trim();

  const isMobile = window.innerWidth < 768;

  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={onHide}
      style={{
        width: isMobile ? "100vw" : "70vw",
        maxWidth: "950px",
      }}
      className="px-8"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="m-0">Review Application</h3>
        <span className="px-2 py-1 text-xs border-round uppercase">
          {row.type}
        </span>
      </div>

      {/* Driver */}
      <div className="mb-4">
        <h4 className="mt-0 mb-2">Driver Information</h4>
        <div className="grid grid-cols-3">
          <div>
            <b>Name:</b>{fullName || "-"}
          </div>
          <div>
            <b>Phone:</b> {row.driver.phone || "-"}
          </div>
          <div>
            <b>NID:</b> {row.driver.nid || "-"}
          </div>
          <div>
            <b>License:</b> {row.driver.license || "-"}
          </div>
          <div>
            <b>City:</b> {row.driver.city || "-"}
          </div>
          <div>
            <b>Gender:</b> {row.driver.gender || "-"}
          </div>
          <div>
            <b>DOB:</b> {row.driver.dob?.slice(0, 10) || "-"}
          </div>
        </div>
        {row.driver.photoUrl && (
          <div className="my-12 flex flex-col justify-center items-center"> <b>Photo</b>
            <img
              src={toAbsolute(row.driver.photoUrl)}
              alt="Driver"
              style={{ maxWidth: 140, borderRadius: 8 }}
            />
          </div>
        )}
      </div>

      {/* Vehicle */}
      <div className="mb-4">
        <h4 className="mt-0 mb-2">Vehicle Information</h4>
        <div className="grid grid-cols-3">
          <div>
            <b>Brand/Model:</b> {row.vehicle.brand} {row.vehicle.model}
          </div>
          <div>
            <b>Year:</b> {row.vehicle.year || "-"}
          </div>
          <div>
            <b>Reg No:</b> {row.vehicle.regNo || "-"}
          </div>
          <div>
            <b>Fitness No:</b> {row.vehicle.fitnessNo || "-"}
          </div>
          <div>
            <b>Tax Token:</b> {row.vehicle.taxTokenNo || "-"}
          </div>
          <div>
            <b>Route Permit:</b> {row.vehicle.routePermitNo || "-"}
          </div>
        </div>
      </div>

      {/* Decision */}
      <div className="mb-2">
        <h4 className="mt-0 mb-2">Decision</h4>
        <InputTextarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Notes (optional for approve/reject, required for Need Info)"
          style={{ width: "100%" }}
        />
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          label="Reject"
          severity="danger"
          icon="pi pi-times"
          onClick={() => onReject(row.type, row._id, notes)}
        />
        <Button
          label="Need Info"
          severity="warning"
          icon="pi pi-envelope"
          onClick={() => onNeedInfo(row.type, row._id, notes)}
        />
        <Button
          label="Approve"
          icon="pi pi-check"
          onClick={() => onApprove(row.type, row._id, notes)}
        />
      </div>
    </Sidebar>
  );
}
