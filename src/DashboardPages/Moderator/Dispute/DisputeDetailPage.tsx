import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ---- Types ----
type DisputeStatus = "open" | "investigating" | "resolved" | "escalated";
interface DisputeDetail {
  id: string;
  rideId: string;
  openerType: "Rider" | "Driver";
  openerUserId: string;
  createdAt: string; // ISO
  status: DisputeStatus;
  amountClaimed: number; // ৳
  currency: "BDT" | "USD";
  slaSecondsRemaining: number; // negative = breached
  reasonCode: string; // e.g., "FARE_OVERCHARGE"
  // fare calc snapshot
  fare: {
    base: number;
    timeComponent: number;
    distanceComponent: number;
    surgeMultiplier?: number;
    total: number;
  };
  // gps polyline
  gps: {
    path: [number, number][];
    start: [number, number];
    end: [number, number];
  };
  // chat preview
  chat: {
    messages: { at: string; from: "rider" | "driver" | "support"; text: string }[];
  };
  // evidence
  evidence: {
    items: { id: string; kind: "image" | "note" | "file"; title: string; url?: string; note?: string }[];
  };
  // discussion / moderation notes
  discussion: {
    items: { at: string; by: string; note: string }[];
  };
  // audit
  audit: {
    records: { at: string; by: string; action: string; meta?: Record<string, any> }[];
  };
  // related
  related: {
    rideLink: string;
    reportLink?: string;
  };
  reopenRateHint?: string; // e.g., "Similar issues reopen 8% within 7 days"
}

// ---- Mock loader (replace with API call) ----
function useDispute(disputeId?: string) {
  const [data, setData] = useState<DisputeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real fetch(`/api/disputes/${disputeId}`)
    setTimeout(() => {
      const mock: DisputeDetail = {
        id: disputeId || "D-10021",
        rideId: "R-892134",
        openerType: "Rider",
        openerUserId: "U-3399",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        status: "investigating",
        amountClaimed: 120,
        currency: "BDT",
        slaSecondsRemaining: 3600 * 4, // 4h left
        reasonCode: "FARE_OVERCHARGE",
        fare: {
          base: 60,
          timeComponent: 22,
          distanceComponent: 38,
          surgeMultiplier: 1.2,
          total: 60 + 22 + 38,
        },
        gps: {
          start: [23.7808875, 90.2792371],
          end: [23.774, 90.365],
          path: [
            [23.7808875, 90.2792371],
            [23.779, 90.30],
            [23.776, 90.33],
            [23.774, 90.365],
          ],
        },
        chat: {
          messages: [
            { at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), from: "rider", text: "Fare seems higher than quoted." },
            { at: new Date(Date.now() - 1000 * 60 * 60 * 5.5).toISOString(), from: "driver", text: "Heavy traffic + detour." },
            { at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), from: "support", text: "Sharing fare breakdown." },
          ],
        },
        evidence: {
          items: [
            { id: "e1", kind: "image", title: "Meter snapshot", url: "https://via.placeholder.com/300x180" },
            { id: "e2", kind: "note", title: "Detour due to blockage", note: "Kalabagan road closed; took alternate route." },
          ],
        },
        discussion: {
          items: [
            { at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), by: "mod_alif", note: "Distance 6.2km vs quoted 5.7km." },
            { at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), by: "mod_sara", note: "Cap check needed before credit." },
          ],
        },
        audit: {
          records: [
            { at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), by: "system", action: "DISPUTE_OPENED" },
            { at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), by: "mod_sara", action: "STATUS_CHANGED", meta: { from: "open", to: "investigating" } },
          ],
        },
        related: {
          rideLink: "/dashboard/mod/rides/R-892134",
          reportLink: "/dashboard/mod/reports/REP-3991",
        },
        reopenRateHint: "Similar ‘fare overcharge’ disputes reopen ~6% within 14 days.",
      };
      setData(mock);
      setLoading(false);
    }, 300);
  }, [disputeId]);

  return { data, loading };
}

// ---- Helpers ----
function formatTaka(v: number) {
  return `৳${v.toFixed(0)}`;
}
function statusSeverity(s: DisputeStatus): "info" | "success" | "warning" | "danger" {
  switch (s) {
    case "open": return "warning";
    case "investigating": return "info";
    case "resolved": return "success";
    case "escalated": return "danger";
  }
}

// ---- Component ----
export default function DisputeDetailPage() {
  const { disputeId } = useParams<{ disputeId: string }>();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const { data: dispute, loading } = useDispute(disputeId);

  // dialogs state
  const [resolveOpen, setResolveOpen] = useState(false);
  const [partialOpen, setPartialOpen] = useState(false);
  const [escalateOpen, setEscalateOpen] = useState(false);

  // action form state
  const [reason, setReason] = useState(""); // required for actions
  const [notifyTemplate, setNotifyTemplate] = useState("resolved_rider_credit");
  const [partialAmount, setPartialAmount] = useState<number | null>(null);

  // caps (could come from policy API)
  const CREDIT_CAP = 150; // ৳ cap example

  const slaBadge = useMemo(() => {
    if (!dispute) return null;
    const secs = dispute.slaSecondsRemaining;
    const breached = secs < 0;
    const abs = Math.abs(secs);
    const h = Math.floor(abs / 3600);
    const m = Math.floor((abs % 3600) / 60);
    const label = `${h}h ${m}m`;
    return (
      <Tag
        value={breached ? `SLA breached by ${label}` : `SLA: ${label} left`}
        severity={breached ? "danger" : "info"}
        rounded
      />
    );
  }, [dispute]);

  const canSubmit = (requireAmount = false) => {
    if (!reason.trim()) return false;
    if (requireAmount && (partialAmount == null || partialAmount <= 0)) return false;
    return true;
  };

  const checkCap = (amt: number) => amt <= CREDIT_CAP;

  const submitResolve = () => {
    if (!canSubmit(false)) return;
    // TODO: POST /api/disputes/:id/resolve { reason, notifyTemplate }
    toast.current?.show({ severity: "success", summary: "Resolved", detail: "Notification queued.", life: 2500 });
    setResolveOpen(false);
  };

  const submitPartial = () => {
    if (!canSubmit(true) || partialAmount == null) return;
    if (!checkCap(partialAmount)) {
      toast.current?.show({ severity: "warn", summary: "Cap exceeded", detail: `Max credit/refund is ${formatTaka(CREDIT_CAP)}.`, life: 3500 });
      return;
    }
    // TODO: POST /api/disputes/:id/partial { amount, reason }
    toast.current?.show({ severity: "success", summary: "Partial credit proposed", detail: `Amount: ${formatTaka(partialAmount)}`, life: 2500 });
    setPartialOpen(false);
  };

  const submitEscalate = () => {
    if (!canSubmit(false)) return;
    confirmDialog({
      message: "Escalate to admin? They will take ownership.",
      header: "Confirm Escalation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {
        // TODO: POST /api/disputes/:id/escalate { reason }
        toast.current?.show({ severity: "info", summary: "Escalated", detail: "Sent to admin queue.", life: 2500 });
        setEscalateOpen(false);
      },
    });
  };

  if (loading || !dispute) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Loading dispute…</h2>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Dispute #{dispute.id}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Tag value={dispute.status} severity={statusSeverity(dispute.status)} />
            {slaBadge}
            <Badge value={`${dispute.openerType}`} />
            {dispute.reopenRateHint && <span className="text-sm text-muted-color">• {dispute.reopenRateHint}</span>}
          </div>
          <div className="text-sm mt-2">
            Opened: {new Date(dispute.createdAt).toLocaleString()} • Ride:&nbsp;
            <Link to={dispute.related.rideLink} className="text-primary underline">{dispute.rideId}</Link>
            {dispute.related.reportLink && (
              <>
                &nbsp;• Report:&nbsp;
                <Link to={dispute.related.reportLink} className="text-primary underline">View</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button label="Resolve" severity="success" onClick={() => setResolveOpen(true)} />
          <Button label="Partial credit/refund" onClick={() => setPartialOpen(true)} />
          <Button label="Escalate to admin" severity="danger" onClick={() => setEscalateOpen(true)} />
          <Button label="Back to list" link onClick={() => navigate("/dashboard/mod/disputes")} />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card title="Claimed Amount">
          <div className="text-2xl">{formatTaka(dispute.amountClaimed)} <span className="text-sm">({dispute.currency})</span></div>
          <div className="text-sm text-muted-color mt-1">Reason: {dispute.reasonCode.replaceAll("_", " ")}</div>
        </Card>
        <Card title="Fare Breakdown">
          <div className="text-sm leading-7">
            Base: {formatTaka(dispute.fare.base)}<br />
            Time: {formatTaka(dispute.fare.timeComponent)}<br />
            Distance: {formatTaka(dispute.fare.distanceComponent)}<br />
            {dispute.fare.surgeMultiplier && <>Surge ×{dispute.fare.surgeMultiplier}<br/></>}
            <Divider className="my-2" />
            <b>Total</b>: {formatTaka(dispute.fare.total)}
          </div>
        </Card>
        <Card title="Opener">
          <div className="text-sm">Type: <b>{dispute.openerType}</b></div>
          <div className="text-sm">User ID: <b>{dispute.openerUserId}</b></div>
        </Card>
      </div>

      {/* Tabs */}
      <TabView>
        <TabPanel header="Overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* GPS Map */}
            <Panel header="GPS Trace">
              <div className="h-72 overflow-hidden rounded">
                <MapContainer
                  center={dispute.gps.start}
                  zoom={12}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Polyline positions={dispute.gps.path as any} />
                  <Marker position={dispute.gps.start}><Popup>Start</Popup></Marker>
                  <Marker position={dispute.gps.end}><Popup>End</Popup></Marker>
                </MapContainer>
              </div>
            </Panel>

            {/* Chat preview */}
            <Panel header="Chat (Rider • Driver • Support)">
              <div className="space-y-3 max-h-72 overflow-auto pr-2">
                {dispute.chat.messages.map((m, idx) => (
                  <div key={idx} className="p-3 rounded border surface-border">
                    <div className="text-xs text-muted-color">
                      {new Date(m.at).toLocaleString()} • {m.from.toUpperCase()}
                    </div>
                    <div className="mt-1">{m.text}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </TabPanel>

        <TabPanel header="Evidence">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dispute.evidence.items.map((ev) => (
              <Card key={ev.id} title={ev.title}>
                {ev.kind === "image" && ev.url && (
                  <img src={ev.url} alt={ev.title} className="rounded w-full" />
                )}
                {ev.kind === "note" && <p className="text-sm">{ev.note}</p>}
                {ev.kind === "file" && ev.url && (
                  <a href={ev.url} target="_blank" rel="noreferrer" className="underline text-primary">Open file</a>
                )}
              </Card>
            ))}
          </div>
        </TabPanel>

        <TabPanel header="Discussion">
          <Panel header="Moderator Notes">
            <Timeline
              value={dispute.discussion.items}
              opposite={(item) => <small>{new Date(item.at).toLocaleString()}</small>}
              content={(item) => (
                <div>
                  <div className="text-sm"><b>{item.by}</b></div>
                  <div className="text-sm">{item.note}</div>
                </div>
              )}
            />
            {/* Add note (local only here) */}
            <AddNote
              onAdd={(text) => {
                if (!text.trim()) return;
                toast.current?.show({ severity: "success", summary: "Note added", detail: text, life: 1800 });
                // TODO: POST /api/disputes/:id/notes
              }}
            />
          </Panel>
        </TabPanel>

        <TabPanel header="History">
          <DataTable value={dispute.audit.records} size="small" stripedRows>
            <Column header="Time" body={(r) => new Date(r.at).toLocaleString()} style={{ width: 220 }} />
            <Column field="by" header="By" style={{ width: 150 }} />
            <Column field="action" header="Action" />
            <Column header="Meta" body={(r) => <code className="text-xs">{r.meta ? JSON.stringify(r.meta) : "-"}</code>} />
          </DataTable>
        </TabPanel>

        <TabPanel header="Links">
          <div className="space-y-2">
            <Link className="text-primary underline" to={dispute.related.rideLink}>Go to Ride</Link><br />
            {dispute.related.reportLink && (
              <Link className="text-primary underline" to={dispute.related.reportLink}>Related Report</Link>
            )}
          </div>
        </TabPanel>
      </TabView>

      {/* Action footnote: reason required */}
      <div className="p-3 border rounded surface-border">
        <div className="text-sm mb-2"><b>Reason (required for all actions)</b></div>
        <InputTextarea
          autoResize rows={3} className="w-full"
          value={reason} onChange={(e) => setReason(e.target.value)}
          placeholder="Add moderator reason… (will be logged to audit)"
        />
        <div className="text-xs text-muted-color mt-1">
          Reason is stored in the audit log and included in notifications where applicable.
        </div>
      </div>

      {/* Resolve Dialog */}
      <Dialog header="Resolve Dispute" visible={resolveOpen} style={{ width: "32rem" }} onHide={() => setResolveOpen(false)}>
        <div className="space-y-3">
          <div className="text-sm">Notification template</div>
          <Dropdown
            className="w-full"
            value={notifyTemplate}
            onChange={(e) => setNotifyTemplate(e.value)}
            options={[
              { label: "Resolved: rider credited", value: "resolved_rider_credit" },
              { label: "Resolved: no action", value: "resolved_no_action" },
            ]}
          />
          <div className="text-sm">Reason (required)</div>
          <InputTextarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} className="w-full" />
          <Divider />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setResolveOpen(false)} />
            <Button label="Confirm Resolve" disabled={!canSubmit()} severity="success" onClick={submitResolve} />
          </div>
        </div>
      </Dialog>

      {/* Partial credit/refund Dialog */}
      <Dialog header="Propose Partial Credit/Refund" visible={partialOpen} style={{ width: "32rem" }} onHide={() => setPartialOpen(false)}>
        <div className="space-y-3">
          <div className="text-sm">Amount (৳)</div>
          <InputNumber
            value={partialAmount}
            onValueChange={(e) => setPartialAmount(e.value ?? null)}
            mode="decimal" min={0} className="w-full"
            placeholder="Enter amount"
          />
          <div className="text-xs">
            Cap: <b>{formatTaka(CREDIT_CAP)}</b> • {partialAmount != null && !checkCap(partialAmount) && (
              <Tag value="Exceeds cap" severity="danger" />
            )}
          </div>
          <div className="text-sm">Reason (required)</div>
          <InputTextarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} className="w-full" />
          <Divider />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setPartialOpen(false)} />
            <Button
              label="Send Proposal"
              onClick={submitPartial}
              disabled={!canSubmit(true)}
            />
          </div>
        </div>
      </Dialog>

      {/* Escalate Dialog */}
      <Dialog header="Escalate to Admin" visible={escalateOpen} style={{ width: "32rem" }} onHide={() => setEscalateOpen(false)}>
        <div className="space-y-3">
          <p className="text-sm">Provide context for escalation. Admin will take ownership.</p>
          <div className="text-sm">Reason (required)</div>
          <InputTextarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} className="w-full" />
          <Divider />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setEscalateOpen(false)} />
            <Button label="Escalate" severity="danger" disabled={!canSubmit()} onClick={submitEscalate} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

// --- small helper to add discussion notes (local UI only in skeleton) ---
function AddNote({ onAdd }: { onAdd: (text: string) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  return (
    <>
      <Button label="Add Note" className="mt-2" onClick={() => setOpen(true)} />
      <Dialog header="Add Moderator Note" visible={open} style={{ width: "28rem" }} onHide={() => setOpen(false)}>
        <InputTextarea rows={5} value={text} onChange={(e) => setText(e.target.value)} className="w-full" placeholder="Your note…" />
        <div className="flex justify-end gap-2 mt-3">
          <Button label="Cancel" text onClick={() => setOpen(false)} />
          <Button
            label="Add"
            onClick={() => {
              onAdd(text);
              setText("");
              setOpen(false);
            }}
            disabled={!text.trim()}
          />
        </div>
      </Dialog>
    </>
  );
}
