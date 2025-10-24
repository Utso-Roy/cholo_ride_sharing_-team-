import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FaCalendarAlt } from "react-icons/fa";

interface ScheduledRide {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  status: "Scheduled" | "Confirmed" | "Cancelled";
}

const UpcomingRides: React.FC = () => {
  const rides: ScheduledRide[] = [
    { id: "RIDE-2025-011", date: "2025-10-25 10:00 AM", pickup: "বনানী, ঢাকা", dropoff: "মিরপুর, ঢাকা", status: "Scheduled" },
    { id: "RIDE-2025-012", date: "2025-10-26 3:30 PM", pickup: "উত্তরা, ঢাকা", dropoff: "ধানমন্ডি, ঢাকা", status: "Confirmed" },
    { id: "RIDE-2025-013", date: "2025-10-27 8:00 AM", pickup: "গুলশান, ঢাকা", dropoff: "আগারগাঁও, ঢাকা", status: "Cancelled" },
    { id: "RIDE-2025-014", date: "2025-10-28 9:15 AM", pickup: "ধানমন্ডি, ঢাকা", dropoff: "উত্তরা, ঢাকা", status: "Scheduled" },
    { id: "RIDE-2025-015", date: "2025-10-29 2:00 PM", pickup: "মোহাখালি, ঢাকা", dropoff: "গুলশান, ঢাকা", status: "Confirmed" },
    { id: "RIDE-2025-016", date: "2025-10-30 6:45 AM", pickup: "সাভার, ঢাকা", dropoff: "বাড্ডা, ঢাকা", status: "Cancelled" },
    { id: "RIDE-2025-017", date: "2025-10-31 11:30 AM", pickup: "কলাবাগান, ঢাকা", dropoff: "মিরপুর, ঢাকা", status: "Scheduled" },
  ];

  const getStatusSeverity = (status: ScheduledRide["status"]) => {
    switch (status) {
      case "Scheduled": return "info";
      case "Confirmed": return "success";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  const statusBody = (rowData: ScheduledRide) => (
    <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} />
  );

  return (
    <div className="w-full mx-auto px-6 py-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-[#27445D] mb-2 flex items-center gap-2">
        <FaCalendarAlt className="text-[#71BBB2]" /> আসন্ন রাইডসমূহ
      </h2>

      <p className="text-gray-500 mb-10 text-sm mt-1">
        এখানে আপনি আপনার সমস্ত আগাম বুক করা রাইডের বিস্তারিত সংক্ষিপ্ত বিবরণ দেখতে পাবেন। সহজে রাইডের সময়, পিকআপ এবং ড্রপঅফ লোকেশন ট্র্যাক করতে পারবেন।
      </p>

      {/* DataTable */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
        <DataTable
          value={rides}
          paginator
          rows={5}
          responsiveLayout="scroll"
          stripedRows
          className="p-datatable-sm w-full"
          rowHover
          tableStyle={{ minWidth: "900px", backgroundColor: "transparent" }}
          rowClassName={() => "hover:bg-gray-100 transition-colors rounded-lg"}
        >
          <Column
            field="id"
            header="রাইড আইডি"
            sortable
            style={{ minWidth: "140px", color: "#4B5563", fontSize: "0.875rem" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
          <Column
            field="date"
            header="তারিখ ও সময়"
            sortable
            style={{ minWidth: "160px", color: "#4B5563", fontSize: "0.875rem" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
          <Column
            field="pickup"
            header="পিকআপ লোকেশন"
            style={{ minWidth: "180px", color: "#4B5563", fontSize: "0.875rem" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
          <Column
            field="dropoff"
            header="ড্রপঅফ লোকেশন"
            style={{ minWidth: "180px", color: "#4B5563", fontSize: "0.875rem" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
          <Column
            field="status"
            header="স্ট্যাটাস"
            body={statusBody}
            sortable
            style={{ minWidth: "120px", fontSize: "0.875rem" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default UpcomingRides;
