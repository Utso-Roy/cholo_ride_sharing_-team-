import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface RideHistoryType {
  id: number;
  rider: string;
  pickup: string;
  drop: string;
  fare: string;
  date: string;
  status: "Successful" | "Rejected" | "Pending";
}

const dummyRideHistory: RideHistoryType[] = [
  {
    id: 1,
    rider: "Rahim Uddin",
    pickup: "Rampur Station",
    drop: "Kaharol Bazar",
    fare: "৳85",
    date: "2025-10-20",
    status: "Successful",
  },
  {
    id: 2,
    rider: "Karim Ali",
    pickup: "Dinajpur Bus Stand",
    drop: "City Market",
    fare: "৳120",
    date: "2025-10-21",
    status: "Rejected",
  },
  {
    id: 3,
    rider: "Fatima Begum",
    pickup: "Kaharol Bazar",
    drop: "Rampur Station",
    fare: "৳95",
    date: "2025-10-22",
    status: "Successful",
  },
  {
    id: 4,
    rider: "Sakib Hasan",
    pickup: "Nimtola",
    drop: "New Market",
    fare: "৳70",
    date: "2025-10-23",
    status: "Pending",
  },
  {
    id: 5,
    rider: "Ayesha Khatun",
    pickup: "City Center",
    drop: "Kaharol Bus Stop",
    fare: "৳105",
    date: "2025-10-24",
    status: "Successful",
  },
];

//  Status badge template
const statusTemplate = (rowData: RideHistoryType) => {
  let colorClass = "";
  if (rowData.status === "Successful") colorClass = "bg-green-500";
  else if (rowData.status === "Rejected") colorClass = "bg-red-500";
  else colorClass = "bg-yellow-500";

  return (
    <span
      className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
    >
      {rowData.status}
    </span>
  );
};

const RideHistory: React.FC = () => {
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#27445D] mb-6">
      Total Ride History
      </h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <DataTable
          value={dummyRideHistory}
          paginator
          rows={5}
          stripedRows
          responsiveLayout="scroll"
          className="p-datatable-sm md:p-datatable-md"
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        >
          <Column field="rider" header="Rider Name" sortable></Column>
          <Column field="pickup" header="Pickup Location" sortable></Column>
          <Column field="drop" header="Drop Location" sortable></Column>
          <Column field="fare" header="Fare" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column
            field="status"
            header="Status"
            body={statusTemplate}
            sortable
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default RideHistory;
