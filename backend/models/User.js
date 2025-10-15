import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Skills and Interests for personalization
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },

    // Career preferences
    preferences: {
      roles: { type: [String], default: [] },
      location: { type: String, default: "" },
      minLPA: { type: Number, default: 0 },
      workType: { type: String, enum: ["remote", "onsite", "hybrid", "any"], default: "any" },
    },

    // Education & Experience (for better recommendations later)
    educationLevel: { type: String, default: "" }, // e.g., "Bachelors", "Masters"
    experienceYears: { type: Number, default: 0 },

    // Resume summary or extracted keywords
    resumeBullets: { type: [String], default: [] },
    resumeText: { type: String, default: "" }, // Optional: store parsed resume text

    // Saved & Applied opportunities
    savedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" }],
    appliedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" }],

    // Interaction history (for feedback & ML)
    interactions: [
      {
        opportunity: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity" },
        action: {
          type: String,
          enum: ["view", "save", "apply", "dismiss"],
          required: true,
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", schema);
