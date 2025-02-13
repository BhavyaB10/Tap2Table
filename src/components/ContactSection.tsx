"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    number: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    number: "",
    description: "",
  });

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", number: "", description: "" };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email required";
      valid = false;
    }
    if (!formData.number || !/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Valid 10-digit number required";
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description cannot be empty";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.number,
          message: formData.description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ email: "", number: "", description: "" });
        setIsOpen(false);
      } else {
        alert(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      alert({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="p-10 bg-gray-900 text-white text-center mt-14"
    >
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8">
        Contact Us
      </h2>
      <p className="mt-3 text-gray-300">
        Reach out to us for any queries or collaborations.
      </p>

      {/* Contact Details */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-6 md:space-y-0 md:space-x-12">
        <div className="flex items-center space-x-4">
          <FaPhoneAlt className="text-yellow-500 text-2xl" />
          <a
            href="tel:+919876543210"
            className="text-gray-300 hover:text-yellow-300 transition"
          >
            +91 8085376706
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-yellow-500 text-2xl" />
          <a
            href="mailto:tap2table2024@gmail.com"
            className="text-gray-300 hover:text-yellow-300 transition"
          >
            tap2table2024@gmail.com
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-yellow-500 text-2xl " />
          <p
            className="text-gray-300 cursor-pointer hover:underline hover:text-yellow-300"
            onClick={() =>
              window.open(
                "https://www.google.com/maps?q=Pardeshipura,+Indore,+Madhya+Pradesh,+India",
                "_blank"
              )
            }
          >
            Pareshipura Indore, Madhya Pradesh, India
          </p>
        </div>
      </div>

      <button
        className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition"
        onClick={() => setIsOpen(true)}
      >
        Contact Us
      </button>
      {/* Dialog (Popup) Form */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
            <h3 className="text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Get in Touch
            </h3>

            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block font-semibold text-gray-300 text-start">
                  Email:
                </label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-semibold text-gray-300 text-start">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter 10-digit number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                />
                {errors.number && (
                  <p className="text-red-400 text-sm mt-1">{errors.number}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-semibold text-gray-300 text-start">
                  Message:
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 outline-none"
                  rows={4}
                  placeholder="Write your message here"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 transition-all shadow-md"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
                <button
                  type="button"
                  className="w-1/3 py-3 rounded-lg font-semibold bg-red-500 hover:bg-red-600 transition-all shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;
