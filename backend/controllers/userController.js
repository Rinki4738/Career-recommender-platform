// controllers/userController.js
const User = require("../models/User");

// GET /api/user/me
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("getProfile error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/user/me
exports.updateProfile = async (req, res) => {
  try {
    const allowed = [
      "name",
      "personal_info",
      "professional_summary",
      "experience",
      "education",
      "projects",
      "skills",
      "preferences",
      "resumeBullets"
    ];

    const updates = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    // Basic validation examples
    if (updates.skills && !Array.isArray(updates.skills)) {
      return res.status(400).json({ error: "skills must be an array" });
    }

    // Update and return new
    const user = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true, runValidators: true }).select("-password");
    return res.json(user);
  } catch (err) {
    console.error("updateProfile error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
