"use client";
import { motion } from "framer-motion";

const RefundPolicy = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8 md:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 md:p-12 rounded-lg shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center mb-6">
          Refund Policy
        </h1>
        <p className="text-gray-300 mb-4">
          Our refund policy outlines the conditions under which refunds may be
          issued.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          1. Eligibility for Refunds
        </h2>
        <p className="text-gray-300">
          Refunds are only applicable for transactions with technical errors or
          duplicate payments.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          2. Non-Refundable Items
        </h2>
        <p className="text-gray-300">
          Payments made for subscription-based services are non-refundable.
        </p>

        <h2 className="text-xl font-semibold text-yellow-300 mt-6">
          3. Refund Process
        </h2>
        <p className="text-gray-300">
          To request a refund, email us at{" "}
          <a
            href="mailto:support@tap2table.com"
            className="text-blue-400 underline"
          >
            support@tap2table.com
          </a>
          . Refunds will be processed within 7-10 business days.
        </p>
      </div>
    </motion.div>
  );
};

export default RefundPolicy;
