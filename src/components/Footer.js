import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdOutlineMailOutline, MdLocationOn, MdPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-t from-slate-300 to-slate-100 py-10 mt-10 shadow-inner">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Explore Our Products */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Explore Our Products
          </h3>
          <ul className="space-y-2 text-gray-700">
            {[
              { name: "Camera", category: "camera" },
              { name: "Airpodes", category: "airpodes" },
              { name: "Mobile", category: "mobiles" },
              { name: "Printers", category: "printers" },
            ].map((item) => (
              <li
                key={item.category}
                onClick={() => navigate(`/product-category?category=${item.category}`)}
                className="hover:text-red-600 hover:translate-x-1 transition-all duration-200 cursor-pointer"
              >
                • {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Join Us On Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Join Us On
          </h3>
          <div className="flex space-x-5 mt-2">
            <a
              href="#"
              className="bg-blue-600 text-white p-2.5 rounded-full hover:scale-110 hover:bg-blue-700 shadow-md transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="bg-pink-500 text-white p-2.5 rounded-full hover:scale-110 hover:bg-pink-600 shadow-md transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="bg-blue-400 text-white p-2.5 rounded-full hover:scale-110 hover:bg-blue-500 shadow-md transition"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Contact Us
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <MdOutlineMailOutline className="text-red-600" />
              <span className="hover:text-red-600 cursor-pointer">
                info@example.com
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-red-600" />
              <span>123 Main Street, City, Country</span>
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-red-600" />
              <span>+91 9876543210</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-8 mx-auto w-4/5"></div>

      {/* Bottom Text */}
      <div className="text-center text-gray-600 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-slate-800">Rupesh Thakur</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
