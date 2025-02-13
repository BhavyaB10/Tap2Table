"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/ourservices/services";

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    img: string;
  } | null>(null);

  return (
    <section
      id="services"
      className="p-20 pt-28 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg mt-14"
    >
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8">
        Our Services
      </h2>
      {/* Horizontal Scrolling Container */}
      <div className="overflow-hidden relative w-full">
        <motion.div
          className="flex space-x-6 w-max"
          animate={!selectedService ? { x: ["0%", "-100%"] } : {}}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        >
          {[...services, ...services].map((service, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform w-80 flex-shrink-0 border border-white/20"
              onClick={() => setSelectedService(service)}
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={service.img}
                alt={service.title}
                width={120}
                height={120}
                className="mx-auto mb-4 rounded-full shadow-md"
              />
              <p className="text-xl font-semibold text-gray-200 text-center">
                {service.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedService && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-blackbg-opacity-60 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* ❌ Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl"
              onClick={() => setSelectedService(null)}
            >
              ✖
            </button>

            {/* Title */}
            <h3 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {selectedService.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base mt-4 text-center">
              {selectedService.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
