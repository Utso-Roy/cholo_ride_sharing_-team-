import React from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Car,
  Truck,
  Bus,
  Ambulance,
  Package,
  MapPin,
  Train,
} from "lucide-react";
import { Link } from "react-router";
import Container from "../../Container/Container";

const services = [
  { icon: Bike, title: "বাইক" ,path : '/bike'},
  { icon: Train, title: "অটো" ,path : '/cng'},
  { icon: Car, title: "কার",path : '/car' },
  { icon: Truck, title: "ট্রাক",path : '/track' },
  { icon: Bus, title: "শাটল",path : '/shuttlebus' },
  { icon: MapPin, title: "ভ্রমণ ",path : '/journeypackage' },
  { icon: Ambulance, title: "অ্যাম্বুলেন্স",path : '/ambulance' },
  { icon: Package, title: "প্যাকেজ",path : '/shipment' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const OurServices: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat border-t border-gray-100 py-16 md:py-20 "
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/MkSgJWYZ/service-2.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>

      <>
        <Container>
          

           <div className="relative z-10 w-full text-center">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-[#27445D] leading-snug md:leading-tight mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[#71BBB2]">চলো</span> প্ল্যাটফর্ম <br />
          আপনার যাত্রার জন্য{" "}
          <span className="decoration-[#71BBB2] decoration-4">
            সম্পূর্ণ সমাধান
          </span>
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-center items-center max-w-7xl mx-auto">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                }}
                className="group relative flex flex-col items-center justify-center gap-2 bg-white/98 backdrop-blur-md rounded-3xl p-6 cursor-pointer transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#71BBB2] via-[#5BA89E] to-[#71BBB2] animate-border-flow p-[3px]">
                    <div className="absolute inset-[3px] bg-white rounded-3xl"></div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[#71BBB2] blur-2xl"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <motion.div
                    className="text-[#71BBB2] group-hover:text-[#27445D] transition-colors duration-300"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent size={40} strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-[#27445D] group-hover:text-[#71BBB2] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Shine Effect */}
                <Link to= {service.path}>
                 <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      </Container>
      
      
      </>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-border-flow {
          background-size: 200% 200%;
          animation: border-flow 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default OurServices;