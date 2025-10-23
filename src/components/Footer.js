import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
   const navigate = useNavigate();
  return (
    <footer className="bg-slate-200 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Explore Our Products */}
        <div>
          <h3 className="font-bold text-lg mb-4">Explore Our Products</h3>
          <ul className="space-y-2">
            <li className="hover:text-red-600 cursor-pointer transition" onClick={()=>navigate(`/product-category?category=camera`)}>
              Camera
            </li>
            <li className="hover:text-red-600 cursor-pointer transition" onClick={()=>navigate(`/product-category?category=airpodes`)}>
              Airpodes
            </li>
            <li className="hover:text-red-600 cursor-pointer transition" onClick={()=>navigate(`/product-category?category=mobiles`)}>
              Mobile
            </li>
            <li className="hover:text-red-600 cursor-pointer transition" onClick={()=>navigate(`/product-category?category=printers`)}>
              Printers
            </li>
          </ul>
        </div>

        {/* Column 2: Join Us On Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">Join Us On</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-600 transition"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <p>
            Email:{" "}
            <span className="hover:text-red-600 cursor-pointer">
              info@example.com
            </span>
          </p>
          <p>Address: 123 Main Street, City, Country</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-gray-500 flex items-center justify-center gap-2">
        <span>©</span>
        <span>Rupesh Thakur. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
