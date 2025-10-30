import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FaCheck, FaTimes, FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";
import { toast } from "react-toastify";

const dummyRequests = [
  { id: 1, rider: "Rahim Uddin", pickup: "Rampur Station", drop: "Kaharol Bazar", distance: "5.8 km", fare: "৳85" },
  { id: 2, rider: "Karim Ali", pickup: "Dinajpur Bus Stand", drop: "City Market", distance: "7.2 km", fare: "৳120" },
  { id: 3, rider: "Fatima Begum", pickup: "Kaharol Bazar", drop: "Rampur Station", distance: "6.1 km", fare: "৳95" },
];

const RideRequest: React.FC = () => {

  //  Action Buttons Template
  const actionBodyTemplate = (rowData: any) => (
    <div className="flex flex-col sm:flex-row gap-2 justify-center">
      <Button
        icon={<FaCheck />}
        label="Accept"
        className="p-button-rounded p-button-success w-full sm:w-auto"
        onClick={() => toast.success(`Accepted ride for ${rowData.rider}`)}
      />
      <Button
        icon={<FaTimes />}
        label="Reject"
        className="p-button-rounded p-button-danger w-full sm:w-auto"
        onClick={() =>toast.error(`Rejected ride for ${rowData.rider}`)}
      />
    </div>
  );

  //  Pickup & Drop templates with icons
  const pickupBodyTemplate = (rowData: any) => (
    <span className="flex items-center gap-1 text-red-600 font-medium">
      <FaMapMarkerAlt /> {rowData.pickup}
    </span>
  );

  const dropBodyTemplate = (rowData: any) => (
    <span className="flex items-center gap-1 text-green-600 font-medium">
      <FaMapMarkerAlt /> {rowData.drop}
    </span>
  );

  const riderBodyTemplate = (rowData: any) => (
    <span className="flex items-center gap-1 text-blue-600 font-semibold">
      <FaMotorcycle /> {rowData.rider}
    </span>
  );

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#27445D] mb-4 sm:mb-6">
        Ride Requests
      </h1>

      <DataTable
        value={dummyRequests}
        responsiveLayout="scroll"
        className="p-datatable-gridlines p-datatable-striped p-datatable-hover shadow-xl bg-white rounded-xl overflow-hidden"
        breakpoint="960px"
        rowHover
      >
        <Column field="rider" header="Rider" body={riderBodyTemplate} sortable />
        <Column field="pickup" header="Pickup" body={pickupBodyTemplate} sortable />
        <Column field="drop" header="Drop" body={dropBodyTemplate} sortable />
        <Column field="distance" header="Distance" sortable />
        <Column field="fare" header="Fare" sortable />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default RideRequest;
