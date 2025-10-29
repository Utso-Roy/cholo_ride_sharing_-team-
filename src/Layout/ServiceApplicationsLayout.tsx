import React from "react";
import { Outlet } from "react-router";
import { ServiceApplyProvider } from "../context/serviceApplications";
import MessengerButton from "../components/MessengerButton";

const ServiceApplicationsLayout = () => {
  return (
    <ServiceApplyProvider>
      <Outlet />
      <MessengerButton />
    </ServiceApplyProvider>
  );
};

export default ServiceApplicationsLayout;
