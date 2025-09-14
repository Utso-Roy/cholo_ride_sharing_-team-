import React from 'react';
import { HiChevronDown } from 'react-icons/hi';

const Navbar = () => {
  const links = (
    <>
      <li><a>Home</a></li>

      <li className="relative group">
        <a className="flex items-center gap-1 cursor-pointer">
         Services
          <HiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
        </a>
        {/* Submenu */}
        <ul className="absolute left-0 top-full mt-2 hidden w-40 rounded-md bg-base-100 p-2 shadow-md group-hover:block z-20">
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul>
      </li>

      <li><a>Contactfirebase.config.js</a></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
