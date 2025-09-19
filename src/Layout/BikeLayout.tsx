import React from "react";
import { BikeApplyProvider } from "../context/bike";
import { Outlet } from "react-router";

const BikeLayout = () => {
  return (
    <BikeApplyProvider>
      <Outlet />
    </BikeApplyProvider>
  );
};

export default BikeLayout;
