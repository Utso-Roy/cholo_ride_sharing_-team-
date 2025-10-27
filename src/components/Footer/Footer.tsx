import React, { useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { AuthContext } from "../../Auth/AuthProvider";

const Footer: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user?.email) return null;

  return (
    <footer className="relative bg-gradient-to-br from-[#1E3A8A] via-[#19379a] to-[#1E3A8A] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Overlay for glass effect */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Branding Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="flex items-center text-2xl lg:text-3xl font-bold gap-2">
              চলো
              <img
                className="w-16 h-8 lg:w-20 lg:h-10 object-contain"
                src="https://i.ibb.co/JjNCs1G1/logo-2.png"
                alt="Cholo Logo"
              />
            </h3>
            <p className="text-gray-100 text-sm lg:text-base leading-relaxed max-w-xs">
              বিশ্বস্ত রাইড শেয়ারিং সেবা ২০২৫ থেকে। আমাদের সাথে ভ্রমণ আরও নিরাপদ এবং সহজ।
            </p>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-500 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-sky-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
              >
                <IoLogoYoutube className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>

          {/* সেবা সমূহ */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg lg:text-xl mb-4 pb-2 border-b border-white/20">সেবা সমূহ</h4>
            <ul className="space-y-2.5">
              {['বাইক', 'অটো', 'কার', 'ট্রাক', 'শাটল', 'ভ্রমণ প্যাকেজ', 'অ্যাম্বুলেন্স'].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-100 text-sm lg:text-base hover:text-white hover:translate-x-1 inline-block transition-all duration-200 hover:underline underline-offset-4"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* কোম্পানি */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg lg:text-xl mb-4 pb-2 border-b border-white/20">কোম্পানি</h4>
            <ul className="space-y-2.5">
              {['আমাদের সম্পর্কে', 'যোগাযোগ', 'চাকরি', 'প্রেস কিট'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-100 text-sm lg:text-base hover:text-white hover:translate-x-1 inline-block transition-all duration-200 hover:underline underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* আইন ও শর্তাবলী */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg lg:text-xl mb-4 pb-2 border-b border-white/20">আইন ও শর্তাবলী</h4>
            <ul className="space-y-2.5">
              {['ব্যবহারের শর্তাবলী', 'গোপনীয়তা নীতি', 'কুকি নীতি'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-100 text-sm lg:text-base hover:text-white hover:translate-x-1 inline-block transition-all duration-200 hover:underline underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-200 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} চলো রাইড শেয়ারিং। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-200">
            <a href="#" className="hover:text-white transition-colors">শর্তাবলী</a>
            <span className="text-white/30">|</span>
            <a href="#" className="hover:text-white transition-colors">গোপনীয়তা</a>
            <span className="text-white/30">|</span>
            <a href="#" className="hover:text-white transition-colors">সাহায্য</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;