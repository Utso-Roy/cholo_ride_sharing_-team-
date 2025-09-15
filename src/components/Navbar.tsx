import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  FaMotorcycle,
  FaCar,
  FaUsers,
  FaBus,
  FaShippingFast,
  FaAmbulance,
  FaSuitcaseRolling,
  FaSchool,
} from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import serviceItems from "../Utils/ServiceItems/serviceItems";
const Navbar = () => {
  const [openServices, setOpenServices] = useState(false);

  const links = (
    <>
      <li className="hover:text-[#71BBB2] transition-colors duration-300">
        <a href="#">হোম</a>
      </li>

      <li className="relative">
        {/* Clickable Dropdown */}
        <button
          onClick={() => setOpenServices(!openServices)}
          className="flex items-center gap-1 cursor-pointer hover:text-[#71BBB2] transition-colors duration-300"
        >
          সার্ভিসসমূহ
          <HiChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              openServices ? "rotate-180" : ""
            }`}
          />
        </button>

        {openServices && (
          <div className="absolute left-0 top-full mt-2 w-96 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50 transition-all duration-300">
            <div className="grid grid-cols-3 gap-4">
              {serviceItems.map((item, index) => {
                const Icon = item.icon; 
                return (
                  <a
                    key={index}
                    href="#"
                    className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    style={{ color: item.color }}
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

      <li className="hover:text-[#71BBB2] transition-colors duration-300">
        <a href="#">যোগাযোগ</a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#27445D] sticky top-0 text-white shadow-md z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        <a className="cursor-pointer text-xl font-bold text-white">যাত্রী</a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <a className="btn bg-[#71BBB2] hover:bg-[#5AA29F] text-white border-none">
          Booking
        </a>
      </div>
    </div>
  );
};

export default Navbar;
