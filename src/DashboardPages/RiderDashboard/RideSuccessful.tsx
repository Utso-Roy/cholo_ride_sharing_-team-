import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const dummySuccessfulRides = [
  { id: 1, rider: "Rahim Uddin", pickup: "Rampur Station", drop: "Kaharol Bazar", fare: "৳85", status: "Successful" },
  { id: 2, rider: "Karim Ali", pickup: "Dinajpur Bus Stand", drop: "City Market", fare: "৳120", status: "Successful" },
  { id: 3, rider: "Fatima Begum", pickup: "Kaharol Bazar", drop: "Rampur Station", fare: "৳95", status: "Successful" },
];

const RideSuccessful: React.FC = () => {
  // Calculate total fare
  const totalFare = dummySuccessfulRides.reduce((acc, ride) => {
    const fareNumber = parseFloat(ride.fare.replace("৳", ""));
    return acc + fareNumber;
  }, 0);

  // Status column template
  const statusBodyTemplate = (rowData: any) => (
    <span className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${rowData.status === "Successful" ? "bg-green-500" : "bg-gray-400"}`}>
      {rowData.status}
    </span>
  );

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Total Fare Display */}
      <div className="mb-4 text-right">
        <span className="font-bold text-lg sm:text-xl text-gray-700">
          Total Fare Collected: <span className="text-green-600">৳{totalFare}</span>
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
       Today Successful Rides
      </h1>

      <DataTable
        value={dummySuccessfulRides}
        responsiveLayout="scroll"
        className="p-datatable-striped p-datatable-gridlines p-datatable-hover shadow-md bg-white rounded-xl overflow-hidden"
        rowHover
        breakpoint="960px"
      >
        <Column field="rider" header="Rider" sortable />
        <Column field="pickup" header="Pickup Location" sortable />
        <Column field="drop" header="Drop Location" sortable />
        <Column field="fare" header="Fare" sortable />
        <Column field="status" header="Status" body={statusBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default RideSuccessful;
