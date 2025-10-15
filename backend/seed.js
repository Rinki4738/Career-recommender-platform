// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Opportunity from "./models/Opportunity.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devmatch";

const opportunities = [
  {
    title: "Full Stack Developer - React & Node.js",
    type: "job",
    companyOrOrganizer: "TechNova Solutions",
    description:
      "Join our full stack team to build scalable web applications using MERN stack.",
    responsibilities: [
      "Develop REST APIs",
      "Implement responsive UI using React",
      "Integrate databases and authentication",
    ],
    requirements: ["2+ years experience", "Strong MERN stack knowledge"],
    skills: ["React", "Node.js", "MongoDB", "Express"],
    tags: ["full stack", "developer", "MERN", "web"],
    location: "Bangalore, India",
    remote: true,
    workType: "hybrid",
    salaryLPA: 10,
    popularityScore: 4.6,
  },
  {
    title: "Software Development Engineer I (SDE1)",
    type: "job",
    companyOrOrganizer: "NextGen Systems",
    description:
      "Looking for passionate engineers to build scalable backend systems.",
    responsibilities: ["Write clean Java code", "Implement microservices"],
    requirements: ["Strong in DSA", "Knowledge of Spring Boot"],
    skills: ["Java", "Spring Boot", "MySQL", "DSA"],
    tags: ["sde1", "backend", "java"],
    location: "Hyderabad, India",
    remote: false,
    workType: "onsite",
    salaryLPA: 8,
    popularityScore: 4.3,
  },
  {
    title: "Software Development Engineer II (SDE2)",
    type: "job",
    companyOrOrganizer: "Innoventive Labs",
    description:
      "Work on advanced product architecture and code optimization.",
    responsibilities: [
      "Lead a small team of engineers",
      "Ensure scalable architecture",
    ],
    requirements: ["4+ years experience", "Proficient in JS/TS"],
    skills: ["TypeScript", "AWS", "React", "Node.js"],
    tags: ["sde2", "fullstack", "aws"],
    location: "Pune, India",
    remote: true,
    workType: "remote",
    salaryLPA: 15,
    popularityScore: 4.8,
  },
  {
    title: "Automation Test Engineer",
    type: "job",
    companyOrOrganizer: "QualiTech Pvt Ltd",
    description:
      "Automate testing workflows and improve release quality.",
    responsibilities: ["Build test automation scripts", "Manage CI pipelines"],
    requirements: ["Experience with Selenium or Cypress"],
    skills: ["Selenium", "Cypress", "TestNG", "Java"],
    tags: ["automation", "testing", "qa"],
    location: "Chennai, India",
    remote: false,
    workType: "onsite",
    salaryLPA: 6,
    popularityScore: 3.9,
  },
  {
    title: "Backend Developer - Python & Django",
    type: "job",
    companyOrOrganizer: "DataVerse Technologies",
    description:
      "Develop and optimize REST APIs and backend logic for our analytics suite.",
    responsibilities: ["Design APIs", "Work with databases", "Optimize queries"],
    requirements: ["Experience with Django", "Good SQL knowledge"],
    skills: ["Python", "Django", "PostgreSQL", "API"],
    tags: ["backend", "developer", "python"],
    location: "Delhi, India",
    remote: true,
    workType: "remote",
    salaryLPA: 9,
    popularityScore: 4.1,
  },
  {
    title: "Frontend Engineer - React",
    type: "job",
    companyOrOrganizer: "VisionSoft",
    description:
      "Implement user-friendly, responsive UI for modern web applications.",
    responsibilities: ["Build reusable components", "Collaborate with backend"],
    requirements: ["Strong React experience", "CSS/HTML mastery"],
    skills: ["React", "JavaScript", "HTML", "CSS"],
    tags: ["frontend", "ui", "react"],
    location: "Noida, India",
    remote: false,
    workType: "onsite",
    salaryLPA: 7,
    popularityScore: 4.0,
  },
  {
    title: "DevOps Engineer",
    type: "job",
    companyOrOrganizer: "CloudMatrix",
    description:
      "Automate deployments, manage cloud infra, and ensure system reliability.",
    responsibilities: ["Set up CI/CD pipelines", "Monitor infra health"],
    requirements: ["Hands-on with Docker and Kubernetes"],
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    tags: ["devops", "automation", "cloud"],
    location: "Remote",
    remote: true,
    workType: "remote",
    salaryLPA: 12,
    popularityScore: 4.3,
  },
  {
    title: "AI Engineer - NLP & LLMs",
    type: "job",
    companyOrOrganizer: "MindForge AI",
    description:
      "Research and develop NLP applications using transformer-based models.",
    responsibilities: ["Build and fine-tune AI models", "Optimize inference"],
    requirements: ["Experience with TensorFlow or PyTorch"],
    skills: ["Python", "Transformers", "LangChain", "Machine Learning"],
    tags: ["ai", "nlp", "ml", "llm"],
    location: "Bangalore, India",
    remote: true,
    workType: "hybrid",
    salaryLPA: 18,
    popularityScore: 4.9,
  },
  {
    title: "Product Manager (Tech Background Preferred)",
    type: "job",
    companyOrOrganizer: "ZenithCorp",
    description:
      "Define product strategy and manage cross-functional teams.",
    responsibilities: ["Roadmapping", "Feature prioritization"],
    requirements: ["Strong communication", "Analytical mindset"],
    skills: ["Agile", "Scrum", "Leadership", "Analytics"],
    tags: ["management", "product", "strategy"],
    location: "Mumbai, India",
    remote: false,
    workType: "onsite",
    salaryLPA: 20,
    popularityScore: 4.4,
  },
  {
    title: "Software Engineering Intern",
    type: "internship",
    companyOrOrganizer: "CodeCrafters",
    description:
      "Internship for aspiring developers to gain hands-on coding experience.",
    responsibilities: ["Assist in frontend and backend development"],
    requirements: ["Basic JS and Git knowledge"],
    skills: ["JavaScript", "HTML", "CSS", "Git"],
    tags: ["intern", "junior", "training"],
    location: "Remote",
    remote: true,
    workType: "remote",
    stipend: "₹10,000/month",
    popularityScore: 3.8,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Opportunity.deleteMany();
    console.log("🗑️  Cleared old opportunities");

    await Opportunity.insertMany(opportunities);
    console.log("🌱 Seeded new opportunities successfully!");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    mongoose.disconnect();
  }
}

seed();
