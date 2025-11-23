import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middlewares/Auth.js";

const r = Router();

// ---------------- REGISTER ----------------
r.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const u = await User.create({ name, email, password: hash });

    const token = jwt.sign(
      { id: u._id, email: u.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: u._id, name: u.name, email: u.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- LOGIN ----------------
r.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const u = await User.findOne({ email });
    if (!u) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, u.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: u._id, email: u.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: u._id, name: u.name, email: u.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- UPDATE SKILLS ----------------
r.put("/skills", auth, async (req, res) => {
  const { skills } = req.body;

  if (!Array.isArray(skills)) {
    return res.status(400).json({ error: "Skills must be an array of strings" });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { skills },
      { new: true, select: "skills" }
    );

    res.json({ skills: updated.skills });
  } catch (err) {
    res.status(500).json({ error: "Error updating skills" });
  }
});

// ---------------- GET LOGGED-IN USER (EXTENDED) ----------------
r.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // 🔥 Ensure older users still work with new schema
    if (!user.personal_info) user.personal_info = {};
    if (!user.experience) user.experience = [];
    if (!user.education) user.education = [];
    if (!user.projects) user.projects = [];
    if (!user.skills) user.skills = [];
    if (!user.preferences) user.preferences = {};
    if (!user.resumeBullets) user.resumeBullets = [];

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ---------------- UPDATE USER PROFILE (EXTENDED) ----------------
r.put("/update", auth, async (req, res) => {
  try {
    // ✨ Allowed fields (fully aligned with schema)
    const allowed = [
      "name",
      "email",
      "personal_info",
      "professional_summary",
      "experience",
      "education",
      "projects",
      "skills",
      "preferences",
      "resumeBullets",
    ];

    const updateData = {};

    // Only update fields that exist in req.body
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    });

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, select: "-password" }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});
// ---------------- ADD SINGLE SKILL ----------------
r.post("/add-skill", auth, async (req, res) => {
  const { skill } = req.body;

  if (!skill || typeof skill !== "string") {
    return res.status(400).json({ error: "Skill must be a string" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Avoid duplicates
    if (!user.skills.includes(skill)) {
      user.skills.push(skill);
      await user.save();
    }

    res.json({ skills: user.skills });
  } catch (err) {
    console.error("Add skill error:", err);
    res.status(500).json({ error: "Failed to add skill" });
  }
});


export default r;
