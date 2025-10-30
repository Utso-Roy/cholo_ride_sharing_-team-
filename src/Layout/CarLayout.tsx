import React from "react";
import { Outlet } from "react-router";
import { CarApplyProvider } from "../context/car";
import MessengerButton from "../components/MessengerButton";


const CarLayout = () => {
  return (
    <section
      className="px-4 md:px-10 py-10 bg-gray-50"
    >
    <CarApplyProvider>
      <Outlet />
       <MessengerButton />
    </CarApplyProvider>
    </section>
  );
};

export default CarLayout;
