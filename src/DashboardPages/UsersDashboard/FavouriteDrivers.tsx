import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { FaUser } from "react-icons/fa";

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  lastRide: string;
  status: "Active" | "Inactive";
}

const FavouriteDrivers: React.FC = () => {
  const drivers: Driver[] = [
    { id: "DRV-001", name: "রিয়াজুল ইসলাম", vehicle: "Toyota Prius", rating: 4.9, lastRide: "2025-10-21", status: "Active" },
    { id: "DRV-002", name: "সুলতান মাহমুদ", vehicle: "Honda Civic", rating: 4.8, lastRide: "2025-10-20", status: "Active" },
    { id: "DRV-003", name: "তৌফিক হোসেন", vehicle: "Toyota Axio", rating: 4.7, lastRide: "2025-10-19", status: "Inactive" },
    { id: "DRV-004", name: "মোঃ রাশেদ", vehicle: "Nissan Sunny", rating: 4.6, lastRide: "2025-10-18", status: "Active" },
    { id: "DRV-005", name: "ফয়সাল আহমেদ", vehicle: "Suzuki Swift", rating: 4.9, lastRide: "2025-10-17", status: "Active" },
    { id: "DRV-006", name: "জসিম উদ্দিন", vehicle: "Toyota Corolla", rating: 4.5, lastRide: "2025-10-16", status: "Inactive" },
    { id: "DRV-007", name: "রুবেল হোসেন", vehicle: "Honda City", rating: 4.8, lastRide: "2025-10-15", status: "Active" },
    { id: "DRV-008", name: "শাহিনুর রহমান", vehicle: "Toyota Axio", rating: 4.6, lastRide: "2025-10-14", status: "Active" },
    { id: "DRV-009", name: "মোঃ আজিজ", vehicle: "Nissan Sylphy", rating: 4.7, lastRide: "2025-10-13", status: "Inactive" },
    { id: "DRV-010", name: "আফরান হোসেন", vehicle: "Honda Civic", rating: 4.9, lastRide: "2025-10-12", status: "Active" },
  ];

  const statusBody = (rowData: Driver) => (
    <Tag value={rowData.status} severity={rowData.status === "Active" ? "success" : "danger"} />
  );

  return (
    <div className="w-full mx-auto my-16 px-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#27445D]  mb-6 flex items-center gap-2">
        <FaUser className="text-[#71BBB2]" /> প্রিয় ড্রাইভার
      </h2>

     <p className="text-gray-500 mb-10 text-sm mt-1">
  এখানে আপনি সমস্ত উপলব্ধ ড্রাইভারের তথ্য দেখতে পারবেন, যেমন নাম, অভিজ্ঞতা, রেটিং এবং বর্তমানে তাদের অবস্থা। সহজে প্রয়োজনীয় ড্রাইভার বেছে নিতে পারবেন।
</p>


      {/* DataTable */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
        <DataTable
  value={drivers}
  paginator
  rows={5}
  responsiveLayout="scroll"
  stripedRows
  className="p-datatable-sm w-full"
  rowHover
  tableStyle={{ minWidth: "900px", backgroundColor: "transparent" }}
  rowClassName={() => "hover:bg-gray-100 transition-colors rounded-lg text-gray-600 text-sm"} // text fixed
>
  <Column
    field="id"
    header="ড্রাইভার আইডি"
    sortable
    style={{ minWidth: "140px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="name"
    header="ড্রাইভার নাম"
    style={{ minWidth: "200px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="vehicle"
    header="গাড়ি"
    style={{ minWidth: "180px" }}
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="rating"
    header="রেটিং"
    style={{ minWidth: "100px" }}
    sortable
    headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
  />
  <Column
    field="lastRide"
    header="সর্বশেষ রাইড"
    style={{ minWidth: "140px" }}
    sortable
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

export default FavouriteDrivers;
