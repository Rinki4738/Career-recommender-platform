import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    // Basic information
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["job", "internship", "hackathon", "scholarship", "event", "other"],
      required: true,
    },
    companyOrOrganizer: { type: String, required: true },

    // Description & details
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },

    // Skills and tags for matching
    skills: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    // Location & type
    location: { type: String, default: "" },
    remote: { type: Boolean, default: false },
    workType: {
      type: String,
      enum: ["remote", "onsite", "hybrid", "any"],
      default: "any",
    },

    // Salary / Stipend / Rewards
    salaryLPA: { type: Number, default: 0 }, // for jobs
    stipend: { type: String, default: "" }, // for internships
    reward: { type: String, default: "" }, // for hackathons/scholarships

    // Dates
    startDate: { type: Date },
    applyDeadline: { type: Date },
    postedAt: { type: Date, default: Date.now },

    // Links & sources
    sourceURL: { type: String },
    applyLink: { type: String },

    // Optional metadata for ranking
    popularityScore: { type: Number, default: 0 }, // based on clicks or saves
    createdByAdmin: { type: Boolean, default: false }, // true if added manually

    // For ML usage later
    embeddingVector: { type: [Number], default: [] }, // store text embeddings if needed
  },
  { timestamps: true }
);

export default mongoose.model("Opportunity", opportunitySchema);
