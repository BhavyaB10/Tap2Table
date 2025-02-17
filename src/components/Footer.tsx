import { FaFacebook, FaInstagram } from "react-icons/fa";

export const Footer = () => (
  <footer className=" bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center shadow-lg">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      {/* Branding */}
      <div className="flex items-center space-x-3 mb-4 mt-4 md:mb-0 flex-col">
        <h1 className="text-2xl font-bold tracking-wide">
          Tap<span className="text-yellow-300">2</span>Table
        </h1>
        <p className="text-sm text-gray-200">Seamless QR-Based Ordering</p>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-5 text-xl">
        <a
          href="https://www.facebook.com/share/YsTBjGafk1yfBX7i/?mibextid=LQQJ4d"
          className="hover:text-yellow-300 transition"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.instagram.com/tap.2table?igsh=MXVleGZzaGkwb2E0cg=="
          className="hover:text-yellow-300 transition"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </div>

    {/* Policy Links */}
    <div className="mt-1 flex flex-wrap justify-center md:justify-end space-x-2 text-sm opacity-80 text-center md:text-right">
      <a
        href="/policies/privacy-policy"
        className="hover:text-yellow-300 transition font-bold"
      >
        Privacy Policy
      </a>
      <span className="hidden md:inline">|</span>
      <a
        href="/policies/refund-policy"
        className="hover:text-yellow-300 transition font-bold"
      >
        Refund Policy
      </a>
      <span className="hidden md:inline">|</span>
      <a
        href="/policies/return-policy"
        className="hover:text-yellow-300 transition font-bold"
      >
        Return Policy
      </a>
    </div>

    {/* Copyright */}
    <p className="mt-4 text-sm opacity-80">
      &copy; 2025 Tap2Table. All rights reserved.
    </p>
  </footer>
);
