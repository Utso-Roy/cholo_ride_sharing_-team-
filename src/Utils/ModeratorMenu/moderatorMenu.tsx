import React from "react";
import {
  FaHome,
  FaFileAlt,
  FaClipboardList,
  FaCheckCircle,
  FaUsers,
  FaCarSide,
  FaExclamationTriangle,
  FaUserShield,
  FaBell,
  FaEnvelopeOpenText,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const moderatorMenuItems: MenuItem[] = [
  { icon: <FaHome />, label: "Overview", path: "/dashboard" },
  { icon: <FaFileAlt />, label: "Reports", path: "/dashboard/mod/reports" },
  { icon: <FaCheckCircle />, label: "Verifications", path: "/dashboard/mod/verifications" },
  { icon: <FaUsers />, label: "Drivers", path: "/dashboard/drivers" },
  { icon: <FaUserShield />, label: "Users", path: "/dashboard/mod/users" },
  { icon: <FaExclamationTriangle />, label: "Rides Queue", path: "/dashboard/mod/rides/queue" },
  { icon: <FaCarSide />, label: "Ride Detail", path: "/dashboard/mod/rides/:rideId" },
  { icon: <FaUserShield />, label: "Disputes", path: "/dashboard/mod/disputes" },
  { icon: <FaClipboardList />, label: "Dispute Detail", path: "/dashboard/mod/disputes/:disputeId" },
  { icon: <FaExclamationTriangle />, label: "Incidents", path: "/dashboard/mod/safety/incidents" },
  { icon: <FaBell />, label: "Watchlist", path: "/dashboard/mod/safety/watchlist" },
  { icon: <FaEnvelopeOpenText />, label: "Message Templates", path: "/dashboard/mod/comms/templates" },
  { icon: <FaEnvelopeOpenText />, label: "Broadcasts", path: "/dashboard/mod/comms/broadcasts" },
  { icon: <FaChartLine />, label: "Audit Actions", path: "/dashboard/mod/audit/actions" },
  { icon: <FaChartLine />, label: "Audit Metrics", path: "/dashboard/mod/audit/metrics" },
  { icon: <FaCogs />, label: "Profile", path: "/dashboard/profile" },
];
