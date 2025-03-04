"use client";

import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gray-100 text-blue-600 p-5 text-sm">
      {/* 
        Wrap all footer content in an extra <div>. 
        This <div> is the flex container controlling responsiveness.
      */}
      <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap gap-3">
        {/* Left: Copyright */}
        <p className="text-xs sm:text-sm text-center sm:text-left w-full sm:w-auto">
          &copy; {new Date().getFullYear()} Nish Patel. All rights reserved.
        </p>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 w-full sm:w-auto">
          <a className="hover:underline">Nishpatel.cse@gmail.com</a>
          <a href="https://github.com/Git-Nish14" className="hover:underline">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/nishpatel14/"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>

        {/* Right: Scroll-to-Top Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <button
            onClick={scrollToTop}
            className="bg-blue-500 text-white p-2 rounded-full 
                       shadow-md hover:bg-blue-600 transition"
          >
            <FaArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
