import api from "../../../../lib/api";



export async function sendModerationMessage(payload: {
  to: string;                // email বা phone
  subject: string;
  body: string;
  meta?: any;                // rideId, templateId, ইত্যাদি
}) {
  const res = await api.post("/api/mod/comms/send", payload);
  return res.data;
}

/** optional: usage mark, যদি BE-তে রুট থাকে */
export async function markTemplateUsed(id: string) {
  const res = await api.post(`/api/template/${id}/mark-used`);
  return res.data;
}
