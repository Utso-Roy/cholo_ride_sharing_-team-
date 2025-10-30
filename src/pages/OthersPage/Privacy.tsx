import React, { useState } from "react";
import { FaMapMarkedAlt, FaUsers, FaShieldAlt, FaBolt, FaKey, FaHandshake } from "react-icons/fa";
import { InputSwitch } from "primereact/inputswitch";
import { Checkbox } from "primereact/checkbox"; // Added for more granular settings

// Define the structure for granular settings
interface PrivacySettings {
  dataSharing: boolean;
  marketingEmails: boolean;
  anonymousData: boolean;
}

const Privacy: React.FC = () => {
  const [privacyEnabled, setPrivacyEnabled] = useState(true); // Main toggle for location/basic privacy
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  // State for granular privacy settings
  const [granularSettings, setGranularSettings] = useState<PrivacySettings>({
    dataSharing: false, // Default: no third-party sharing
    marketingEmails: true, // Default: receive marketing emails
    anonymousData: true, // Default: allow anonymous data collection
  });

  const features = [
    {
      id: 1,
      title: "Live Tracking",
      icon: <FaMapMarkedAlt className="w-10 h-10 text-[#71BBB2]" />,
      desc: "রাইডের লাইভ লোকেশন দেখতে পারবেন রিয়েল টাইমে।",
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
      desc: "আপনার তথ্য এবং যাত্রা সবসময় নিরাপদ।",
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

  // Handler for granular settings checkboxes
  const handleGranularChange = (key: keyof PrivacySettings, value: boolean) => {
    setGranularSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div 
      className="bg-cover bg-center min-h-screen bg-no-repeat bg-fixed"
      style={{
          // Added a brighter overlay to the background image for better readability
          backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.9), rgba(249,250,251,0.9)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backgroundBlendMode: "overlay",
      }}
    >
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
            গোপনীয়তা ও নিরাপত্তা সেটিংস
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl px-6  mx-auto text-center">
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

    
      <section className="py-16 bg-white/80 shadow-inner">
        <div className="max-w-4xl px-6 mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#27445D] mb-4">
            সাধারণ প্রাইভেসি সেটিংস
          </h2>
          <p className="text-gray-600 mb-6">
            আপনি চাইলে আপনার লোকেশন এবং যাত্রার তথ্য শেয়ার করতে পারেন বা বন্ধ
            রাখতে পারেন।
          </p>

          <div className="flex justify-center items-center gap-4 p-4 border [#71BBB2] rounded-xl w-fit mx-auto bg-white shadow-md">
            <span className="text-xl text-gray-700  font-semibold">
              Location Sharing: {privacyEnabled ? "ON" : "OFF"}
            </span>
            <InputSwitch
              checked={privacyEnabled}
              onChange={(e) => handleToggle(e.value)}
            />
          </div>

          {location && (
            <p className="mt-4 text-sm text-green-600 font-medium">
               আপনার বর্তমান লোকেশন: **Lat: {location.lat}, Lng: {location.lng}**
            </p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl px-6 mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#27445D] mb-4">
            🔑 বিস্তারিত সেটিংস ম্যানেজমেন্ট
          </h2>
          <p className="text-gray-600 text-center mb-10">
            আপনার ডেটা ব্যবহারের ওপর আরও নিয়ন্ত্রণ রাখুন। প্রতিটি অপশন প্রয়োজন
            অনুযায়ী পরিবর্তন করুন।
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl space-y-6">
            
          
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <FaHandshake className="text-2xl text-red-500" />
                <label htmlFor="dataSharing" className="text-lg font-semibold text-gray-800 cursor-pointer">
                  থার্ড-পার্টির সাথে ডেটা শেয়ারিং
                </label>
              </div>
              <Checkbox
                inputId="dataSharing"
                checked={granularSettings.dataSharing}
                onChange={(e) => handleGranularChange("dataSharing", e.checked)}
                className="p-checkbox-box-lg"
              />
            </div>
            <p className="text-sm text-gray-500 -mt-2">
              (বন্ধ রাখলে কোনো বিজ্ঞাপন বা অন্য কোম্পানির সাথে আপনার ব্যক্তিগত তথ্য শেয়ার করা হবে না)
            </p>

            
            <div className="flex items-center justify-between border-b pb-4 pt-4">
              <div className="flex items-center space-x-3">
                <FaBolt className="text-2xl text-yellow-600" />
                <label htmlFor="marketingEmails" className="text-lg font-semibold text-gray-800 cursor-pointer">
                  মার্কেটিং ইমেল ও অফার গ্রহণ
                </label>
              </div>
              <Checkbox
                inputId="marketingEmails"
                checked={granularSettings.marketingEmails}
                onChange={(e) => handleGranularChange("marketingEmails", e.checked)}
                className="p-checkbox-box-lg"
              />
            </div>

            {/* Anonymous Data Checkbox */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-3">
                <FaKey className="text-2xl text-green-600" />
                <label htmlFor="anonymousData" className="text-lg font-semibold text-gray-800 cursor-pointer">
                  অনামিক ডেটা কালেকশন (পরিষেবা উন্নত করার জন্য)
                </label>
              </div>
              <Checkbox
                inputId="anonymousData"
                checked={granularSettings.anonymousData}
                onChange={(e) => handleGranularChange("anonymousData", e.checked)}
                className="p-checkbox-box-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <hr className="max-w-4xl mx-auto border-t border-gray-300 my-8" />
      
      
      <section className="py-16 bg-white/80 shadow-inner">
        <div className="max-w-4xl px-6 mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#27445D] mb-4">
            📜 ডেটা ব্যবহার নীতি সারসংক্ষেপ
          </h2>
          <p className="text-gray-600 text-center mb-10">
            আমরা আপনার তথ্য কিভাবে ব্যবহার করি তার একটি দ্রুত সারসংক্ষেপ:
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-800 mb-2">নিরাপত্তা</h3>
              <p className="text-sm text-gray-700">জরুরী অবস্থায় এবং ড্রাইভার ভেরিফিকেশনের জন্য তথ্য ব্যবহৃত হয়।</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-800 mb-2">পরিষেবা</h3>
              <p className="text-sm text-gray-700">রাইড বুকিং, পেমেন্ট এবং কাস্টমার সাপোর্টের জন্য প্রয়োজন।</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">উন্নতি</h3>
              <p className="text-sm text-gray-700">অনামিক ডেটা ব্যবহার করে অ্যাপের পারফরম্যান্স উন্নত করা হয়।</p>
            </div>
          </div>
          <p className="text-center mt-8">
             <a href="#" className="text-[#71BBB2] hover:text-[#5fa297] font-bold underline">সম্পূর্ণ প্রাইভেসি পলিসি পড়ুন</a>
          </p>
        </div>
      </section>

    </div>
  );
};

export default Privacy;