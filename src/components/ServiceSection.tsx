"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/ourservices/services";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    img: string;
  } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      id="services"
      className="p-10 pt-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg mt-14 w-full max-w-7xl mx-auto"
    >
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8">
        Our Services
      </h2>
      {/* Services Carousel */}
      <div className="relative flex items-center justify-center max-w-4xl mx-auto">
        <button
          className="absolute left-0 text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          onClick={prevSlide}
        >
          <FaArrowLeft size={24} />
        </button>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg w-80 border border-white/20"
          onClick={() => setSelectedService(services[currentIndex])}
        >
          <Image
            src={services[currentIndex].img}
            alt={services[currentIndex].title}
            width={220}
            height={320}
            className="mx-auto mb-4 rounded-lg shadow-md"
          />
          <p className="text-xl font-semibold text-gray-200 text-center">
            {services[currentIndex].title}
          </p>
        </motion.div>
        <button
          className="absolute right-0 text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          onClick={nextSlide}
        >
          <FaArrowRight size={24} />
        </button>
      </div>

      {selectedService && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 p-4"
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
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl"
              onClick={() => setSelectedService(null)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {selectedService.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base mt-4 text-center">
              {selectedService.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
