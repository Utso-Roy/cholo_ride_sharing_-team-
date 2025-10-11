import React from "react";
import {
  FaHome,
  FaCarSide,
  FaUsers,
  FaMoneyBill,
  FaCog,
  FaChartPie,
  FaUserShield,
} from "react-icons/fa";
import { NavLink, Link } from "react-router";

const Sidebar = () => {
  // 🔹 মেনু আইটেম
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", to: "/dashboard" },
    { icon: <FaCarSide />, label: "Rides", to: "/dashboard/rides" },
    { icon: <FaUsers />, label: "Drivers", to: "/dashboard/drivers" },
    { icon: <FaUserShield />, label: "Users", to: "/dashboard/users" },
    { icon: <FaMoneyBill />, label: "Payments", to: "/dashboard/payments" },
    { icon: <FaChartPie />, label: "Reports", to: "/dashboard/reports" },
    { icon: <FaChartPie />, label: "Content Management", to: "/dashboard/content-management" },
  ];

  const baseItemClass =
    "flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer group";
  const activeClass = "bg-[#5aa49c] text-white";
  const hoverClass = "hover:bg-[#5aa49c] hover:text-white";

  return (
    <div className="h-screen w-64 bg-[#71BBB2] text-[#083c3a] flex flex-col shadow-xl border-r border-[#9ad2cb] fixed md:static z-40">
      {/* 🔹 Logo */}
      <div className="p-6 text-center font-extrabold text-2xl tracking-wide bg-[#e6f6f5] border-b border-[#9ad2cb] shadow-md">
        <Link to="/">
          Ride<span className="text-[#2e736d]">Admin</span>
        </Link>
      </div>

      {/* 🔹 Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 bg-[#71BBB2] overflow-y-auto">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            end={item.to === "/dashboard"} // dashboard root exact-active
            className={({ isActive }) =>
              `${baseItemClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
            <span className="font-medium tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* 🔹 Footer */}
      <div className="border-t border-[#9ad2cb] bg-[#e6f6f5] p-4 flex items-center justify-between hover:bg-[#d9efed] transition-all duration-300">
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
