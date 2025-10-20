import { 
  FaMotorcycle, FaCar, FaTruck, FaShuttleVan, 
  FaAmbulance, FaBoxOpen, FaMapMarkedAlt, FaTaxi 
} from "react-icons/fa";

const services = [
  {
    icon: <FaMotorcycle className="text-4xl text-[#71BBB2]" />,
    title: "বাইক রাইড",
    desc: "দ্রুত ও সাশ্রয়ী একক যাত্রার জন্য।"
  },
  {
    icon: <FaTaxi className="text-4xl text-[#71BBB2]" />,
    title: "CNG / অটো রাইড",
    desc: "স্বল্প দূরত্বে আরামদায়ক ভ্রমণ।"
  },
  {
    icon: <FaCar className="text-4xl text-[#71BBB2]" />,
    title: "কার রাইড",
    desc: "পরিবার বা গ্রুপের জন্য স্বাচ্ছন্দ্যময় যাত্রা।"
  },
  {
    icon: <FaTruck className="text-4xl text-[#71BBB2]" />,
    title: "ট্র্যাক সার্ভিস",
    desc: "পণ্য পরিবহন ও বড় লোড বহন সেবা।"
  },
  {
    icon: <FaShuttleVan className="text-4xl text-[#71BBB2]" />,
    title: "শাটল সার্ভিস",
    desc: "নির্দিষ্ট রুটে নিয়মিত যাতায়াতের সুবিধা।"
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-[#71BBB2]" />,
    title: "ভ্রমণ প্যাকেজ সিস্টেম",
    desc: "দিন/ঘণ্টা ভিত্তিক প্যাকেজ রাইড সুবিধা।"
  },
  {
    icon: <FaAmbulance className="text-4xl text-[#71BBB2]" />,
    title: "মেডিকেল সার্ভিস / অ্যাম্বুলেন্স",
    desc: "জরুরি অবস্থায় দ্রুত চিকিৎসা পরিবহন।"
  },
  {
    icon: <FaBoxOpen className="text-4xl text-[#71BBB2]" />,
    title: "প্যাকেজ / পণ্য প্রেরণ",
    desc: "নিরাপদ ও দ্রুত পার্সেল ডেলিভারি সেবা।"
  },
];

const OurServices = () => {
  return (
    <section className="py-16  bg-gradient-to-r from-[#e6fcf9] to-gray-50">
      <div className=" px-6 text-center">
        <h2 className="text-4xl font-bold text-[#27445D] mb-10">
          আমাদের সার্ভিসসমূহ
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 shadow hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
