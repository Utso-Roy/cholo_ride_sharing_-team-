import { FaMotorcycle, FaCar, FaBus, FaShippingFast, FaAmbulance, FaSuitcaseRolling, FaSchool } from 'react-icons/fa';
import { GiAutoRepair } from 'react-icons/gi';
import { IconType } from 'react-icons';

interface ServiceItem {
  label: string;
  icon: IconType;
  color: string;
}

const serviceItems: ServiceItem[] = [
  { label: 'বাইক রাইড', icon: FaMotorcycle, color: '#FF6B6B' },
  { label: 'কার রাইড', icon: FaCar, color: '#4ECDC4' },
  { label: 'CNG / অটো রাইড', icon: GiAutoRepair, color: '#1A535C' },
  { label: 'প্যাকেজ / পণ্য প্রেরণ', icon: FaShippingFast, color: '#FF9F1C' },
  { label: 'মেডিকেল সার্ভিস / অ্যাম্বুলেন্স', icon: FaAmbulance, color: '#6A4C93' },
  { label: 'জার্নি প্যাকেজ সিস্টেম', icon: FaSuitcaseRolling, color: '#1982C4' },
  { label: 'স্কুল বাস সার্ভিস', icon: FaSchool, color: '#F72585' },
  { label: 'শাটল সার্ভিস', icon: FaBus, color: '#FF5733' },
  { label: 'ট্র্যাক সার্ভিস', icon: FaShippingFast, color: '#33C1FF' },
];

export default serviceItems;
