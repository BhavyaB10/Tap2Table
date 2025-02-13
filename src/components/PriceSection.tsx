"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { plans } from "@/priceplans/plans";
import Link from "next/link";

export const PricingSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [formData, setFormData] = useState({ name: "", email: "", amount: "" });
  // const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   setTimeout(() => {
  //     setIsOpen(false);
  //     setSubmitted(false);
  //     setFormData({ name: "", email: "", amount: "" });
  //   }, 2000);
  // };

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
              <Link href={`/get-started?amount=${plan.price}`} passHref>
                <button className="mt-6 w-full py-2 bg-yellow-300 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition">
                  Get Started
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialog (Popup) for Payment Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-96 relative"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
              {/* <h3 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Payment Details
              </h3> */}

              <h1 className="text-center text-green-400 text-xl">
                Thank you for contacting us...
              </h1>
              <br></br>
              <p className=" text-white text-center mt-4">
                Call us on the below number for booking:
              </p>

              <h2 className="text-center mt-4">
                Phone no :
                <a
                  href="mailto:tap2table2024@gmail.com"
                  className="text-gray-300 hover:text-yellow-300 transition font-bold"
                >
                  8085376706
                </a>
              </h2>

              {/* ) : (
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block font-semibold text-gray-300">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white outline-none"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white outline-none"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-300">
                      Amount:
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white outline-none"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </form>
              )} */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
