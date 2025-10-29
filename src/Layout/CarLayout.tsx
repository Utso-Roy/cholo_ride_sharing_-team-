import React from "react";
import { Outlet } from "react-router";
import { CarApplyProvider } from "../context/car";
import MessengerButton from "../components/MessengerButton";


const CarLayout = () => {
  return (
    <section
      className="px-4 md:px-10 py-10 bg-cover bg-center  bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backgroundBlendMode: "overlay",
      }}
    >
    <CarApplyProvider>
      <Outlet />
       <MessengerButton />
    </CarApplyProvider>
    </section>
  );
};

export default CarLayout;
