import React, { useContext, useEffect, useState } from "react";
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
  FaUser,
  FaHeart,
} from "react-icons/fa";

import { Link, NavLink } from "react-router";
import api from "../../lib/api";
import { AuthContext } from "../../Auth/AuthProvider";
import { moderatorMenuItems } from "../../Utils/ModeratorMenu/moderatorMenu";

type Role = "admin" | "moderator" | "rider" | "user" | undefined;

interface AppUser {
  _id?: string;
  name?: string;
  email?: string;
  role?: Role;
}

interface MenuItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const { user } = useContext(AuthContext) as { user?: { email?: string } };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<AppUser[]>("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const currentUser = users.find((u) => u?.email === user?.email);

  // ✅ Admin menu items
  const adminItems: MenuItem[] = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUser />, label: "My Profile", path: "/dashboard/profile" },
    { icon: <FaCarSide />, label: "Rides", path: "/dashboard/rides" },
    { icon: <FaUsers />, label: "Drivers", path: "/dashboard/drivers" },
    { icon: <FaUserShield />, label: "Users", path: "/dashboard/users" },
    { icon: <FaMoneyBill />, label: "Payments", path: "/dashboard/payments" },
    { icon: <FaChartPie />, label: "Reports", path: "/dashboard/reports" },
    { icon: <FaHandshake />, label: "Manage Partners", path: "/dashboard/manage-partners" },
    { icon: <FaBriefcase />, label: "Manage Jobs", path: "/dashboard/manage-jobs" },
    { icon: <FaHeart />, label: "Manage Activities", path: "/dashboard/manage-activities" },
    { icon: <FaBriefcase />, label: "Content Management", path: "/dashboard/content-management" },
  ];

  const riderItems: MenuItem[] = [
    { label: "Rider Dashboard", path: "/dashboard", icon: <FaHome /> },
  ];

  const userItems: MenuItem[] = [
    { label: "User Dashboard", path: "/dashboard", icon: <FaHome /> },
  ];

  // ✅ Role-based menu rendering
  let roleToRender: MenuItem[] = [];

  if (currentUser?.role === "admin") {
    roleToRender = adminItems;
  } else if (currentUser?.role === "moderator") {
    roleToRender = moderatorMenuItems;
  } else if (currentUser?.role === "rider") {
    roleToRender = riderItems;
  } else {
    roleToRender = userItems;
  }

  return (
    <div className="h-screen w-64 bg-[#71BBB2] text-[#083c3a] flex flex-col shadow-xl border-r border-[#9ad2cb] fixed md:static z-40">
      {/* 🔹 Logo */}
      <div className="p-6 text-center font-extrabold text-2xl tracking-wide bg-[#e6f6f5] border-b border-[#9ad2cb] shadow-md">
        <Link to="/">
          Ride<span className="text-[#2e736d]">{currentUser?.role}</span>
        </Link>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 px-4 py-6 space-y-2 bg-[#71BBB2] overflow-y-auto">
        {roleToRender.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path ?? "#"}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                isActive
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
