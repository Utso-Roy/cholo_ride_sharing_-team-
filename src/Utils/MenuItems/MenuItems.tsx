// import React, { useState } from "react";
// import { HiChevronDown } from "react-icons/hi";
// import serviceItems from "../ServiceItems/serviceItems";
// import Navbar from "../../components/Navbar";

// const MenuItems = () => {
//   const [openServices, setOpenServices] = useState(false);

//   const links = (
//     <>
//       <li className="hover:text-[#71BBB2] transition-colors duration-300">
//         <a href="#">হোম</a>
//       </li>

//       <li className="relative">
//         <button
//           onClick={() => setOpenServices(!openServices)}
//           className="flex items-center gap-1 cursor-pointer hover:text-[#71BBB2] transition-colors duration-300"
//         >
//           সার্ভিসসমূহ
//           <HiChevronDown
//             className={`w-4 h-4 transition-transform duration-300 ${
//               openServices ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {openServices && (
//           <div className="absolute left-0 top-full mt-2 w-96 rounded-md bg-white text-[#27445D] p-4 shadow-lg z-50 transition-all duration-300">
//             <div className="grid grid-cols-3 gap-4">
//               {serviceItems.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <a
//                     key={index}
//                     href="#"
//                     className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
//                     style={{ color: item.color }}
//                   >
//                     <Icon className="text-2xl" />
//                     <div className="text-sm mt-1 text-center">{item.label}</div>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </li>

//       <li className="hover:text-[#71BBB2] transition-colors duration-300">
//         <a href="#">যোগাযোগ</a>
//       </li>
//     </>
//   );

//   return links
// };

// export default MenuItems;
