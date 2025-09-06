import React from "react";
import Navbar from "../Components/Header";
import Hero from "../Components/Hero";
import FeatureSection from "../Components/Feature";
import Footer from "../Components/Footer";
import "../App.css";
import "../theme.css";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeatureSection />
      <Footer />
    </div>
  );
}

export default LandingPage;