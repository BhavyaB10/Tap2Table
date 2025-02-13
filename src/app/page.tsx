import React from "react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "@/components/Footer";
import { HomeSection } from "@/components/HomeSection";
import { ServicesSection } from "@/components/ServiceSection";
import ContactSection from "@/components/ContactSection";
import { PricingSection } from "@/components/PriceSection";
const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>Tap2Table - QR-Based Ordering</title>
        <meta
          name="description"
          content="Revolutionizing restaurant ordering with QR-based digital menus."
        />
      </Head>
      <Header />
      <main className=" mx-auto p-8 mt-10">
        <HomeSection />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
