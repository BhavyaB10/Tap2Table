"use client";
import { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const GetStartedContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // ✅ Parse & Remove Commas from "amount" URL Parameter
  const amount = useMemo(() => {
    const rawAmount = searchParams?.get("amount") || "5499"; // Default ₹5499
    return Number(rawAmount.replace(/,/g, "")); // Remove commas & convert to number
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurant: "",
    address: "",
    amount,
  });

  // ✅ Update formData.amount when "amount" changes from URL
  useEffect(() => {
    setFormData((prev) => ({ ...prev, amount }));
  }, [amount]);

  // ✅ Load Razorpay SDK
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )
      ) {
        setRazorpayLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay SDK");
      document.body.appendChild(script);
    };

    if (typeof window !== "undefined") {
      loadRazorpayScript();
    }
  }, []);

  // ✅ Handle Payment
  const handlePayment = useCallback(async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK is not yet loaded. Please wait and try again.");
      return;
    }

    setLoading(true);
    try {
      console.log("Creating order...");

      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: formData.amount }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to create order: ${errorData.error}`);
      }

      const data = await res.json();
      console.log("Order created:", data);

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: data.amount,
        currency: "INR",
        name: "Tap2Table",
        description: "Subscription Payment",
        order_id: data.id,
        handler: function (response: RazorpayResponse) {
          alert(
            "Payment Successful! Order ID: " + response.razorpay_payment_id
          );
          router.push("/");
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Payment Failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [razorpayLoaded, formData, router]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Complete Your Subscription
        </h2>
        <form className="space-y-4">
          {[
            { placeholder: "Full Name", key: "name" },
            { placeholder: "Email", key: "email", type: "email" },
            { placeholder: "Phone Number", key: "phone", type: "tel" },
            { placeholder: "Restaurant Name", key: "restaurant" },
            { placeholder: "Address", key: "address" },
          ].map(({ placeholder, key, type = "text" }) => (
            <motion.input
              key={key}
              type={type}
              placeholder={placeholder}
              className="w-full p-3 bg-white/20 text-white rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [key]: e.target.value }))
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          ))}
          <motion.button
            type="button"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            onClick={handlePayment}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Processing..." : `Proceed to Pay ₹${formData.amount}`}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const GetStarted = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GetStartedContent />
  </Suspense>
);

export default GetStarted;
