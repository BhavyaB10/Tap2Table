"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { services } from "@/ourservices/services";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    img: string;
  } | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get indices of previous and next cards
  const prevIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % services.length;

  return (
    <section
      id="services"
      className="p-10 pt-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg mt-14 w-full max-w-7xl mx-auto"
    >
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8">
        Our Services
      </h2>

      {/* Services Carousel */}
      <div className="relative flex items-center justify-center max-w-4xl mx-auto h-[350px]">
        {/* Previous Button */}
        <button
          className="absolute left-0 z-10 text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          onClick={prevSlide}
        >
          <FaArrowLeft size={24} />
        </button>
        <div className="relative w-[400px] h-[320px] flex items-center justify-center overflow-hidden">
          {/* Previous Card - Hidden on small screens */}
          <motion.div
            className="absolute left-0 opacity-50 scale-90 blur-sm hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={services[prevIndex].img}
              alt={services[prevIndex].title}
              width={150}
              height={220}
              className="rounded-lg shadow-md"
            />
          </motion.div>

          {/* Current (Active) Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg w-full sm:w-72 md:w-80 lg:w-96 border border-white/20"
            onClick={() => setSelectedService(services[currentIndex])}
          >
            <Image
              src={services[currentIndex].img}
              alt={services[currentIndex].title}
              width={320}
              height={320}
              className="mx-auto mb-4 rounded-lg shadow-md max-w-full h-auto"
            />
            <p className="text-lg md:text-xl font-semibold text-gray-200 text-center">
              {services[currentIndex].title}
            </p>
          </motion.div>

          {/* Next Card - Hidden on small screens */}
          <motion.div
            className="absolute right-0 opacity-50 scale-90 blur-sm hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.5, x: 30 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={services[nextIndex].img}
              alt={services[nextIndex].title}
              width={150}
              height={220}
              className="rounded-lg shadow-md"
            />
          </motion.div>
        </div>
        {/* Next Button */}
        <button
          className="absolute right-0 text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          onClick={nextSlide}
        >
          <FaArrowRight size={24} />
        </button>
      </div>

      {/* Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
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
