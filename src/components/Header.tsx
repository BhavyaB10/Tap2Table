"use client";

import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo2 from "../logo2.png";
import { headerItems } from "@/constants/constants";

export const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/10 backdrop-blur-lg shadow-lg p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-2">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3">
          <Image
            className="rounded-3xl drop-shadow-lg"
            src={logo2}
            alt="Tap2Table Logo"
            width={80}
            height={80}
          />
          <h1 className="text-white text-3xl font-extrabold tracking-wide">
            Tap<span className="text-yellow-400">2</span>Table
          </h1>
        </div>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex space-x-10 text-white text-lg font-medium">
          {headerItems.map((item) => (
            <ScrollLink
              key={item.page}
              to={item.page}
              smooth={true}
              duration={500}
              className="relative cursor-pointer hover:text-yellow-400 transition-all"
            >
              {item.label}
              <motion.span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 origin-left transition-transform duration-300"
                whileHover={{ scaleX: 1 }}
              />
            </ScrollLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="md:hidden p-2 rounded-full bg-gray-800/70 backdrop-blur-lg"
        >
          {navOpen ? (
            <BiX size={30} className="text-white" />
          ) : (
            <BiMenu size={30} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation (Dropdown) */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-900/90 text-white text-center p-6 shadow-lg rounded-b-lg"
          >
            {headerItems.map((item) => (
              <ScrollLink
                key={item.page}
                to={item.page}
                smooth={true}
                duration={500}
                className="block py-3 text-lg hover:text-yellow-400 transition-all"
                onClick={() => setNavOpen(false)} // Close menu after clicking
              >
                {item.label}
              </ScrollLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
