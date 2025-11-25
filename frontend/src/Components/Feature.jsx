import { useState } from "react";
import "./Feature.css";

// Features Data
const internshipFeatures = [
  { key: "SM", title: "Skill Match %", desc: "Instantly see how well your profile matches each internship." },
  // { key: "GA", title: "Gap Analysis", desc: "Pinpoint missing skills and get clear next steps to improve." },
  { key: "IP", title: "Internship Predictor", desc: "AI predicts which internships you are most likely to get." },
];

const jobFeatures = [
  { key: "AI", title: "AI Job Recommendations", desc: "Personalized roles based on your skills and goals." },
  { key: "RB", title: "Resume Builder", desc: "Create a standout resume with smart suggestions." },
  // { key: "CA", title: "Custom Alerts", desc: "Get notified for roles that match your interests." },
];

// Feature Card Component
const FeatureCard = ({ item }) => {
  return (
    <div className="card" tabIndex="0" role="article" aria-label={item.title}>
      <div className="card__icon" aria-hidden="true">{item.key}</div>

      <h3 className="card__title">{item.title}</h3>
      <p className="card__desc">{item.desc}</p>

      <button className="card__cta" type="button" aria-label={`Learn more about ${item.title}`}>
        Learn more
      </button>
    </div>
  );
};

// Login Section
const LoginSection = () => {
  const handleGoogleLogin = () => {
    // TODO: Integrate Firebase or OAuth SDK
    alert("Google Login Triggered! Connect Firebase Auth here.");
  };

  const handleAltLogin = () => {
    alert("Alternate login triggered! Add logic here.");
  };

  return (
    <div className="login-box">
     
    </div>
  );
};

// Main Feature Section
const FeatureSection = () => {
  return (
    <div className="feature-container" role="region" aria-labelledby="internship-title">
      {/* Internship Section */}
      <h2 id="internship-title" className="section-title"></h2>

      <div className="scroll-container" role="list" style={{ display: "flex", gap: "20px", padding: "10px 0", flexWrap: "wrap", justifyContent: "center" }}>
        {internshipFeatures.map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </div>

      {/* Jobs Section */}
      <h2 id="job-title" className="section-title"></h2>

      <div className="scroll-container" role="list" style={{ display: "flex", gap: "20px", padding: "10px 0", flexWrap: "wrap", justifyContent: "center" }}>
        {jobFeatures.map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </div>

      {/* Login Module */}
      <LoginSection />
    </div>
  );
};

export default FeatureSection;
