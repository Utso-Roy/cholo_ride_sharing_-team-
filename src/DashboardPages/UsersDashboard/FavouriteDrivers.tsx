import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

interface Rider {
  riderId: string;
  name: string;
  email: string;
  lastRide: string;
  status: "Active" | "Inactive";
  favourite: boolean;
  image: string;
}

const FavouriteRiders: React.FC = () => {
 

   const { user } = useContext(AuthContext);

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["upcomingRides", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/favourite-riders?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

   if (isLoading) return <Loading/>;
    
  const statusBody = (rowData: Rider) => (
    <Tag value={rowData.status} severity={rowData.status === "Active" ? "success" : "danger"} />
  );

  const imageBody = (rowData: Rider) => (
    <img src={rowData.image} alt={rowData.name} className="w-10 h-10 rounded-full object-cover" />
  );

  return (
    <div className="w-full mx-auto my-16 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-[#27445D] mb-6 flex items-center gap-2">
        <FaUser className="text-[#71BBB2]" /> প্রিয় রাইডার
      </h2>

      <p className="text-gray-500 mb-10 text-sm mt-1">
        এখানে আপনি সমস্ত প্রিয় রাইডারের তথ্য দেখতে পারবেন, যেমন নাম, অভিজ্ঞতা, রেটিং এবং বর্তমানে তাদের অবস্থা।
      </p>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
        <DataTable
          value={riders}
          paginator
          rows={5}
          responsiveLayout="scroll"
          stripedRows
          rowHover
          tableStyle={{ minWidth: "900px" }}
          rowClassName={() => "hover:bg-gray-100 transition-colors rounded-lg text-gray-600 text-sm"}
        >

          <Column
            field="image"
            header="ছবি"
            body={imageBody}
            style={{ minWidth: "80px" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
          <Column
            field="riderId"
            header="রাইডার আইডি"
            sortable
            style={{ minWidth: "140px" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
        
          <Column
            field="name"
            header="নাম"
            style={{ minWidth: "180px" }}
            headerStyle={{ backgroundColor: "#71BBB2", color: "#fff", fontWeight: 600 }}
          />
          <Column
            field="lastRide"
            header="সর্বশেষ রাইড"
            sortable
            style={{ minWidth: "140px" }}
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

export default FavouriteRiders;
