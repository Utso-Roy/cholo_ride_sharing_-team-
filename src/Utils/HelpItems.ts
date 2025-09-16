// import { FaMotorcycle, FaCar, FaBus, FaShippingFast, FaAmbulance, FaSuitcaseRolling, FaSchool } from 'react-icons/fa';
// import { GiAutoRepair } from 'react-icons/gi';
// import { IconType } from 'react-icons';



// const helpItems: helpItem[] = [
//   { label: 'বাইক রাইড', icon: FaMotorcycle, color: '#FF6B6B' },
//   { label: 'কার রাইড', icon: FaCar, color: '#4ECDC4' },
//   { label: 'CNG / অটো রাইড', icon: GiAutoRepair, color: '#1A535C' },
//   { label: 'প্যাকেজ / পণ্য প্রেরণ', icon: FaShippingFast, color: '#FF9F1C' },
//   { label: 'মেডিকেল সার্ভিস / অ্যাম্বুলেন্স', icon: FaAmbulance, color: '#6A4C93' },
//   { label: 'জার্নি প্যাকেজ সিস্টেম', icon: FaSuitcaseRolling, color: '#1982C4' },
//   { label: 'স্কুল বাস সার্ভিস', icon: FaSchool, color: '#F72585' },
//   { label: 'শাটল সার্ভিস', icon: FaBus, color: '#FF5733' },
//   { label: 'ট্র্যাক সার্ভিস', icon: FaShippingFast, color: '#33C1FF' },
// ];

// export default helpItems;

import { FaPhone, FaBook, FaUserShield, FaRegFileAlt } from "react-icons/fa";

// interface helpItem {
//   label: string;
//   icon: IconType;
//   color: string;
// }
const helpItems = [
  { label: "সাধারণ জিজ্ঞাসা (FAQ)", icon: FaRegFileAlt, color: "#FF6B6B" },
  { label: "কাস্টমার কেয়ার", icon: FaPhone, color: "#4ECDC4" },
  { label: "ইউজার গাইড", icon: FaBook, color: "#1A535C" },
  { label: "ড্রাইভার গাইড", icon: FaBook, color: "#FF9F1C" },
  { label: "সেফটি ও প্রাইভেসি নীতিমালা", icon: FaUserShield, color: "#6A4C93" },
  { label: "অভিযোগ/প্রস্তাব দিন", icon: FaRegFileAlt, color: "#1982C4" },
  { label: "হেল্পলাইন : +০৩৮২৫৮৯৫৭৮৪", icon: null, color: "#27445D" },
];

export default helpItems;
