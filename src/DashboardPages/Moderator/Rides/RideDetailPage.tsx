import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import { TabView, TabPanel } from "primereact/tabview";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";


import { logAudit } from "./audit";
import { useRideSocket } from "./useRideSocket";
import type { ModSocketEvent } from "./realtime";

// ----- leaflet marker fix -----
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// ----- types -----
type RideStatus = "ongoing" | "completed" | "cancelled" | "investigating";

interface FareBreakdownItem {
  label: string;
  amount: number;
}
interface RideEvent {
  id: string;
  at: string;
  type: string;
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
  flags: string[];
  riskScore: number;
  fareTotal: number;
  fareItems: FareBreakdownItem[];
  suspicious: string[];
  events: RideEvent[];
  chat: ChatMessage[];
}

async function fetchRideDetail(rideId: string): Promise<RideDetail> {
  await new Promise(r => setTimeout(r, 300));
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
      { id: "e1", at: "2025-10-22T10:30:14Z", type: "pickup", detail: "Pickup confirmed" },
      { id: "e2", at: "2025-10-22T10:48:00Z", type: "detour", detail: "Route deviation ~8%" },
      { id: "e3", at: "2025-10-22T10:52:10Z", type: "stop", detail: "2-min stop at fuel station" },
      { id: "e4", at: "2025-10-22T11:05:41Z", type: "dropoff", detail: "Ride ended" },
    ],
    chat: [
      { id: "m1", at: "2025-10-22T10:31:00Z", from: "rider", text: "Sir, please take the main road." },
      { id: "m2", at: "2025-10-22T10:31:20Z", from: "driver", text: "Main road jam, taking alternate." },
      { id: "m3", at: "2025-10-22T10:48:05Z", from: "system", text: "Detour detected (8%)" },
    ],
  };
}

// ----- small helper -----
function StatusTag({ s }: { s: RideStatus }) {
  const map: Record<RideStatus, "info" | "success" | "secondary" | "danger" | "warning"> = {
    ongoing: "info",
    completed: "success",
    cancelled: "secondary",
    investigating: "danger",
  };
  return <Tag value={s} severity={map[s]} rounded />;
}

function eventSeverity(t: string): "info" | "warning" | "danger" | "success" | undefined {
  if (t === "detour") return "warning";
  if (t === "fare_adjust") return "info";
  if (t === "dropoff") return "success";
  if (t === "stop") return "danger";
  return undefined;
}

// ----- fit map to route -----
function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!coords?.length) return;
    // @ts-ignore
    map.fitBounds(coords as any, { padding: [24, 24] });
  }, [coords, map]);
  return null;
}

export default function RideDetailPage() {
  const { rideId = "" } = useParams();
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);

  const [data, setData] = useState<RideDetail | null>(null);
  const [localStatus, setLocalStatus] = useState<RideStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  const userToken = localStorage.getItem("mod_token") || "";

  // ---------- fetch detail ----------
  useEffect(() => {
    let cancel = false;
    setLoading(true);
    fetchRideDetail(rideId)
      .then((d) => {
        if (cancel) return;
        setData(d);
        setLocalStatus(d.status);
      })
      .finally(() => !cancel && setLoading(false));
    return () => { cancel = true; };
  }, [rideId]);

  // ---------- websocket live updates ----------
  const handleSocketEvent = (ev: ModSocketEvent) => {
    if (ev.type === "ride-update" && ev.rideId === rideId) {
      setData(prev => (prev ? { ...prev, ...ev.payload } : prev));
      if (ev.payload.status) setLocalStatus(ev.payload.status as RideStatus);
      toastRef.current?.show({
        severity: "info",
        summary: "Live update",
        detail: `Ride ${rideId} changed`,
      });
    }
  };

  useRideSocket({
    url: "wss://api.choloride.io/mod/updates",
    token: userToken,
    rideId,
    onEvent: handleSocketEvent,
  });

  useEffect(() => {
  if (!userToken) {
    toastRef.current?.show({
      severity: "warn",
      summary: "Not connected",
      detail: "No auth token found. Live updates are disabled.",
    });
  }
}, [userToken]);

  // ---------- temp-lock ----------
  const doTempLock = (rid: string) => {
    confirmDialog({
      message: "Temporarily lock this ride’s participants?",
      header: "Confirm Temp-Lock",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes, Lock",
      accept: async () => {
        await logAudit(rid, "temp-lock", "Applied temporary lock");
        setLocalStatus("investigating");
        toastRef.current?.show({ severity: "success", summary: "Locked" });
      },
    });
  };

  // ---------- mock map data ----------
  const trace: [number, number][] = [
    [23.7808, 90.4085],
    [23.7815, 90.4142],
    [23.785, 90.419],
    [23.789, 90.421],
    [23.794, 90.425],
  ];
  const segments = [
    { coords: [trace[0], trace[1], trace[2]], type: "normal" },
    { coords: [trace[2], trace[3]], type: "detour" },
    { coords: [trace[3], trace[4]], type: "normal" },
  ];

  if (loading) return <div className="p-4">Loading ride...</div>;
  if (!data) return <div className="p-4">Ride not found</div>;

  return (
    <div className="p-4 space-y-3">
      <Toast ref={toastRef} />
      <ConfirmDialog />

      {/* ===== Summary header ===== */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-semibold">Ride {data.rideId}</div>
            <div className="text-sm text-muted-color">
              {new Date(data.startedAt).toLocaleString()} —{" "}
              {data.endedAt ? new Date(data.endedAt).toLocaleString() : "(ongoing)"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusTag s={localStatus ?? data.status} />
            <Tag value={`Risk ${data.riskScore}`} severity={data.riskScore >= 80 ? "danger" : "warning"} />
            <Badge value={data.flags.length} severity="warning" />
          </div>
        </div>

        <Divider />

        <div className="flex flex-wrap gap-2">
          {data.flags.map((f, i) => <Tag key={i} value={f} className="mr-1" />)}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Button icon="pi pi-envelope" label="Nudge both" text onClick={async ()=>{
            await logAudit(data.rideId, "nudge-both");
            toastRef.current?.show({ severity:"success", summary:"Nudge sent"});
          }}/>
          <Button icon="pi pi-send" label="Message" text onClick={() => navigate(`#chat`)} />
          <Button icon="pi pi-pencil" label="Caution note" text onClick={() => setNoteOpen(true)} />
          <Button icon="pi pi-lock" label="Temp-lock" text onClick={() => doTempLock(data.rideId)} />
        </div>
      </Card>

      {/* ===== Tabs ===== */}
      <TabView>
        <TabPanel header="Overview">
          <div className="grid md:grid-cols-3 gap-3">
            {/* Map trace */}
            <Panel header="Map trace" className="md:col-span-2">
              <div style={{ height: 320, borderRadius: 8, overflow: "hidden" }}>
                <MapContainer center={trace[0]} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FitBounds coords={trace} />
                  {segments.map((seg, i) => (
                    <Polyline
                      key={i}
                      positions={seg.coords}
                      color={seg.type === "detour" ? "red" : seg.type === "stop" ? "orange" : "blue"}
                      weight={5}
                    />
                  ))}
                  <Marker position={trace[0]}><Popup>Pickup</Popup></Marker>
                  <Marker position={trace[trace.length - 1]}><Popup>Dropoff</Popup></Marker>
                </MapContainer>
              </div>
              <div className="flex gap-4 text-sm mt-2">
                <div className="flex items-center gap-2"><span style={{width:24,height:4,background:"blue",display:"inline-block"}}/>Normal</div>
                <div className="flex items-center gap-2"><span style={{width:24,height:4,background:"red",display:"inline-block"}}/>Detour</div>
                <div className="flex items-center gap-2"><span style={{width:24,height:4,background:"orange",display:"inline-block"}}/>Stop</div>
              </div>
            </Panel>

            {/* Fare breakdown */}
            <Panel header="Fare breakdown">
              <DataTable value={data.fareItems} size="small">
                <Column field="label" header="Item" />
                <Column field="amount" header="Amount" body={(r: any) => <span>{r.amount} BDT</span>} />
              </DataTable>
              <div className="flex justify-between mt-2 font-medium">
                <span>Total</span>
                <span>{data.fareTotal} BDT</span>
              </div>
            </Panel>

            {/* Suspicious patterns */}
            <Panel header="Suspicious patterns" className="md:col-span-3">
              <ul className="list-disc ml-5 space-y-1">
                {data.suspicious.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Panel>

            {/* Context */}
            <Panel header="Driver context">
              <div className="space-y-1 text-sm">
                <div>Name: {data.driver.name}</div>
                <div>ID: {data.driver.id}</div>
                <div>Rating: {data.driver.rating ?? "—"}</div>
              </div>
            </Panel>
            <Panel header="Rider context">
              <div className="space-y-1 text-sm">
                <div>Name: {data.rider.name}</div>
                <div>ID: {data.rider.id}</div>
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
                  <span className="text-sm text-muted-color">{new Date(e.at).toLocaleString()}</span>
                </div>
                <div className="mt-1">{e.detail}</div>
              </div>
            )}
          />
        </TabPanel>

        <TabPanel header="Chat">
          <div className="space-y-2">
            {data.chat.map(m => (
              <div key={m.id} className={`max-w-xl p-2 rounded ${
                m.from === "driver" ? "bg-blue-50 ml-auto" :
                m.from === "rider" ? "bg-green-50" : "bg-gray-50 mx-auto"
              }`}>
                <div className="text-xs text-muted-color mb-1">
                  {m.from.toUpperCase()} • {new Date(m.at).toLocaleString()}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>
        </TabPanel>
      </TabView>

      {/* caution note dialog */}
      <Dialog header="Add caution note" visible={noteOpen} onHide={()=>setNoteOpen(false)} style={{ width: 500 }}>
        <div className="flex flex-col gap-2">
          <InputTextarea value={note} onChange={e=> setNote(e.target.value)} autoResize/>
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={()=> setNoteOpen(false)} />
            <Button label="Save" onClick={async ()=>{
              await logAudit(data.rideId, "caution-note", note);
              setNoteOpen(false);
              toastRef.current?.show({ severity:"success", summary:"Note added"});
            }}/>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
