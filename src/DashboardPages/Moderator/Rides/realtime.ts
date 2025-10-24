export type RideUpdateEvent = {
  type: "ride-update";
  rideId: string;
  payload: Partial<{
    status: "ongoing" | "completed" | "cancelled" | "investigating";
    riskScore: number;
    flags: string[];
    // add more fields backend may send:
    // fareTotal, events, chat, suspicious, etc.
  }>;
};

export type ModSocketEvent = RideUpdateEvent; // extend later if  add more event types
