// Hero.js
import React from "react";
import { MdEmail } from "react-icons/md";     // Email icon
import { FcGoogle } from "react-icons/fc";   // Google logo
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="overlay">
        <h1>India’s #1 Career Recommendation Platform</h1>
        <p>Find jobs & internships tailored to your skills with AI guidance.</p>

        {/* Auth Buttons */}
        {/* <div className="auth-buttons">
          <button className="email-btn">
            <MdEmail size={20} style={{ marginRight: "8px" }} />
            Login with Email
          </button>
          <button className="google-btn">
            <FcGoogle size={20} style={{ marginRight: "8px" }} />
            Login with Google
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
