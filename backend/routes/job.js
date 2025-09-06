// backend/src/routes/job.js
import express from "express";
import axios from "axios";
import Job from "../models/job.js";
import User from "../models/User.js";
import auth from "../middlewares/Auth.js";

const router = express.Router();

// Fetch jobs from API and save to DB
router.get("/search", async (req, res) => {
  const { query, location } = req.query;

  try {
    const apiRes = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query: `${query} jobs in ${location}`,
        page: 1,
        num_pages: 1,
        country: "india",
        date_posted: "all",
      },
      headers: {
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY
      }
    });

    const jobData = apiRes.data.data;

    const jobsToInsert = jobData.map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city,
      applyUrl: job.job_apply_link,
      skills: job.job_highlights?.Qualifications || [],
      postedAt: job.job_posted_at ? new Date(job.job_posted_at) : undefined
    }));

    await Job.insertMany(jobsToInsert);
    res.json({ insertedCount: jobsToInsert.length, jobs: jobsToInsert });

  } catch (error) {
    console.error("Error fetching or storing jobs:", error);
    res.status(500).json({ error: "Failed to fetch or store jobs" });
  }
});

// Recommend jobs (partial match + scoring)
router.get('/recommend', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('skills');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userSkills = user.skills;
    if (!userSkills.length) {
      return res.status(200).json({ recommended: [], message: 'No skills to match' });
    }

    // Fetch all jobs
    const jobs = await Job.find({});

    // Score jobs by number of matching skills
    const scored = jobs
      .map(job => {
        const matchCount = job.skills.filter(skill => userSkills.includes(skill)).length;
        return { job, score: matchCount };
      })
      .filter(item => item.score > 0) // keep only jobs with at least 1 matching skill
      .sort((a, b) => b.score - a.score) // sort by match count
      .map(item => item.job);

    res.json({ recommended: scored });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Recommendation failed' });
  }
});

export default router;
