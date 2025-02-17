"use client";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8 md:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 md:p-12 rounded-lg shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-300 mb-4">
          At Tap2Table, we respect your privacy and are committed to protecting
          your personal data.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          1. Information We Collect
        </h2>
        <p className="text-gray-300">
          We may collect personal details like your name, email, and payment
          details when using our services.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-300">
          Your information helps us improve our platform, process transactions,
          and enhance user experience.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          3. Data Security
        </h2>
        <p className="text-gray-300">
          We implement industry-standard security measures to protect your data
          from unauthorized access.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          4. Contact Us
        </h2>
        <p className="text-gray-300">
          If you have any concerns, contact us at{" "}
          <a
            href="mailto: tap2table2024@gmail.com"
            className="text-blue-400 underline"
          >
            support@tap2table.com
          </a>
          .
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
