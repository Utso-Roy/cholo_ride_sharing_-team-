import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import { fetchReportDetail, actOnReport, ReportDetail, ReportActionPayload } from "./reportDetailApi";

// ---- small helpers (same idea as list)
function getSlaSeverity(deadlineAt: string): "success" | "warning" | "danger" {
  const diffMs = new Date(deadlineAt).getTime() - Date.now();
  if (isNaN(diffMs) || diffMs <= 0) return "danger";
  return diffMs / 36e5 < 4 ? "warning" : "success";
}
function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, { timeZone: "Asia/Dhaka" });
}

const statusSeverityMap: Record<ReportDetail["status"], "info" | "warning" | "success" | "danger" | "secondary"> = {
  open: "info",
  in_review: "warning",
  need_info: "secondary",
  resolved: "success",
  escalated: "danger",
};

const ReportDetailPage: React.FC = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReportDetail | null>(null);

  // Action dialog state
  const [reqInfoOpen, setReqInfoOpen] = useState(false);
  const [reqInfoMsg, setReqInfoMsg] = useState("");

  const [resolveOpen, setResolveOpen] = useState(false);
  const [resolveOutcome, setResolveOutcome] = useState<"warning" | "suspend" | "no_action" | null>(null);
  const [resolveReason, setResolveReason] = useState("");

  const [escOpen, setEscOpen] = useState(false);
  const [escTo, setEscTo] = useState<"lead_mod" | "admin" | null>(null);
  const [escReason, setEscReason] = useState("");

  const canAct = useMemo(() => {
    if (!data) return false;
    // simple example: disable actions if already resolved
    return data.status !== "resolved";
  }, [data]);

  useEffect(() => {
    if (!reportId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchReportDetail(reportId);
        setData(res);
      } catch {
        toast.current?.show({ severity: "error", summary: "Failed", detail: "Could not load report." });
      } finally {
        setLoading(false);
      }
    })();
  }, [reportId]);

  // ---- ACTION handlers
  async function doRequestInfo() {
    if (!data || !reqInfoMsg.trim()) return;
    try {
      const payload: ReportActionPayload = { type: "request_info", payload: { message: reqInfoMsg.trim() } };
      await actOnReport(data._id, payload);
      toast.current?.show({ severity: "success", summary: "Requested", detail: "Information requested from reporter/subject." });
      setReqInfoOpen(false); setReqInfoMsg("");
      // refresh
      const fresh = await fetchReportDetail(data._id);
      setData(fresh);
    } catch {
      toast.current?.show({ severity: "error", summary: "Failed", detail: "Request info failed." });
    }
  }

  async function doResolve() {
    if (!data || !resolveOutcome || !resolveReason.trim()) return;
    try {
      const payload: ReportActionPayload = {
        type: "resolve",
        payload: { outcome: resolveOutcome, reason: resolveReason.trim() }
      };
      await actOnReport(data._id, payload);
      toast.current?.show({ severity: "success", summary: "Resolved", detail: "Report resolved." });
      setResolveOpen(false); setResolveOutcome(null); setResolveReason("");
      const fresh = await fetchReportDetail(data._id);
      setData(fresh);
    } catch {
      toast.current?.show({ severity: "error", summary: "Failed", detail: "Resolve failed." });
    }
  }

  async function doEscalate() {
    if (!data || !escTo || !escReason.trim()) return;
    try {
      const payload: ReportActionPayload = { type: "escalate", payload: { to: escTo, reason: escReason.trim() } };
      await actOnReport(data._id, payload);
      toast.current?.show({ severity: "success", summary: "Escalated", detail: "Report escalated." });
      setEscOpen(false); setEscTo(null); setEscReason("");
      const fresh = await fetchReportDetail(data._id);
      setData(fresh);
    } catch {
      toast.current?.show({ severity: "error", summary: "Failed", detail: "Escalation failed." });
    }
  }

  // ---- render helpers
  if (loading) {
    return (
      <div className="p-4">
        <Skeleton width="12rem" height="2rem" className="mb-3" />
        <Skeleton width="100%" height="6rem" className="mb-3" />
        <Skeleton width="100%" height="20rem" />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="p-4">
        <Toast ref={toast} />
        <div className="mb-3">
          <Button label="Back" icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
        </div>
        <Card title="Report not found">
          <p>We couldn't find this report. It may have been deleted or the ID is incorrect.</p>
        </Card>
      </div>
    );
  }

  const slaSev = getSlaSeverity(data.deadlineAt);
  const remainingHrs = Math.floor((new Date(data.deadlineAt).getTime() - Date.now()) / 36e5);
  const slaLabel = remainingHrs < 0 ? "Overdue" : `${remainingHrs}h left`;

  return (
    <div className="p-4">
      <Toast ref={toast} />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Button label="Back" icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="text-xl font-semibold">Report #{data._id}</h2>
          <Tag value={data.status.replace("_", " ")} severity={statusSeverityMap[data.status]} rounded />
          <Tag value={slaLabel} severity={slaSev} rounded />
        </div>
        <div className="flex items-center gap-2">
          <Tag value={`Category: ${data.category}`} />
          <Tag value={data.assigneeId ? `Assignee: ${data.assigneeId}` : "Unassigned"} severity="secondary" />
        </div>
      </div>

      {/* Top meta */}
      <div className="text-sm mb-3 opacity-80">
        <span>Created: {formatDate(data.createdAt)} · </span>
        <span>Ride: {data.rideId}</span>
        {"  "}
        {data.rideUrl ? (
          <Link to={data.rideUrl} className="ml-2 underline">Open ride</Link>
        ) : null}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Left — Main content */}
        <div className="md:col-span-2">
          {/* Description */}
          <Card title="Description">
            <p className="whitespace-pre-wrap">{data.summary}</p>
          </Card>

          {/* Evidence */}
          <Card title="Evidence" className="mt-3">
            {!data.evidence?.images?.length && !data.evidence?.audio?.length && !data.evidence?.chatIds?.length ? (
              <span className="opacity-70">No evidence attached.</span>
            ) : (
              <>
                {data.evidence?.images?.length ? (
                  <>
                    <div className="mb-2 font-medium">Images</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {data.evidence.images.map((src, i) => (
                        <Image key={i} src={src} alt={`evidence-${i}`} preview width="100%" />
                      ))}
                    </div>
                    <Divider />
                  </>
                ) : null}

                {data.evidence?.audio?.length ? (
                  <>
                    <div className="mb-2 font-medium">Audio</div>
                    <div className="flex flex-col gap-2">
                      {data.evidence.audio.map((src, i) => (
                        <audio key={i} src={src} controls className="w-full" />
                      ))}
                    </div>
                    <Divider />
                  </>
                ) : null}

                {data.evidence?.chatIds?.length ? (
                  <div className="opacity-80 text-sm">
                    Chats: {data.evidence.chatIds.join(", ")}
                  </div>
                ) : null}
              </>
            )}
          </Card>

          {/* Timeline */}
          <Card title="Timeline" className="mt-3">
            {!data.timeline?.length ? (
              <span className="opacity-70">No timeline entries.</span>
            ) : (
              <ul className="space-y-2">
                {data.timeline.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Tag value={t.type} severity="secondary" />
                    <div>
                      <div className="font-medium">{t.note || "(no note)"}</div>
                      <div className="text-xs opacity-70">
                        {formatDate(t.at)}{t.by ? ` · by ${t.by}` : ""}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Right — Context & Actions */}
        <div className="md:col-span-1">
          <Card title="Context">
            <div className="mb-3">
              <div className="text-xs opacity-70">Reporter</div>
              <div className="font-medium">{data.reporter.name}</div>
              <div className="text-xs">{data.reporter.email || "—"}</div>
            </div>
            <Divider />
            <div className="mb-3">
              <div className="text-xs opacity-70">Subject</div>
              <div className="font-medium">{data.subject.name}</div>
              <div className="text-xs">{data.subject.email || "—"}</div>
            </div>
            <Divider />
            <div className="text-sm">
              <div>Repeat (last 7d): <b>{data.repeatCount}</b></div>
              <div>Previous reports (7d): <b>{data.previousReports7d ?? 0}</b></div>
            </div>
          </Card>

          <Card title="Actions" className="mt-3">
            <div className="flex flex-col gap-2">
              <Button label="Request info" icon="pi pi-question-circle" onClick={() => setReqInfoOpen(true)} disabled={!canAct} />
              <Button label="Resolve" icon="pi pi-check-circle" severity="success" onClick={() => setResolveOpen(true)} disabled={!canAct} />
              <Button label="Escalate" icon="pi pi-arrow-up-right" severity="warning" onClick={() => setEscOpen(true)} disabled={!canAct} />
            </div>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog header="Request information" visible={reqInfoOpen} onHide={() => setReqInfoOpen(false)} style={{ width: "32rem" }}>
        <div className="flex flex-col gap-3">
          <InputTextarea autoFocus rows={5} value={reqInfoMsg} onChange={(e) => setReqInfoMsg(e.target.value)} placeholder="Write your request…" />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setReqInfoOpen(false)} />
            <Button label="Send request" icon="pi pi-send" onClick={doRequestInfo} disabled={!reqInfoMsg.trim()} />
          </div>
        </div>
      </Dialog>

      <Dialog header="Resolve report" visible={resolveOpen} onHide={() => setResolveOpen(false)} style={{ width: "32rem" }}>
        <div className="flex flex-col gap-3">
          <Dropdown
            value={resolveOutcome}
            onChange={(e) => setResolveOutcome(e.value)}
            options={[
              { label: "Warning", value: "warning" },
              { label: "Suspend", value: "suspend" },
              { label: "No action", value: "no_action" },
            ]}
            placeholder="Select outcome"
            className="w-full"
          />
          <InputTextarea rows={4} value={resolveReason} onChange={(e) => setResolveReason(e.target.value)} placeholder="Write the resolution reason…" />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setResolveOpen(false)} />
            <Button label="Resolve" icon="pi pi-check" onClick={doResolve} disabled={!resolveOutcome || !resolveReason.trim()} />
          </div>
        </div>
      </Dialog>

      <Dialog header="Escalate report" visible={escOpen} onHide={() => setEscOpen(false)} style={{ width: "28rem" }}>
        <div className="flex flex-col gap-3">
          <Dropdown
            value={escTo}
            onChange={(e) => setEscTo(e.value)}
            options={[
              { label: "Lead Moderator", value: "lead_mod" },
              { label: "Admin", value: "admin" },
            ]}
            placeholder="Escalate to"
            className="w-full"
          />
          <InputTextarea rows={4} value={escReason} onChange={(e) => setEscReason(e.target.value)} placeholder="Why escalate?" />
          <div className="flex justify-end gap-2">
            <Button label="Cancel" text onClick={() => setEscOpen(false)} />
            <Button label="Escalate" icon="pi pi-arrow-up-right" severity="warning" onClick={doEscalate} disabled={!escTo || !escReason.trim()} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReportDetailPage;
