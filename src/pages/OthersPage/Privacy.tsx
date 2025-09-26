import React, { useState } from "react";
import { FaMapMarkedAlt, FaUsers, FaShieldAlt, FaBolt } from "react-icons/fa";
import { InputSwitch } from "primereact/inputswitch";

const Privacy: React.FC = () => {
  const [privacyEnabled, setPrivacyEnabled] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const features = [
    {
      id: 1,
      title: "Live Tracking",
      icon: <FaMapMarkedAlt className="w-10 h-10 text-[#71BBB2]" />,
      desc: "রাইডের লাইভ লোকেশন দেখতে পারবেন রিয়েল টাইমে।",
    },
    {
      id: 2,
      title: "Carpool Options",
      icon: <FaUsers className="w-10 h-10 text-[#71BBB2]" />,
      desc: "সহযোগী যাত্রার মাধ্যমে খরচ ও পরিবেশ বাঁচান।",
    },
    {
      id: 3,
      title: "Privacy & Safety",
      icon: <FaShieldAlt className="w-10 h-10 text-[#71BBB2]" />,
      desc: "আপনার তথ্য এবং যাত্রা সবসময় নিরাপদ।",
    },
    {
      id: 4,
      title: "Fast Booking",
      icon: <FaBolt className="w-10 h-10 text-[#71BBB2]" />,
      desc: "দ্রুত এবং সহজ বুকিং সুবিধা।",
    },
  ];

  
  const handleToggle = (value: boolean) => {
    setPrivacyEnabled(value);

    if (value) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setLocation(coords);
            console.log("Location Enabled:", coords);
          },
          (err) => {
            console.error("Location access denied:", err.message);
          }
        );
      } else {
        console.error("Geolocation not supported in this browser.");
      }
    } else {
    
      setLocation(null);
      console.log("Location Disabled");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0faf8]">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <img
          src="https://i.ibb.co/Wjm36Qg/1140-phone-call-an-uber2.png"
          alt="Privacy & Safety"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            গোপনীয়তা ও নিরাপত্তা সেটিংস
          </h1>
          <p className="text-lg md:text-xl mb-6">
            আপনার যাত্রা নিরাপদ ও তথ্য সুরক্ষিত রাখুন।
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center text-[#27445D] mb-10">
          আমাদের সুবিধাসমূহ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-full px-6  mx-auto text-center">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition hover:-translate-y-1 cursor-pointer"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Toggle Section */}
      <section className="py-16 bg-[#f0faf8]">
        <div className="w-full px-6 mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#27445D] mb-4">
            প্রাইভেসি সেটিংস
          </h2>
          <p className="text-gray-600 mb-6">
            আপনি চাইলে আপনার লোকেশন এবং যাত্রার তথ্য শেয়ার করতে পারেন বা বন্ধ
            রাখতে পারেন।
          </p>

          <div className="flex justify-center items-center gap-4">
            <span className="text-gray-700 font-medium">
              Privacy {privacyEnabled ? "On" : "Off"}
            </span>
            <InputSwitch
              checked={privacyEnabled}
              onChange={(e) => handleToggle(e.value)}
            />
          </div>

          {location && (
            <p className="mt-4 text-sm text-green-600">
               আপনার বর্তমান লোকেশন: {location.lat}, {location.lng}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Privacy;
