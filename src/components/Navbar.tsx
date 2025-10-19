import React, { useState, useEffect, useContext } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaMotorcycle, FaCarSide } from "react-icons/fa";
import { MdDashboard, MdOutlineElectricRickshaw } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import serviceItems from "../Utils/ServiceItems/serviceItems";
import othersItems from "../Utils/ServiceItems/othersItems";
import { IconType } from "react-icons";
import { AuthContext } from "../Auth/AuthProvider";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";
interface ServiceItem {
  label: string;
  icon: IconType;
  color: string;
  path: string;
}

interface OtherItem {
  label: string;
  icon: IconType;
  path: string;
  color: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logOut, setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const [openServices, setOpenServices] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openEarn, setOpenEarn] = useState(false);

  useEffect(() => {
    setOpenServices(false);
    setOpenHelp(false);
    setOpenCompany(false);
    setOpenEarn(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#71BBB2]" : "hover:text-[#71BBB2] transition-colors";

  const getDropdownClass = (isOpen: boolean) =>
    `flex items-center gap-1 cursor-pointer transition-colors duration-300 ${isOpen ? "text-[#71BBB2]" : "text-black hover:text-[#71BBB2]"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/home" className={navLinkClass}>
          হোম
        </NavLink>
      </li>

      {/* Services */}
      <li className="relative ">
        <button
          onClick={() => setOpenServices(!openServices)}
          className={getDropdownClass(openServices)}
        >
          সার্ভিসসমূহ
          <HiChevronDown
            className={`w-4 h-4 transition-transform ${openServices ? "rotate-180" : ""
              }`}
          />
        </button>
        {openServices && (
          <div className="absolute left-0 top-full mt-2 w-96 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
            <div className="grid grid-cols-3 gap-4">
              {serviceItems.map((item: ServiceItem, idx: number) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={idx}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${isActive ? "bg-gray-200 font-semibold" : ""
                      }`
                    }
                    style={{ color: item.color }}
                    onClick={() => setOpenServices(false)}
                  >
                    <Icon className="text-2xl" />
                    <div className="text-sm mt-1 text-center">{item.label}</div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </li>

      <li>
        <NavLink to="/blogs" className={navLinkClass}>
          ব্লগ
        </NavLink>
      </li>

      {/* Earn */}
      <li className="relative">
        <button
          onClick={() => setOpenEarn(!openEarn)}
          className={getDropdownClass(openEarn)}
        >
          আয় করুন
          <HiChevronDown
            className={`w-4 h-4 transition-transform ${openEarn ? "rotate-180" : ""
              }`}
          />
        </button>
        {openEarn && (
          <div className="absolute left-0 top-full mt-2 w-60 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink
                  to="/earn/bike"
                  className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
                  onClick={() => setOpenEarn(false)}
                >
                  <FaMotorcycle /> বাইক রাইড
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/earn/car"
                  className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
                  onClick={() => setOpenEarn(false)}
                >
                  <FaCarSide /> কার রাইড
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/earn/cng"
                  className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
                  onClick={() => setOpenEarn(false)}
                >
                  <MdOutlineElectricRickshaw /> সিএনজি রাইড
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </li>

      {/* Others */}
      <li className="relative">
        <button
          onClick={() => setOpenCompany(!openCompany)}
          className={getDropdownClass(openCompany)}
        >
          অনন্যা
          <HiChevronDown
            className={`w-4 h-4 transition-transform ${openCompany ? "rotate-180" : ""
              }`}
          />
        </button>
        {openCompany && (
          <ul className="absolute left-0 top-full mt-2 w-72 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50 flex flex-col gap-2">
            {othersItems.map((item: OtherItem, idx: number) => {
              const Icon = item.icon;
              return (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-2 hover:text-[#71BBB2] p-2 transition-colors duration-200"
                    style={{ color: item.color }}
                  >
                    <Icon size={18} /> {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </li>

      {/* Help */}
      <li className="relative">
        <button
          onClick={() => setOpenHelp(!openHelp)}
          className={getDropdownClass(openHelp)}
        >
          হেল্প
          <HiChevronDown
            className={`w-4 h-4 transition-transform ${openHelp ? "rotate-180" : ""
              }`}
          />
        </button>
        {openHelp && (
          <div className="absolute left-0 top-full mt-2 w-64 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink to="/faq" className="hover:text-[#71BBB2] block">
                  সাধারণ জিজ্ঞাসা (FAQ)
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customercare"
                  className="hover:text-[#71BBB2] block"
                >
                  কাস্টমার কেয়ার
                </NavLink>
              </li>
              <li>
                <NavLink to="/userguide" className="hover:text-[#71BBB2] block">
                  ইউজার গাইড
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/driverguide"
                  className="hover:text-[#71BBB2] block"
                >
                  ড্রাইভার গাইড
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/safety-policy"
                  className="hover:text-[#71BBB2] block"
                >
                  সেফটি ও প্রাইভেসি নীতিমালা
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/complaints"
                  className="hover:text-[#71BBB2] block"
                >
                  অভিযোগ/প্রস্তাব দিন
                </NavLink>
              </li>
              <li className="text-sm mt-2">হেল্পলাইন: +০৩৮২৫৮৯৫৭৮৪</li>
            </ul>
          </div>
        )}
      </li>
    </>
  );



  const logoutBtn = () => {

    logOut()
      .then(() => {
        setUser(null);
        navigate('/login')
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Logout failed!");
      });

  }

  return (
    <div className="navbar bg-gradient-to-r from-[#e6fcf9] via-gray-50 to-[#e6fcf9] backdrop-blur-lg  text-black ">
      {/* Navbar Start */}

      <div className="navbar-start flex items-center gap-4">
        <NavLink to="/" className="cursor-pointer text-xl font-bold">
          <div>
            <img className="md:w-26 md:h-10 w-15 object-contain h-8"  src="https://i.ibb.co.com/JjNCs1G1/logo-2.png" alt="Cholo" />
        </div>
        </NavLink>

        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-[#27445D] text-white rounded-box w-60"
          >
            {links}
          </ul>
        </div>




      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user && user?.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn   btn-ghost btn-circle avatar"
            >
              <div className="w-10 cursor-pointer rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user?.photoURL ||
                    "N/A"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 text-[#21BEDA] rounded-box w-52"
            >
              
              <li>
                <Link to="/dashboard" className="cursor-pointer  flex items-center gap-2 font-semibold transition-colors duration-200 rounded-md px-2 py-1">
                  <MdDashboard className="text-lg" /> Dashboard
                </Link>
              </li>

              <li>
                <button onClick={logoutBtn} className="w-full text-left flex items-center gap-2 cursor-pointer  font-semibold transition-colors duration-200 rounded-md px-2 py-1">
                  <IoMdLogOut className="text-lg" /> Logout
                </button>
              </li>
            </ul>
          </div>) : " "          
         

}
      </div>
    </div>
  );
};

export default Navbar;
