import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import { TabPanel, TabView } from "primereact/tabview";
import { Panel } from "primereact/panel";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { logAudit } from "./audit";

// import L from "leaflet";
// // import marker2x from "leaflet/dist/images/marker-icon-2x.png";
// // import marker1x from "leaflet/dist/images/marker-icon.png";
// // import markerShadow from "leaflet/dist/images/marker-shadow.png";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: marker2x,
//   iconUrl: marker1x,
//   shadowUrl: markerShadow,
// });

type RideStatus = "ongoing" | "completed" | "cancelled" | "investigating";

interface FareBreakdownItem {
  label: string;
  amount: number; // in BDT
}
interface RideEvent {
  id: string;
  at: string; // ISO time
  type: string; // e.g., "pickup", "detour", "stop", "fare_adjust"
  detail: string;
}
interface ChatMessage {
  id: string;
  at: string;
  from: "driver" | "rider" | "system";
  text: string;
}
interface RideDetail {
  rideId: string;
  startedAt: string;
  endedAt?: string;
  driver: { id: string; name: string; rating?: number };
  rider: { id: string; name: string };
  status: RideStatus;
  flags: string[]; // detour%, fare anomaly, cancel-streak...
  riskScore: number; // 0-100
  fareTotal: number;
  fareItems: FareBreakdownItem[];
  suspicious: string[]; // highlighted patterns
  events: RideEvent[]; // timeline
  chat: ChatMessage[]; // transcript
  // mapTrace: Coordinate[]  // (later map lib এ বসাও)
}

function eventSeverity(
  t: string
): "info" | "warning" | "danger" | "success" | undefined {
  if (t === "detour") return "warning";
  if (t === "fare_adjust") return "info";
  if (t === "dropoff") return "success";
  return undefined;
}

function StatusTag({ s }: { s: RideStatus }) {
  const map = {
    ongoing: "info",
    completed: "success",
    cancelled: "secondary",
    investigating: "danger",
  } as const;
  return <Tag value={s} severity={map[s]} rounded />;
}

function Currency({ value }: { value: number }) {
  return <span>{value.toFixed(0)} BDT</span>;
}

const trace: [number, number][] = [
  [23.7808, 90.4085], // pickup
  [23.7815, 90.4142],
  [23.785, 90.419],
  [23.789, 90.421],
  [23.794, 90.425], // dropoff
];

const segments: TraceSegment[] = [
  { coords: [trace[0], trace[1], trace[2]], type: "normal" },
  { coords: [trace[2], trace[3]], type: "detour" },
  { coords: [trace[3], trace[4]], type: "normal" },
];

// 🔧 demo fetch (পরে আসল API কল দেবে)
async function fetchRideDetail(rideId: string): Promise<RideDetail> {
  await new Promise((r) => setTimeout(r, 300));
  return {
    rideId,
    startedAt: "2025-10-22T10:30:00Z",
    endedAt: "2025-10-22T11:05:00Z",
    driver: { id: "DRV-77", name: "Fahim Rahman", rating: 4.92 },
    rider: { id: "USR-19", name: "Rafiul Hasan" },
    status: "investigating",
    flags: ["fare anomaly", "detour 8%"],
    riskScore: 85,
    fareTotal: 312,
    fareItems: [
      { label: "Base fare", amount: 60 },
      { label: "Distance", amount: 180 },
      { label: "Time", amount: 40 },
      { label: "Surge x1.1", amount: 32 },
    ],
    suspicious: ["Unusual stop near midpoint", "Detour > 5% threshold"],
    events: [
      {
        id: "e1",
        at: "2025-10-22T10:30:14Z",
        type: "pickup",
        detail: "Pickup confirmed",
      },
      {
        id: "e2",
        at: "2025-10-22T10:48:00Z",
        type: "detour",
        detail: "Route deviation ~8%",
      },
      {
        id: "e3",
        at: "2025-10-22T10:52:10Z",
        type: "stop",
        detail: "2-min stop at fuel station",
      },
      {
        id: "e4",
        at: "2025-10-22T11:05:41Z",
        type: "dropoff",
        detail: "Ride ended",
      },
    ],
    chat: [
      {
        id: "m1",
        at: "2025-10-22T10:31:00Z",
        from: "rider",
        text: "Sir, please take the main road.",
      },
      {
        id: "m2",
        at: "2025-10-22T10:31:20Z",
        from: "driver",
        text: "Main road jam, taking alternate.",
      },
      {
        id: "m3",
        at: "2025-10-22T10:48:05Z",
        from: "system",
        text: "Detour detected (8%)",
      },
    ],
  };
}

export default function RideDetailPage() {
  const { rideId = "" } = useParams();
  const toastRef = useRef<Toast>(null);

  const [data, setData] = useState<RideDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const doTempLock = () => {
    confirmDialog({
      message: "Temporarily lock this ride’s participants?",
      header: "Confirm Temp-Lock",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes, Lock",
      accept: () => {
        // TODO: call API
        toastRef.current?.show({
          severity: "success",
          summary: "Locked",
          detail: "Temp-lock applied.",
        });
      },
    });
  };

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    fetchRideDetail(rideId)
      .then((d) => {
        if (!cancel) setData(d);
      })
      .catch(() =>
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to load ride",
        })
      )
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [rideId]);

  if (loading) {
    return (
      <div className="p-4">
        <Toast ref={toastRef} />
        <ProgressBar mode="indeterminate" style={{ height: 6 }} />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="p-4">
        <Toast ref={toastRef} />
        <Card title="Ride not found">No data for ride: {rideId}</Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <Toast ref={toastRef} />
      {/* পরের সাবস্টেপগুলোতে বাকি সেকশনগুলো যোগ করব */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold">Ride {data.rideId}</div>
            <div className="text-sm text-muted-color">
              {new Date(data.startedAt).toLocaleString()}
              {data.endedAt
                ? ` — ${new Date(data.endedAt).toLocaleString()}`
                : " (ongoing)"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusTag s={data.status} />
            <Tag
              value={`Risk ${data.riskScore}`}
              severity={data.riskScore >= 80 ? "danger" : "warning"}
            />
            <Badge value={data.flags.length} severity="warning" />
          </div>
        </div>

        <Divider />

        <div className="flex flex-wrap gap-2">
          {data.flags.map((f, i) => (
            <Tag key={i} value={f} className="mr-1" />
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          icon="pi pi-envelope"
          label="Nudge both"
          text
          onClick={() => {
            // TODO: API to send nudge message to both
            toastRef.current?.show({
              severity: "success",
              summary: "Sent",
              detail: "Nudge sent to both.",
            });
          }}
        />
        <Button
          icon="pi pi-send"
          label="Message"
          text
          onClick={() => {
            // TODO: open mod message UI / route to chat
            navigate(`/dashboard/mod/rides/${data.rideId}#chat`);
          }}
        />
        <Button
          icon="pi pi-pencil"
          label="Caution note"
          text
          onClick={() => setNoteOpen(true)}
        />
        <Button
          icon="pi pi-lock"
          label="Temp-lock"
          text
          severity="danger"
          onClick={() => {
            doTempLock();
            logAudit("temp-lock", data.rideId, "Moderator applied temp-lock");
          }}
        />
        <Button
          icon="pi pi-link"
          label="Link to report/dispute"
          text
          onClick={() => {
            // TODO: deep-link or modal to attach existing report
            toastRef.current?.show({
              severity: "info",
              summary: "Link",
              detail: "Open linking UI…",
            });
          }}
        />
      </div>

      <ConfirmDialog />
      <Dialog
        header="Add caution note"
        visible={noteOpen}
        onHide={() => setNoteOpen(false)}
        style={{ width: 500 }}
      >
        <div className="flex flex-col gap-2">
          <InputTextarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoResize
          />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setNoteOpen(false)} />
            <Button
              label="Save"
              onClick={() => {
                // TODO: call API to save note (audit-entry তৈরি করবে)
                setNoteOpen(false);
                toastRef.current?.show({
                  severity: "success",
                  summary: "Saved",
                  detail: "Caution note added.",
                });
              }}
            />
          </div>
        </div>
      </Dialog>

      <TabView>
        <TabPanel header="Overview">
          <div className="grid md:grid-cols-3 gap-3">
            <Panel header="Map trace" className="md:col-span-2">
              <div style={{ height: 320, borderRadius: 8, overflow: "hidden" }}>
                <MapContainer
                  center={[23.785, 90.419]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {segments.map((seg, idx) => (
                    <Polyline
                      key={idx}
                      positions={seg.coords}
                      color={
                        seg.type === "detour"
                          ? "red"
                          : seg.type === "stop"
                          ? "orange"
                          : "blue"
                      }
                      weight={5}
                    />
                  ))}
                  <Marker position={trace[0]}>
                    <Popup>Pickup</Popup>
                  </Marker>
                  <Marker position={trace[trace.length - 1]}>
                    <Popup>Dropoff</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Panel>

            {/* Fare */}
            <Panel header="Fare breakdown">
              <DataTable value={data.fareItems} size="small">
                <Column field="label" header="Item" />
                <Column
                  field="amount"
                  header="Amount"
                  body={(r: any) => <Currency value={r.amount} />}
                />
                <Column header=" " body={() => null} />
              </DataTable>
              <div className="flex justify-between mt-2 font-medium">
                <span>Total</span>
                <Currency value={data.fareTotal} />
              </div>
            </Panel>

            {/* Suspicious */}
            <Panel header="Suspicious patterns" className="md:col-span-3">
              <ul className="list-disc ml-5 space-y-1">
                {data.suspicious.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Panel>

            {/* Context cards */}
            <Panel header="Driver context">
              <div className="space-y-1 text-sm">
                <div>Name: {data.driver.name}</div>
                <div>ID: {data.driver.id}</div>
                <div>Rating: {data.driver.rating ?? "—"}</div>
                <div>Recent: prior disputes / warnings (load later)</div>
              </div>
            </Panel>
            <Panel header="Rider context">
              <div className="space-y-1 text-sm">
                <div>Name: {data.rider.name}</div>
                <div>ID: {data.rider.id}</div>
                <div>Recent: prior reports / refunds (load later)</div>
              </div>
            </Panel>
          </div>
        </TabPanel>

        <TabPanel header="Timeline">
          <Timeline
            value={data.events}
            opposite={(e: RideEvent) => new Date(e.at).toLocaleTimeString()}
            content={(e: RideEvent) => (
              <div className="p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Tag value={e.type} severity={eventSeverity(e.type)} />
                  <span className="text-sm text-muted-color">
                    {new Date(e.at).toLocaleString()}
                  </span>
                </div>
                <div className="mt-1">{e.detail}</div>
              </div>
            )}
          />
        </TabPanel>

        <TabPanel header="Chat">
          <div className="space-y-2">
            {data.chat.map((m) => (
              <div
                key={m.id}
                className={`max-w-xl p-2 rounded ${
                  m.from === "driver"
                    ? "bg-blue-50 ml-auto"
                    : m.from === "rider"
                    ? "bg-green-50"
                    : "bg-gray-50 mx-auto"
                }`}
              >
                <div className="text-xs text-muted-color mb-1">
                  {m.from.toUpperCase()} • {new Date(m.at).toLocaleString()}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
}
