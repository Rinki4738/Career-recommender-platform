import express from "express";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

// 1️⃣ Get all opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// 3️⃣ Advanced filter opportunities dynamically
// Example: /api/opportunities/filter?type=job&location=Remote&skills=React,Node.js&minSalary=5&maxSalary=15&workType=hybrid&remote=true
router.get("/filter", async (req, res) => {
  try {
    const {
      type,
      location,
      skills,
      minSalary,
      maxSalary,
      stipendMin,
      stipendMax,
      rewardMin,
      rewardMax,
      workType,
      remote,
      applyBefore, // YYYY-MM-DD
    } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (skills) filter.skills = { $in: skills.split(",") };

    if (minSalary || maxSalary) {
      filter.salaryLPA = {};
      if (minSalary) filter.salaryLPA.$gte = Number(minSalary);
      if (maxSalary) filter.salaryLPA.$lte = Number(maxSalary);
    }

    if (stipendMin || stipendMax) {
      filter.stipend = {};
      if (stipendMin) filter.stipend.$gte = Number(stipendMin);
      if (stipendMax) filter.stipend.$lte = Number(stipendMax);
    }

    if (rewardMin || rewardMax) {
      filter.reward = {};
      if (rewardMin) filter.reward.$gte = Number(rewardMin);
      if (rewardMax) filter.reward.$lte = Number(rewardMax);
    }

    if (workType) filter.workType = workType;
    if (remote !== undefined) filter.remote = remote === "true";
    if (applyBefore) filter.applyDeadline = { $lte: new Date(applyBefore) };

    const results = await Opportunity.find(filter).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 2️⃣ Get single opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: "Opportunity not found" });
    res.json(opp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
