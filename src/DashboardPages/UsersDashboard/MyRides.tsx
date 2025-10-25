import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FaCarSide } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

interface Ride {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  fare: number;
  status: "Completed" | "Ongoing" | "Cancelled";
}

const MyRides: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { data: rides = [], isLoading } = useQuery({
    queryKey: ["myRides", user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/rides?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Ongoing": return "info";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  if (isLoading) return <Loading/>;

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
  rowClassName={() => "hover:bg-gray-100 transition-colors text-gray-600 text-sm"}
>
  {/* ✅ Ride ID */}
  

  <Column
    field="rideId"
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
