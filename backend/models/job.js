// models/job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  company:   { type: String },
  location:  { type: String },
  applyUrl:  { type: String },
  skills:    { type: [String], default: [] }, // e.g., ["javascript", "react"]
  postedAt:  { type: Date, default: Date.now }
}, {
  timestamps: true  // adds createdAt & updatedAt automatically
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
