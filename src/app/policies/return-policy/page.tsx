"use client";
import { motion } from "framer-motion";

const ReturnPolicy = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8 md:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 md:p-12 rounded-lg shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center mb-6">
          Return Policy
        </h1>
        <p className="text-gray-300 mb-4">
          We do not offer returns for digital or subscription-based services.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          1. Digital Services
        </h2>
        <p className="text-gray-300">
          Since our platform provides digital services, there are no physical
          items to return.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          2. Dispute Resolution
        </h2>
        <p className="text-gray-300">
          If you are unsatisfied with our service, please contact{" "}
          <a
            href="mailto:support@tap2table.com"
            className="text-blue-400 underline"
          >
            support@tap2table.com
          </a>{" "}
          to resolve the issue.
        </p>
      </div>
    </motion.div>
  );
};

export default ReturnPolicy;
