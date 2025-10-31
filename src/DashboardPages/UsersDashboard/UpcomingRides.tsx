import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthProvider";
import Loading from "../../Loading/Loading";

interface ScheduledRide {
  _id: string; // MongoDB _id
  rideId: string;
  date: string;
  pickup: string;
  dropoff: string;
  status: "Scheduled" | "Confirmed" | "Cancelled";
}

const UpcomingRides: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { data: rides = [], isLoading } = useQuery({
    queryKey: ["upcomingRides", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/upcoming-rides?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const getStatusSeverity = (status: ScheduledRide["status"]) => {
    switch (status) {
      case "Scheduled":
        return "info";
      case "Confirmed":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const statusBody = (rowData: ScheduledRide) => (
    <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} />
  );

 if (isLoading) return <Loading/>;

  return (
    <div className="w-full mx-auto px-6 py-16 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-[#27445D] mb-2 flex items-center gap-2">
        <FaCalendarAlt className="text-[#71BBB2]" /> আসন্ন রাইডসমূহ
      </h2>
      <p className="text-gray-500 mb-10 text-sm mt-1">
        এখানে আপনি আপনার সমস্ত আগাম বুক করা রাইডের বিস্তারিত সংক্ষিপ্ত বিবরণ দেখতে পাবেন। সহজে রাইডের সময়, পিকআপ এবং ড্রপঅফ লোকেশন ট্র্যাক করতে পারবেন।
      </p>

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
          emptyMessage="রাইড পাওয়া যায়নি।"
        >
          
          <Column
            field="rideId"
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
