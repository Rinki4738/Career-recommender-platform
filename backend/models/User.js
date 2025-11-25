import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  
  // BASIC ACCOUNT INFO
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  // PROFILE DATA (resume autofill)
  personal_info: {
    full_name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,
    image: String,   // profile image
  },

  professional_summary: {
    type: String,
    default: ""
  },

  experience: [
    {
      job_title: String,
      company: String,
      location: String,
      start_date: String,
      end_date: String,
      description: String,
    }
  ],

  education: [
    {
      degree: String,
      school: String,
      location: String,
      start_year: String,
      end_year: String
    }
  ],

  projects: [
    {
      title: String,
      url: String,
      description: String,
      technologies: [String]
    }
  ],

  skills: [String],

  // User preferences
  preferences: {
    theme: { type: String, default: "light" },
    accent_color: { type: String, default: "#3B82F6" },
    default_template: { type: String, default: "classic" },
    location: String
  },

  // Saved resume bullets for AI summary
  resumeBullets: [String],

  // To store multiple created resumes (just IDs, not whole data)
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    }
  ],

}, { timestamps: true });

export default mongoose.model("User", userSchema);

