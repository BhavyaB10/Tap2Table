"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import data from "../data/data.json";
import Image from "next/image";
import { useState } from "react";

import home1 from "../home1.webp";
import home2 from "../home2.webp";
import home3 from "../home3.webp";
import home4 from "../home4.webp";

const imageList = [
  { src: home1, alt: "QR Ordering 1" },
  { src: home2, alt: "QR Ordering 2" },
  { src: home3, alt: "QR Ordering 3" },
  { src: home4, alt: "QR Ordering 4" },
];

export const HomeSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "Book Demo",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sendMailForDemo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.number,
          type: formData.type,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (formData.type == "Book Demo") {
          setMessage("We will contact you shortly");
          setTimeout(() => {
            setMessage("");
            setIsOpen(false);
          }, 3000);
        } else if (formData.type == "Want Inquiry") {
          setMessage(`Call us on the below number for inquiry:\n
              Phone no: 8085376706`);
          setTimeout(() => {
            setMessage("");
            setIsOpen(false);
          }, 3000);
        }
      } else {
        alert(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      alert(`${error}Error sending message`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className={`p-4 sm:p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-lg mt-14 ${
        isOpen ? "overflow-hidden h-screen" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-7xl mx-auto p-5">
        <motion.div
          className="lg:w-1/2 p-6 sm:p-8 rounded-xl backdrop-blur-lg bg-white/10 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-5">
            What is Tap2Table?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {data.data.description}
          </p>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center justify-center" // Ensure center alignment
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Container to keep Image & Button centered */}
          <div className="flex flex-col items-center ">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              effect="coverflow"
              centeredSlides
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 80,
                modifier: 1,
                slideShadows: false,
              }}
              className="rounded-3xl overflow-hidden shadow-xl w-full max-w-[250px] sm:max-w-[250px] lg:max-w-[350px]" // Centered & responsive width
            >
              {imageList.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover w-full h-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Book Demo Button - Always centered below the image */}
            <button
              className="mt-6 w-[200px] sm:w-[250px] py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-md text-center"
              onClick={() => setIsOpen(true)}
            >
              Book Demo
            </button>
          </div>

          {/* Swiper Arrows Styling - Smaller */}
          <style jsx global>{`
            .swiper-button-prev,
            .swiper-button-next {
              color: white; /* Arrow color */
              font-size: 18px !important; /* Smaller arrows */
              width: 28px !important;
              height: 28px !important;
            }
          `}</style>
        </motion.div>
      </div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="bg-gradient-to-r text-white p-6 rounded-2xl shadow-2xl w-96 relative z-50">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Book a Demo / Inquiry
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold text-gray-300">
                  Name:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded  border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 outline-none"
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
                  Phone Number:
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded  border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter phone number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-300">
                  Select:
                </label>
                <select
                  className="w-full p-2 border rounded  border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option>Book Demo</option>
                  <option>Want Inquiry</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
              {message && (
                <p className="mt-2 text-center text-green-500">{message}</p>
              )}
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};
