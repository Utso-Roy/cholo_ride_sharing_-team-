export type RideStatus = "pending" | "investigating" | "resolved" | "rejected";

export interface RideQueueItem {
  rideId: string;
  createdAt: string;           // ISO
  pickup: string;              // "Uttara Sector 7"
  dropoff: string;             // "Dhanmondi 27"
  riskScore: number;           // 0-100 (model or heuristic)
  flags: ("fraud" | "safety" | "payment" | "cs")[];
  status: RideStatus;
  assignee?: { id: string; name: string } | null;
  slaSecondsRemaining?: number; // countdown for SLA breach
  hasEvidence: boolean;
}
