import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import serviceItems from "../Utils/ServiceItems/serviceItems";

const Navbar = () => {
  const [openServices, setOpenServices] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openCompany, setOpenCompany] = useState(false); 

  const links = (
    <>
      <li className="hover:text-[#71BBB2] transition-colors duration-300">
        <a href="#">হোম</a>
      </li>

      {/* সার্ভিসসমূহ */}
      <li className="relative">
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
          <div className="absolute left-0 top-full mt-2 w-96 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
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

      {/* ব্লগ */}
      <li className="hover:text-[#71BBB2] transition-colors duration-300">
        <a href="#">ব্লগ</a>
      </li>

      {/* অনন্যা Dropdown */}
      <li className="relative">
        <button
          onClick={() => setOpenCompany(!openCompany)}
          className="flex items-center gap-1 cursor-pointer hover:text-[#71BBB2] transition-colors duration-300"
        >
          অনন্যা
          <HiChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              openCompany ? "rotate-180" : ""
            }`}
          />
        </button>

        {openCompany && (
          <div className="absolute left-0 top-full mt-2 w-72 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
            <ul className="flex flex-col gap-2">
              <li className="hover:text-[#71BBB2] cursor-pointer">
                ℹ️ আমাদের সম্পর্কে
              </li>
              <li className="hover:text-[#71BBB2] cursor-pointer">
                👨‍💻 ক্যারিয়ার
              </li>
              <li className="hover:text-[#71BBB2] cursor-pointer">
                📜 শর্তাবলী ও প্রাইভেসি পলিসি
              </li>
              <li className="hover:text-[#71BBB2] cursor-pointer">
                🤝 পার্টনারশিপ
              </li>
              <li className="hover:text-[#71BBB2] cursor-pointer">
                🌍 সামাজিক কার্যক্রম
              </li>
            </ul>
          </div>
        )}
      </li>

      {/* হেল্প Dropdown */}
      <li className="relative">
        <button
          onClick={() => setOpenHelp(!openHelp)}
          className="flex items-center gap-1 cursor-pointer hover:text-[#71BBB2] transition-colors duration-300"
        >
          হেল্প
          <HiChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              openHelp ? "rotate-180" : ""
            }`}
          />
        </button>

        {openHelp && (
          <div className="absolute left-0 top-full mt-2 w-64 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50">
            <ul className="flex flex-col gap-2">
              <li className=" hover:text-[#71BBB2] cursor-pointer">
                সাধারণ জিজ্ঞাসা (FAQ)
              </li>
              <li className=" hover:text-[#71BBB2] cursor-pointer">
                কাস্টমার কেয়ার
              </li>
              <li className=" hover:text-[#71BBB2] cursor-pointer">
                ইউজার গাইড
              </li>
              <li className=" hover:text-[#71BBB2] cursor-pointer">
                ড্রাইভার গাইড
              </li>
              <li className=" hover:text-[#71BBB2] cursor-pointer">
                সেফটি ও প্রাইভেসি নীতিমালা
              </li>
              <li className=" hover:text-[#71BBB2] cursor-pointer">
                 অভিযোগ/প্রস্তাব দিন
              </li>
              <li className="text-sm mt-2">হেল্পলাইন : +০৩৮২৫৮৯৫৭৮৪</li>
            </ul>
          </div>
        )}
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
