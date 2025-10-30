import React from "react";
import { BikeApplyProvider } from "../context/bike";
import { Outlet } from "react-router";
import MessengerButton from "../components/MessengerButton";

const BikeLayout = () => {
  return (
    <section
      className="px-4 md:px-10 py-10 bg-gray-50"
    >
      <BikeApplyProvider>
        <Outlet />
        <MessengerButton />
      </BikeApplyProvider>
    </section>
  );
};

export default BikeLayout;
