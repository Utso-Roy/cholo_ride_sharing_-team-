import React, { useState, useMemo } from "react";
import { Sidebar } from "primereact/sidebar";
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

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const fullName = useMemo(() => {
    if (!row) return "";
    const fn = `${row.driver?.firstName ?? ""} ${row.driver?.lastName ?? ""}`.trim();
    return fn || "—";
  }, [row]);

  if (!row) return null;

  return (
    <Sidebar
      visible={visible}
      position="right"
      onHide={onHide}
      modal
      blockScroll
      style={{ width: isMobile ? "100vw" : "70vw", maxWidth: 950 }}
      pt={{
        content: { className: "p-0 dark:bg-[#274450]" },
        root: { className: "border-l border-black/10 dark:border-white/10" },
      }}
    >
      <div className="flex justify-center py-5">
        <div className="layout-content-container flex flex-col w-full max-w-sm flex-1">
          <div className="flex h-full min-h-[700px] flex-col justify-between dark:bg-white/5 backdrop-blur rounded-lg shadow-md border border-[#274450]/10 dark:border-white/10">
            {/* Top: Profile + Sections */}
            <div className="flex flex-col gap-4 p-4">
              {/* Header: avatar + name + phone */}
              <div className="flex items-center gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-[#71BBB2]/60"
                  data-alt={`Photo of ${fullName}`}
                  style={{
                    backgroundImage: `url("${
                      row.driver?.photoUrl ? toAbsolute(row.driver.photoUrl) : "https://placehold.co/192x192?text=Driver"
                    }")`,
                  }}
                />
                <div className="flex flex-col">
                  <h1 className="text-[#274450] dark:text-[#EFE9D5] text-lg font-semibold leading-normal">
                    {fullName}
                  </h1>
                  <p className="text-[#274450]/70 dark:text-[#EFE9D5]/70 text-sm">
                    {row.driver?.phone || "—"}
                  </p>
                </div>
              </div>

              {/* subtle divider with accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#71BBB2] via-[#497D74] to-[#274450] rounded-full opacity-60" />

              <div className="flex flex-col gap-2">
                {/* Driver Information */}
                <details className="group rounded-lg border border-[#274450]/15 dark:border-white/10 bg-white/60 dark:bg-white/5">
                  <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none">
                    <p className="text-[#274450] dark:text-[#EFE9D5] text-base font-medium">
                      Driver Information
                    </p>
                    {/* Arrow button that rotates 180deg when open */}
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()} // summary handles toggle
                      aria-label="Toggle section"
                      className="grid place-items-center size-8 rounded-md border border-[#274450]/20 dark:border-white/15 bg-[#71BBB2]/20 hover:bg-[#71BBB2]/30 transition"
                    >
                      <svg
                        className="size-4 text-[#274450] dark:text-[#EFE9D5] transition-transform duration-200 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {/* chevron-down */}
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </summary>

                  <div className="px-4 pb-3 grid grid-cols-[38%_1fr] gap-x-4">
                    {[
                      ["NID", row.driver?.nid],
                      ["License", row.driver?.license],
                      ["City", row.driver?.city],
                      ["Gender", row.driver?.gender],
                      ["DOB", row.driver?.dob ? String(row.driver.dob).slice(0, 10) : "—"],
                    ].map(([label, value], idx) => (
                      <div
                        key={String(label)}
                        className={`col-span-2 grid grid-cols-subgrid ${
                          idx === 0 ? "border-t" : "border-t"
                        } border-[#274450]/15 dark:border-white/10 py-3`}
                      >
                        <p className="text-[#274450]/70 dark:text-[#EFE9D5]/70 text-sm">{label}</p>
                        <p className="text-[#274450] dark:text-[#EFE9D5] text-sm">{value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Vehicle Information */}
                <details className="group rounded-lg border border-[#274450]/15 dark:border-white/10 bg-white/60 dark:bg-white/5">
                  <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none">
                    <p className="text-[#274450] dark:text-[#EFE9D5] text-base font-medium">
                      Vehicle Information
                    </p>
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      aria-label="Toggle section"
                      className="grid place-items-center size-8 rounded-md border border-[#274450]/20 dark:border-white/15 bg-[#71BBB2]/20 hover:bg-[#71BBB2]/30 transition"
                    >
                      <svg
                        className="size-4 text-[#274450] dark:text-[#EFE9D5] transition-transform duration-200 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </summary>

                  <div className="px-4 pb-3 grid grid-cols-[38%_1fr] gap-x-4">
                    {[
                      ["Brand/Model", `${row.vehicle?.brand || "—"} ${row.vehicle?.model || ""}`.trim()],
                      ["Year", row.vehicle?.year],
                      ["Registration No.", row.vehicle?.regNo],
                      ["Fitness No.", row.vehicle?.fitnessNo],
                      ["Tax Token", row.vehicle?.taxTokenNo],
                      ["Route Permit", row.vehicle?.routePermitNo],
                    ].map(([label, value], idx) => (
                      <div
                        key={String(label)}
                        className={`col-span-2 grid grid-cols-subgrid border-t border-[#274450]/15 dark:border-white/10 py-3`}
                      >
                        <p className="text-[#274450]/70 dark:text-[#EFE9D5]/70 text-sm">{label}</p>
                        <p className="text-[#274450] dark:text-[#EFE9D5] text-sm">{value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Decision */}
                <details className="group rounded-lg border border-[#274450]/15 dark:border-white/10 bg-white/60 dark:bg-white/5" open>
                  <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none">
                    <p className="text-[#274450] dark:text-[#EFE9D5] text-base font-medium">
                      Decision
                    </p>
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      aria-label="Toggle section"
                      className="grid place-items-center size-8 rounded-md border border-[#274450]/20 dark:border-white/15 bg-[#71BBB2]/20 hover:bg-[#71BBB2]/30 transition"
                    >
                      <svg
                        className="size-4 text-[#274450] dark:text-[#EFE9D5] transition-transform duration-200 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </summary>

                  <div className="flex flex-col gap-4 px-4 pb-4">
                    <label className="flex flex-col w-full">
                      <p className="text-[#274450] dark:text-[#EFE9D5] text-sm font-medium pb-2">
                        Notes
                      </p>
                      <textarea
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#274450] dark:text-[#EFE9D5] border border-[#274450]/25 dark:border-white/15 bg-white/80 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#71BBB2] focus:border-transparent min-h-32 placeholder:text-[#274450]/50 dark:placeholder:text-[#EFE9D5]/60 p-3 text-sm"
                        placeholder="Enter your notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </label>
                  </div>
                </details>
              </div>
            </div>

            {/* Bottom: Actions */}
            <div className="flex flex-col gap-3 p-4 border-t border-[#274450]/15 dark:border-white/10 bg-[#EFE9D5]/60 dark:bg-transparent rounded-b-lg">
              <div className="flex justify-between gap-3">
                <button
                  className="flex-1 flex items-center justify-center h-10 px-4 rounded-lg text-white text-sm font-bold tracking-[0.015em] transition-colors bg-[#b4232a] hover:bg-[#a11f25] shadow-sm"
                  onClick={() => onReject(row.type, row._id, notes)}
                  type="button"
                >
                  Reject
                </button>

                <button
                  className="flex-1 flex items-center justify-center h-10 px-4 rounded-lg text-[#274450] text-sm font-bold tracking-[0.015em] transition-colors bg-[#71BBB2] hover:bg-[#65aca4] shadow-sm"
                  onClick={() => onNeedInfo(row.type, row._id, notes)}
                  type="button"
                >
                  Need Info
                </button>
              </div>

              <button
                className="w-full flex items-center justify-center h-10 px-4 rounded-lg text-white text-sm font-bold tracking-[0.015em] transition-colors bg-[#497D74] hover:bg-[#416f6a] shadow-sm ring-1 ring-inset ring-white/0 hover:ring-[#71BBB2]/40"
                onClick={() => onApprove(row.type, row._id, notes)}
                type="button"
                
              >
                Approve
              </button>
              {/* const saveUser = {
        name: data.name,
        email: data.email,
        photo: profilePic || null,
        createdAt: new Date(),

        role: "user",
      }; */}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
