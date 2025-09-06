import "./Feature.css"

const internshipFeatures = [
  { key: "SM", title: "Skill Match %", desc: "Instantly see how well your profile matches each internship." },
  { key: "GA", title: "Gap Analysis", desc: "Pinpoint missing skills and get clear next steps to improve." },
  { key: "KH", title: "Knowledge Hub", desc: "Curated resources tailored to your learning path." },
  { key: "MI", title: "Mock Interview", desc: "Practice with realistic questions and actionable feedback." },
]

const jobFeatures = [
  { key: "AI", title: "AI Job Recommendations", desc: "Personalized roles based on your skills and goals." },
  { key: "RB", title: "Resume Builder", desc: "Create a standout resume with smart suggestions." },
  { key: "AT", title: "Application Tracker", desc: "Track every application and never miss an update." },
  { key: "CA", title: "Custom Alerts", desc: "Get notified for roles that match your interests." },
]

const FeatureCard = ({ item }) => {
  return (
    <div className="card" tabIndex="0" role="article" aria-label={item.title}>
      <div className="card__icon" aria-hidden="true">
        {item.key}
      </div>
      <h3 className="card__title">{item.title}</h3>
      <p className="card__desc">{item.desc}</p>
      <button className="card__cta" type="button" aria-label={`Learn more about ${item.title}`}>
        Learn more
      </button>
    </div>
  )
}

const FeatureSection = () => {
  return (
    <div className="feature-container" role="region" aria-labelledby="internship-title">
      {/* Internship Section */}
      <h2 id="internship-title" className="section-title">
        Internship Features
      </h2>
      <div className="scroll-container" role="list">
        {internshipFeatures.map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </div>

      {/* Jobs Section */}
      <h2 id="job-title" className="section-title">
        Job Features
      </h2>
      <div className="scroll-container" role="list">
        {jobFeatures.map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  )
}

export default FeatureSection
