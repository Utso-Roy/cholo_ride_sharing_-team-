import React from "react";
import { Outlet } from "react-router";
import { CarApplyProvider } from "../context/car";
import MessengerButton from "../components/MessengerButton";


const CarLayout = () => {
  return (
    <CarApplyProvider>
      <Outlet />
       <MessengerButton />
    </CarApplyProvider>
  );
};

export default CarLayout;
