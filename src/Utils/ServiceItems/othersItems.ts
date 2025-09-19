// src/data/othersItems.ts
import { IconType } from "react-icons";
import { FaInfoCircle, FaUserTie, FaHandshake, FaGlobe } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";

interface OthersItem {
  label: string;
  path: string;
  icon: IconType;
  color: string;
}

const othersItems: OthersItem[] = [
  {
    label: "আমাদের সম্পর্কে",
    path: "/aboutUs",
    icon: FaInfoCircle,
    color: "#4ECDC4",
  },
  {
    label: "ক্যারিয়ার",
    path: "/career",
    icon: FaUserTie,
    color: "#FF6B6B",
  },
  {
    label: "শর্তাবলী ও প্রাইভেসি পলিসি",
    path: "/policy",
    icon: MdPolicy,
    color: "#1A535C",
  },
  {
    label: "পার্টনারশিপ",
    path: "/partnership",
    icon: FaHandshake,
    color: "#FF9F1C",
  },
  {
    label: "সামাজিক কার্যক্রম",
    path: "/social",
    icon: FaGlobe,
    color: "#6A4C93",
  },
];

export default othersItems;
