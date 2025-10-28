import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";

interface Ride {
  id: number;
  rider: string;
  pickup: string;
  drop: string;
  fare: number;
  status: string;
}

const RideReject: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);

  // Dummy data, later replace with API fetch
  useEffect(() => {
    const dummyRides: Ride[] = [
      { id: 1, rider: "Rider A", pickup: "Rampur", drop: "Kaharol", fare: 150, status: "Rejected" },
      { id: 2, rider: "Rider B", pickup: "Dhaka", drop: "Gazipur", fare: 200, status: "Rejected" },
      { id: 3, rider: "Rider C", pickup: "Sylhet", drop: "Moulvibazar", fare: 180, status: "Rejected" },
      { id: 4, rider: "Rider D", pickup: "Chittagong", drop: "Cox's Bazar", fare: 350, status: "Rejected" },
    ];
    setRides(dummyRides);
  }, []);

  const statusBodyTemplate = (ride: Ride) => {
    return <Tag value={ride.status} severity="danger" rounded />;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg rounded-3xl">
        <h2 className="text-2xl font-bold text-red-600">
          Total Reject: {rides.length}
        </h2>
      </Card>

      <Card className="shadow-lg rounded-3xl">
        <DataTable value={rides} responsiveLayout="scroll" className="p-datatable-striped">
          <Column field="rider" header="Rider" sortable></Column>
          <Column field="pickup" header="Pickup Location" sortable></Column>
          <Column field="drop" header="Drop Location" sortable></Column>
          <Column field="fare" header="Fare (৳)" sortable></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
        </DataTable>
      </Card>
    </div>
  );
};

export default RideReject;
