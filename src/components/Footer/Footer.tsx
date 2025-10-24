import React, { useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { AuthContext } from "../../Auth/AuthProvider";

const Footer: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user?.email) return null;

  return (
    <footer className="relative bg-gradient-to-r from-[#0D5EA6] to-[#71BBB2] text-white">
      {/* Overlay for subtle glass effect */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Column 1: Branding */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">ACME Industries</h3>
          <p className="text-gray-100/90 text-sm">
            Providing reliable tech solutions since 1992. We help your business grow.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <IoLogoYoutube />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Services</h4>
          <ul className="space-y-2 text-gray-100/90">
            <li className="hover:text-white transition-colors cursor-pointer">Branding</li>
            <li className="hover:text-white transition-colors cursor-pointer">Design</li>
            <li className="hover:text-white transition-colors cursor-pointer">Marketing</li>
            <li className="hover:text-white transition-colors cursor-pointer">Advertisement</li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Company</h4>
          <ul className="space-y-2 text-gray-100/90">
            <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            <li className="hover:text-white transition-colors cursor-pointer">Jobs</li>
            <li className="hover:text-white transition-colors cursor-pointer">Press Kit</li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Legal</h4>
          <ul className="space-y-2 text-gray-100/90">
            <li className="hover:text-white transition-colors cursor-pointer">Terms of Use</li>
            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white transition-colors cursor-pointer">Cookie Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 text-center text-gray-100/80 text-sm">
        &copy; {new Date().getFullYear()} ACME Industries. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
