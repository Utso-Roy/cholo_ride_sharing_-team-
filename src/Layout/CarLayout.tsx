import React from "react";
import { Outlet } from "react-router";
import { CarApplyProvider } from "../context/car";


const CarLayout = () => {
  return (
    <CarApplyProvider>
      <Outlet />
    </CarApplyProvider>
  );
};

export default CarLayout;
