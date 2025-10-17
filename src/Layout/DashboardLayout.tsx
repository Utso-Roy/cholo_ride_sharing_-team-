import React, { useState } from "react";
import Sidebar from "../pages/Sidebar/Sidebar";
import { NavLink, Outlet } from "react-router";
import { HiMenu } from "react-icons/hi";
import MessengerButton from "../components/MessengerButton";
import Sidebar from "../pages/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* 🔹 Mobile Menu Button */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-gray-200 rounded-md focus:outline-none"
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed z-40 inset-y-0 left-0 bg-white shadow-md transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto md:flex md:flex-col
          transition-transform duration-300 ease-in-out
          w-64
        `}
      >
        <Sidebar/>
      </div>

      {/* 🔹 Main Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        <Outlet />
        <MessengerButton/>
      </div>

      {/* 🔹 Overlay (for mobile sidebar) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
