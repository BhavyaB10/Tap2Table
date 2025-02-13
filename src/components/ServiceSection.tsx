"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { services } from "@/ourservices/services";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    img: string;
  } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto move every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

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
      <div className="relative flex items-center justify-center max-w-full mx-auto overflow-hidden">
        <button
          className="absolute left-2 md:left-4 text-white bg-white/20 p-1.5 md:p-2 rounded-full hover:bg-white/30 transition z-10"
          onClick={prevSlide}
        >
          <FaArrowLeft size={14} className="md:size-16" />
        </button>
        <div className="flex items-center space-x-6 w-full justify-center overflow-hidden">
          <motion.div
            className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg w-32 md:w-40 opacity-60 border border-white/20 hidden md:block"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={
                services[(currentIndex - 1 + services.length) % services.length]
                  .img
              }
              alt={
                services[(currentIndex - 1 + services.length) % services.length]
                  .title
              }
              width={100}
              height={140}
              className="mx-auto mb-2 rounded-lg shadow-md"
            />
            <p className="text-xs md:text-sm font-semibold text-gray-200 text-center">
              {
                services[(currentIndex - 1 + services.length) % services.length]
                  .title
              }
            </p>
          </motion.div>
          <motion.div
            key={services[currentIndex].title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg w-72 md:w-80 border border-white/20"
            onClick={() => setSelectedService(services[currentIndex])}
          >
            <Image
              src={services[currentIndex].img}
              alt={services[currentIndex].title}
              width={200}
              height={280}
              className="mx-auto mb-4 rounded-lg shadow-md"
            />
            <p className="text-lg md:text-xl font-semibold text-gray-200 text-center">
              {services[currentIndex].title}
            </p>
          </motion.div>
          <motion.div
            className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg w-32 md:w-40 opacity-60 border border-white/20 hidden md:block"
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={services[(currentIndex + 1) % services.length].img}
              alt={services[(currentIndex + 1) % services.length].title}
              width={100}
              height={140}
              className="mx-auto mb-2 rounded-lg shadow-md"
            />
            <p className="text-xs md:text-sm font-semibold text-gray-200 text-center">
              {services[(currentIndex + 1) % services.length].title}
            </p>
          </motion.div>
        </div>
        <button
          className="absolute right-2 md:right-4 text-white bg-white/20 p-1.5 md:p-2 rounded-full hover:bg-white/30 transition z-10"
          onClick={nextSlide}
        >
          <FaArrowRight size={14} className="md:size-16" />
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
