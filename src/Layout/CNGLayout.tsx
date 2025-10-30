import React from "react";
import { CNGApplyProvider } from "../context/cng";
import { Outlet } from "react-router";
import MessengerButton from "../components/MessengerButton";

const CNGLayout = () => {
  return (
    <section
      className="px-4 md:px-10 py-10 bg-gray-50"
    >
      <CNGApplyProvider>
        <Outlet />
        <MessengerButton />
      </CNGApplyProvider>
    </section>
  );
};

export default CNGLayout;
