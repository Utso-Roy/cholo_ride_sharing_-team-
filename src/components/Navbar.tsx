import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaMotorcycle, FaCarSide } from "react-icons/fa";
import { MdOutlineElectricRickshaw } from "react-icons/md";
import { NavLink, useLocation } from "react-router"; 
import serviceItems from "../Utils/ServiceItems/serviceItems";
import othersItems from "../Utils/ServiceItems/othersItems";
import { IconType } from "react-icons";
import {
  FaQuestionCircle,
  FaHeadset,
  FaBookOpen,
  FaUserTie,
  FaShieldAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { Button } from "primereact/button";

interface ServiceItem {
  label: string;
  icon: IconType;
  color: string;
}

interface OtherItem {
  label: string;
  icon: IconType;
  path: string;
  color: string;
}

const Navbar: React.FC = () => {
  const [openServices, setOpenServices] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpenServices(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#71BBB2]" : "hover:text-[#71BBB2] transition-colors";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          হোম
        </NavLink>
      </li>

      {/* Services */}
      <li className="relative">
        <button onClick={() => setOpenServices(!openServices)}>
          সার্ভিসসমূহ
          <HiChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              openServices ? "rotate-180" : ""
            }`}
          />
        </button>
        {openServices && (
          <div className="absolute left-0 top-full mt-2 w-96 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
            <div className="grid grid-cols-3 gap-4">
              {serviceItems.map((item: ServiceItem, index: number) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    style={{ color: item.color }}
                    onClick={() => setOpenServices(false)}
                  >
                    <Icon className="text-2xl" />
                    <div className="text-sm mt-1 text-center">{item.label}</div>
                  </a>
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
      <li>
        <details>
          <summary>আয় করুন</summary>
          <ul className="p-2 bg-[#fff] text-[#27445D]">
            <li>
              <NavLink to="/earn/bike">
                <FaMotorcycle /> বাইক
              </NavLink>
            </li>
            <li>
              <NavLink to="/earn/car">
                <FaCarSide /> কার
              </NavLink>
            </li>
            <li>
              <NavLink to="/earn/cng">
                <MdOutlineElectricRickshaw /> সিএনজি
              </NavLink>
            </li>
          </ul>
        </details>
      </li>

      {/* Others */}
      <li className="relative">
        <details>
          <summary>অনন্যা</summary>
          <ul className="p-2 bg-[#fff] text-[#27445D] w-72">
            {othersItems.map((item: OtherItem, index: number) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
                  >
                    <Icon /> {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </details>
      </li>

      {/* Help */}
      <li className="relative">
        <details>
          <summary>হেল্প</summary>
          <ul className="p-2 bg-[#fff] text-[#27445D] w-72">
            <li>
              <NavLink
                to="/faq"
                className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
              >
                <FaQuestionCircle /> FAQ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customercare"
                className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
              >
                <FaHeadset /> কাস্টমার কেয়ার
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/userguide"
                className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
              >
                <FaBookOpen /> ইউজার গাইড
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/driverguide"
                className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
              >
                <FaUserTie /> ড্রাইভার গাইড
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/safety-policy"
                className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
              >
                <FaShieldAlt /> সেফটি নীতিমালা
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/complaints"
                className="flex items-center gap-2 hover:text-[#71BBB2] transition-colors"
              >
                <FaRegCommentDots /> অভিযোগ দিন
              </NavLink>
            </li>
            <li className="text-sm mt-2">হেল্পলাইন: +০৩৮২৫৮৯৫৭৮৪</li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#27445D] sticky top-0 text-white shadow-md z-50">
      {/* Navbar Start */}
      <div className="navbar-start">

        <NavLink to="/" className="cursor-pointer text-xl font-bold text-white">
          চলো
        </NavLink>
        {/* Mobile dropdown */}
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost text-white lg:hidden"
          >
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
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-[#27445D] rounded-box w-60"
          >
            {links}
          </ul>
        </div>

        {/* Brand */}
        <NavLink to="/" className="btn btn-ghost text-xl text-white font-bold hidden lg:inline-flex">
          চলো

        </NavLink>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <NavLink to="/signup">
          <Button
            label="নিবন্ধন করুন"
            className="!bg-[#71BBB2] !text-white !border-none !px-4 !py-2 !rounded-md 
             hover:!bg-white hover:!text-[#71BBB2] !text-md transition-colors duration-300"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
