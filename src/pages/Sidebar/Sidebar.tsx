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
  FaQuestionCircle,
  FaCommentDots,
  FaCalendarAlt,
  FaCogs,
  FaChartLine,
  FaHistory,
  FaStar,
  FaWallet,
  FaBell,
  FaRoute,
  FaMapMarkedAlt,
  FaTimes,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Auth/AuthProvider";
import { moderatorMenuItems } from "../../Utils/ModeratorMenu/moderatorMenu";
import Loading from "../../Loading/Loading";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";

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
  const [loading, setLoading] = useState<boolean>(true);
  const { user, logOut, setUser } = useContext(AuthContext) as {
    user?: { email?: string };
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.email) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get<AppUser[]>(
          "https://cholo-ride-sharing-website-server-side.onrender.com/users"
        );
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user?.email]);

  const currentUser = users.find((u) => u?.email === user?.email);

  // Admin menu items
  const adminItems: MenuItem[] = [
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
      icon: <FaHeart />,
      label: "Manage Activities",
      path: "/dashboard/manage-activities",
    },
    {
      icon: <FaBriefcase />,
      label: "Content Management",
      path: "/dashboard/content-management",
    },
  ];

  const riderItems: MenuItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    {
      label: "Ride Map",
      path: "/dashboard/ride_map",
      icon: <FaMapMarkedAlt />,
    },

    {
      label: "Ride Requests",
      path: "/dashboard/ride-requests",
      icon: <FaBell />,
    },

    {
      label: "My Rides",
      path: "/dashboard/rides-successful",
      icon: <FaRoute />,
    },
    {
      label: "Earnings Report",
      path: "/dashboard/earnings",
      icon: <FaWallet />,
    },
    {
      label: "Ratings & Reviews",
      path: "/dashboard/reviews",
      icon: <FaStar />,
    },
    { label: "Ride History", path: "/dashboard/history", icon: <FaHistory /> },

    { label: "Ride Reject", path: "/dashboard/ride-reject", icon: <FaTimes /> },
    {
      label: "Performance Report",
      path: "/dashboard/performance",
      icon: <FaChartLine />,
    },
    { label: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];

  const userItems: MenuItem[] = [
    { icon: <FaHome />, label: "Overview", path: "/dashboard" },
    { icon: <FaUser />, label: "My Profile", path: "/dashboard/profile" },
    { icon: <FaCarSide />, label: "My Rides", path: "/dashboard/my-rides" },
    {
      icon: <FaCalendarAlt />,
      label: "Upcoming Rides",
      path: "/dashboard/upcoming-rides",
    },
    {
      icon: <FaUsers />,
      label: "Favourite Drivers",
      path: "/dashboard/favourite-drivers",
    },
    {
      icon: <FaQuestionCircle />,
      label: "Help Center",
      path: "/dashboard/help",
    },
    { icon: <FaCommentDots />, label: "Feedback", path: "/dashboard/feedback" },
  ];

  //  Role-based menu rendering
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
  if (loading || !user?.email) {
    return <Loading />;
  }

  const logoutBtn = () => {
    logOut()
      .then(() => {
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Logout failed!");
      });
  };

  return (
    <div className="h-screen w-64 bg-[#71BBB2] text-[#083c3a] flex flex-col shadow-xl border-r border-[#9ad2cb] fixed md:static z-40">
      {/* Logo */}
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

      {/* Footer */}

      <div className="border-t cursor-pointer border-[#9ad2cb] bg-[#e6f6f5] p-4 flex items-center justify-between hover:bg-[#d9efed] transition-all duration-300">
        <button
          onClick={logoutBtn}
          className="w-full text-left flex items-center gap-2 cursor-pointer  font-semibold transition-colors duration-200 rounded-md px-2 py-1"
        >
          <IoMdLogOut className="text-lg" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
