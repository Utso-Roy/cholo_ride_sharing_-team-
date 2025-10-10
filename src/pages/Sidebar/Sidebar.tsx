import React from "react";
import {
  FaHome,
  FaCarSide,
  FaUsers,
  FaMoneyBill,
  FaCog,
  FaChartPie,
  FaUserShield,
  FaHandshake,
  FaBriefcase,
} from "react-icons/fa";
import { NavLink, Link } from "react-router";

const Sidebar = () => {
  // 🔹 মেনু আইটেমগুলোর তালিকা
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaCarSide />, label: "Rides", path: "/dashboard/rides" },
    { icon: <FaUsers />, label: "Drivers", path: "/dashboard/drivers" },
    { icon: <FaUserShield />, label: "Users", path: "/dashboard/users" },
    { icon: <FaMoneyBill />, label: "Payments", path: "/dashboard/payments" },
    { icon: <FaChartPie />, label: "Reports", path: "/dashboard/reports" },
    { icon: <FaHandshake />, label: "Manage Partners", path: "/dashboard/manage-partners" },
    { icon: <FaBriefcase />, label: "Manage Jobs", path: "/dashboard/manage-jobs" },
    { icon: <FaBriefcase />, label: "Content_Management", path: "/dashboard/ContentManagement" },
  ];

  return (
    <div className="h-screen w-64 bg-[#71BBB2] text-[#083c3a] flex flex-col shadow-xl border-r border-[#9ad2cb] fixed md:static z-40">
      {/* 🔹 Logo Section */}
      <div className="p-6 text-center font-extrabold text-2xl tracking-wide bg-[#e6f6f5] border-b border-[#9ad2cb] shadow-md">
        <Link to="/">
          Ride<span className="text-[#2e736d]">Admin</span>
        </Link>
      </div>

      {/* 🔹 Menu Section */}
      <nav className="flex-1 px-4 py-6 space-y-2 bg-[#71BBB2] overflow-y-auto">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer group ${isActive
                ? "bg-[#2e736d] text-white"
                : "hover:bg-[#5aa49c] hover:text-white"
              }`
            }
          >
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
            <span className="font-medium tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* 🔹 Footer Section */}
      <div className="border-t border-[#9ad2cb] bg-[#e6f6f5] p-4 flex items-center justify-between hover:bg-[#d9efed] transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-3">
          <FaCog className="text-[#2e736d]" />
          <span className="font-medium">Settings</span>
        </div>
        <span className="text-sm text-gray-500">v1.0</span>
      </div>
    </div>
  );
};

export default Sidebar;
