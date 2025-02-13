"use client";
import { motion } from "framer-motion";
import { plans } from "@/priceplans/plans";
import Link from "next/link";

export const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-16 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-14"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="p-6 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Pricing Plans
        </h2>
        <p className="mt-4 text-gray-300">
          Flexible pricing plans to fit your business needs.
        </p>

        {/* Pricing Cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-xl shadow-lg border border-gray-700 ${
                plan.highlight
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-105"
                  : "bg-gray-800"
              } hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold">{plan.duration}</h3>
              <p className="mt-2 text-xl font-semibold text-yellow-300">
                {plan.price}
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    ✅ <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Updated Button to Pass Amount in URL */}
              <Link
                href={`/get-started?amount=${plan.price.replace("₹", "")}`}
                className="mt-6 block w-full py-2 bg-yellow-300 text-gray-900 font-bold text-center rounded-lg hover:bg-yellow-400 transition"
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
