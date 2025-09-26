import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  FaMotorcycle,
  FaCarSide,
  FaQuestionCircle,
  FaHeadset,
  FaBookOpen,
  FaUserTie,
  FaShieldAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { MdOutlineElectricRickshaw } from "react-icons/md";
import { NavLink, useLocation } from "react-router";
import { Button } from "primereact/button";
import serviceItems from "../Utils/ServiceItems/serviceItems";
import othersItems from "../Utils/ServiceItems/othersItems";
import { IconType } from "react-icons";

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
    `flex items-center gap-1 cursor-pointer transition-colors duration-300 ${
      isOpen ? "text-[#71BBB2]" : "text-white hover:text-[#71BBB2]"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          হোম
        </NavLink>
      </li>

      {/* Services */}
      <li className="relative">
        <button
          onClick={() => setOpenServices(!openServices)}
          className={getDropdownClass(openServices)}
        >
          সার্ভিসসমূহ
          <HiChevronDown
            className={`w-4 h-4 transition-transform ${openServices ? "rotate-180" : ""}`}
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
                      `flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${
                        isActive ? "bg-gray-200 font-semibold" : ""
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
            className={`w-4 h-4 transition-transform ${openEarn ? "rotate-180" : ""}`}
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
            className={`w-4 h-4 transition-transform ${openCompany ? "rotate-180" : ""}`}
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
            className={`w-4 h-4 transition-transform ${openHelp ? "rotate-180" : ""}`}
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
                <NavLink to="/customercare" className="hover:text-[#71BBB2] block">
                  কাস্টমার কেয়ার
                </NavLink>
              </li>
              <li>
                <NavLink to="/userguide" className="hover:text-[#71BBB2] block">
                  ইউজার গাইড
                </NavLink>
              </li>
              <li>
                <NavLink to="/driverguide" className="hover:text-[#71BBB2] block">
                  ড্রাইভার গাইড
                </NavLink>
              </li>
              <li>
                <NavLink to="/safety-policy" className="hover:text-[#71BBB2] block">
                  সেফটি ও প্রাইভেসি নীতিমালা
                </NavLink>
              </li>
              <li>
                <NavLink to="/complaints" className="hover:text-[#71BBB2] block">
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

  return (
    <div className="navbar bg-[#27445D] sticky top-0 text-white shadow-md z-50">
      <div className="navbar-start flex items-center gap-4">
        <NavLink to="/" className="text-xl font-bold">
          চলো
        </NavLink>

        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-[#27445D] rounded-box w-60">
            {links}
          </ul>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      <div className="navbar-end">
        <NavLink to="/signup">
          <Button
            label="নিবন্ধন করুন"
            className="!bg-[#71BBB2] !text-white !border-none !px-4 !py-2 !rounded-md hover:!bg-white hover:!text-[#71BBB2]"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
