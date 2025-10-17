import React from "react";
import { BikeApplyProvider } from "../context/bike";
import { Outlet } from "react-router";
import MessengerButton from "../components/MessengerButton";

const BikeLayout = () => {
  return (
    <BikeApplyProvider>
      <Outlet />
       <MessengerButton />
    </BikeApplyProvider>
  );
};

export default BikeLayout;
