// server/routes/recommendations.js
import express from "express";
import User from "../models/User.js";
import Opportunity from "../models/Opportunity.js";
import auth from "../middlewares/Auth.js"; // JWT middleware

const router = express.Router();

// ✅ GET recommendations for logged-in user
router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id; // JWT se automatic
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { skills = [], preferences = {}, resumeBullets = [] } = user;
    const { roles = [], location = "", minLPA = 0 } = preferences;

    const opportunities = await Opportunity.find();

    const scoredOpportunities = opportunities.map((opp) => {
      let score = 0;

      // 1️⃣ Skill match
      const skillMatches = skills.filter((skill) =>
        opp.skills.includes(skill)
      ).length;
      score += skillMatches * 2;

      // 2️⃣ Resume bullet tags
      const tagMatches = resumeBullets.filter((bullet) =>
        opp.tags.some((tag) =>
          bullet.toLowerCase().includes(tag.toLowerCase())
        )
      ).length;
      score += tagMatches * 1.5;

      // 3️⃣ Role match
      if (roles.length > 0) {
        const titleMatch = roles.some((role) =>
          opp.title.toLowerCase().includes(role.toLowerCase())
        );
        if (titleMatch) score += 2;
      }

      // 4️⃣ Location
      if (location) {
        if (opp.remote || opp.location.toLowerCase().includes(location.toLowerCase())) {
          score += 1.5;
        }
      }

      // 5️⃣ Salary / stipend / reward
      if (minLPA && opp.salaryLPA && opp.salaryLPA >= minLPA) score += 2;

      // 6️⃣ Popularity
      score += opp.popularityScore || 0;

      return { opportunity: opp, score };
    });

    // Sort descending
    scoredOpportunities.sort((a, b) => b.score - a.score);

    // Return top 10
    const topRecommendations = scoredOpportunities
      .slice(0, 10)
      .map((o) => o.opportunity);

    res.json(topRecommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
