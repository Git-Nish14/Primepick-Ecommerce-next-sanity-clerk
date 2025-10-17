"use client";

import React from "react";
import { FaArrowUp, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link
                href="/"
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/pplogo.png"
                  alt="PrimePick Logo"
                  width={150}
                  height={150}
                  className="h-24 w-auto lg:h-32"
                  priority
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted destination for quality products and exceptional
                service. Shop with confidence.
              </p>
              <div className="flex space-x-4 pt-2">
                <Link
                  href="https://github.com/Git-Nish14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/nishpatel14/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </Link>
                <Link
                  href="mailto:Nishpatel.cse@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope size={24} />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Home
                </Link>
                <Link
                  href="/basket"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Shopping Cart
                </Link>
                <Link
                  href="/orders"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  My Orders
                </Link>
              </nav>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
              <div className="space-y-3">
                <Link
                  href="mailto:Nishpatel.cse@gmail.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors text-sm group"
                >
                  <FaEnvelope className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Nishpatel.cse@gmail.com</span>
                </Link>
                <p className="text-gray-400 text-sm">
                  Built with passion by Nish Patel
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} PrimePick by Nish Patel. All
              rights reserved.
            </p>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="group bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <FaArrowUp
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
