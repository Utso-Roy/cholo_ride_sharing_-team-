import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { FaCarSide } from "react-icons/fa";

interface Ride {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  fare: number;
  status: "Completed" | "Ongoing" | "Cancelled";
}

const MyRides: React.FC = () => {
  const rides: Ride[] = [
    { id: "RIDE-2025-001", date: "2025-10-21 10:30 AM", pickup: "বনানী, ঢাকা", dropoff: "ধানমন্ডি, ঢাকা", fare: 320, status: "Completed" },
    { id: "RIDE-2025-002", date: "2025-10-22 8:15 PM", pickup: "উত্তরা, ঢাকা", dropoff: "মিরপুর, ঢাকা", fare: 270, status: "Ongoing" },
    { id: "RIDE-2025-003", date: "2025-10-18 4:45 PM", pickup: "মোহাখালি, ঢাকা", dropoff: "বশুন্ধরা, ঢাকা", fare: 300, status: "Cancelled" },
    { id: "RIDE-2025-004", date: "2025-10-20 9:00 AM", pickup: "গুলশান, ঢাকা", dropoff: "আগারগাঁও, ঢাকা", fare: 350, status: "Completed" },
    { id: "RIDE-2025-005", date: "2025-10-19 2:30 PM", pickup: "চট্টগ্রাম রোড, ঢাকা", dropoff: "নিউ মার্কেট, ঢাকা", fare: 280, status: "Ongoing" },
    { id: "RIDE-2025-006", date: "2025-10-17 11:15 AM", pickup: "সাভার, ঢাকা", dropoff: "বাড্ডা, ঢাকা", fare: 400, status: "Completed" },
    { id: "RIDE-2025-007", date: "2025-10-16 5:45 PM", pickup: "কলাবাগান, ঢাকা", dropoff: "মোহামেডান, ঢাকা", fare: 310, status: "Cancelled" },
    { id: "RIDE-2025-008", date: "2025-10-15 7:00 AM", pickup: "বনশ্রী, ঢাকা", dropoff: "ধানমন্ডি, ঢাকা", fare: 260, status: "Completed" },
    { id: "RIDE-2025-009", date: "2025-10-14 3:30 PM", pickup: "নিউমার্কেট, ঢাকা", dropoff: "উত্তরা, ঢাকা", fare: 290, status: "Ongoing" },
    { id: "RIDE-2025-010", date: "2025-10-13 1:00 PM", pickup: "মতিঝিল, ঢাকা", dropoff: "গুলশান, ঢাকা", fare: 360, status: "Completed" },
  ];

  const getStatusSeverity = (status: Ride["status"]) => {
    switch (status) {
      case "Completed": return "success";
      case "Ongoing": return "info";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  const statusBody = (rowData: Ride) => (
    <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} />
  );

  const fareBody = (rowData: Ride) => (
    <span className="font-semibold text-gray-800">৳{rowData.fare}</span>
  );

  return (
    <div className="w-full mx-auto px-6 py-16 bg-gray-50 min-h-screen">
      {/* Header */}
   <h2 className="text-3xl font-semibold text-[#27445D] mb-2 flex items-center gap-2">
  <FaCarSide className="text-[#71BBB2]" /> আমার রাইডসমূহ
</h2>

<p className="text-gray-500 mb-10 text-sm mt-1">
  এখানে আপনি আপনার সমস্ত পূর্বের রাইডের বিস্তারিত সংক্ষিপ্ত বিবরণ দেখতে পাবেন। প্রতিটি রাইডের তারিখ, সময়, প্রস্থান এবং গন্তব্য সহ সমস্ত গুরুত্বপূর্ণ তথ্য এখানে অন্তর্ভুক্ত থাকবে, যাতে আপনি সহজে আপনার রাইড ইতিহাস ট্র্যাক করতে পারেন।
</p>

      {/* DataTable */}
      <div className="overflow-x-auto rounded-xl shadow-sm bg-white">
       <DataTable
  value={rides}
  paginator
  rows={5}
  responsiveLayout="scroll"
  stripedRows
  className="p-datatable-sm w-full"
  rowHover
  tableStyle={{ minWidth: "900px", backgroundColor: "white" }}
  emptyMessage="রাইড পাওয়া যায়নি।"
  rowClassName={() => "hover:bg-gray-100 transition-colors text-gray-600 text-sm"} // text color & size
>
  <Column
    field="id"
    header="রাইড আইডি"
    sortable
    style={{ minWidth: "140px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="date"
    header="তারিখ ও সময়"
    sortable
    style={{ minWidth: "160px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="pickup"
    header="পিকআপ লোকেশন"
    style={{ minWidth: "180px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="dropoff"
    header="ড্রপঅফ লোকেশন"
    style={{ minWidth: "180px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="fare"
    header="ভাড়া"
    body={fareBody}
    sortable
    style={{ minWidth: "100px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="status"
    header="স্ট্যাটাস"
    body={statusBody}
    sortable
    style={{ minWidth: "120px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
</DataTable>

      </div>
    </div>
  );
};

export default MyRides;
