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
   FaClipboardList,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBell,
  FaEnvelopeOpenText,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";

import { NavLink, Link } from "react-router";
import api from "../../lib/api";
import AuthProvider, { AuthContext } from "../../Auth/AuthProvider";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(user?.email);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const currentUser = users.find((u) => u?.email == user?.email);

  const adminItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUser />, label: "My Profile", path: "/dashboard/profile" },
    { icon: <FaCarSide />, label: "Rides", path: "/dashboard/rides" },
    { icon: <FaUsers />, label: "Drivers", path: "/dashboard/drivers" },
    { icon: <FaUserShield />, label: "Users", path: "/dashboard/users" },
    { icon: <FaMoneyBill />, label: "Payments", path: "/dashboard/payments" },
    { icon: <FaChartPie />, label: "Reports", path: "/dashboard/reports" },
    {
      icon: <FaHandshake />,
      label: "Manage Partners",
      path: "/dashboard/manage-partners",
    },
    {
      icon: <FaBriefcase />,
      label: "Manage Jobs",
      path: "/dashboard/manage-jobs",
    },
    {
      icon: <FaBriefcase />,
      label: "Content Management",
      path: "/dashboard/ContentManagement",
    },
  ];

  const moderatorItems = [
     {
    icon: <FaHome />,
    label: "Overview",
    path: "/dashboard/mod/overview",
  },
  {
    icon: <FaFileAlt />,
    label: "Reports",
    path: "/dashboard/mod/reports",
  },
  {
    icon: <FaClipboardList />,
    label: "Report Detail",
    path: "/dashboard/mod/reports/:reportId",
  },
  {
    icon: <FaCheckCircle />,
    label: "Verifications",
    path: "/dashboard/mod/verifications",
  },
  {
    icon: <FaUsers />,
    label: "Driver KYC",
    path: "/dashboard/mod/verifications/drivers/:id",
  },
  {
    icon: <FaCarSide />,
    label: "Vehicle Verifications",
    path: "/dashboard/mod/verifications/vehicles/:id",
  },
  {
    icon: <FaExclamationTriangle />,
    label: "Rides Queue",
    path: "/dashboard/mod/rides/queue",
  },
  {
    icon: <FaCarSide />,
    label: "Ride Detail",
    path: "/dashboard/mod/rides/:rideId",
  },
  {
    icon: <FaUserShield />,
    label: "Disputes",
    path: "/dashboard/mod/disputes",
  },
  {
    icon: <FaClipboardList />,
    label: "Dispute Detail",
    path: "/dashboard/mod/disputes/:disputeId",
  },
  {
    icon: <FaExclamationTriangle />,
    label: "Incidents",
    path: "/dashboard/mod/safety/incidents",
  },
  {
    icon: <FaBell />,
    label: "Watchlist",
    path: "/dashboard/mod/safety/watchlist",
  },
  {
    icon: <FaEnvelopeOpenText />,
    label: "Message Templates",
    path: "/dashboard/mod/comms/templates",
  },
  {
    icon: <FaEnvelopeOpenText />,
    label: "Broadcasts",
    path: "/dashboard/mod/comms/broadcasts",
  },
  {
    icon: <FaChartLine />,
    label: "Audit Actions",
    path: "/dashboard/mod/audit/actions",
  },
  {
    icon: <FaChartLine />,
    label: "Audit Metrics",
    path: "/dashboard/mod/audit/metrics",
  },
  {
    icon: <FaCogs />,
    label: "Profile",
    path: "/dashboard/profile",
  },
  ];
  const riderItems = [
    {
      label: "utso",
    },
  ];
  const userItems = [
    {
      label: "utso",
    },
  ];

  let roleToRender = [];

  if (currentUser?.role == "admin") {
    roleToRender = adminItems;
  } else if (currentUser?.role == "moderator") {
    roleToRender = moderatorItems;
  } else if (currentUser?.role == "rider") {
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

      {/*  Menu Section */}
      <nav className="flex-1 px-4 py-6 space-y-2 bg-[#71BBB2] overflow-y-auto">
        {roleToRender.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
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
              {item?.icon}
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
