import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import  auth  from "../middlewares/Auth.js";  // ✅ fixed import

const r = Router();

// REGISTER
r.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, email and password are required" });
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
      user: { id: u._id, name: u.name, email: u.email }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
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
      user: { id: u._id, name: u.name, email: u.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update logged-in user's skills
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
    res.status(500).json({ error: "Error updating profile" });
  }
});

// Get logged-in user's profile
r.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update logged-in user's profile
r.put("/update", auth, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default r;

