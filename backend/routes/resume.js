import { Router } from "express";
import axios from "axios";
import  auth from "../middlewares/Auth.js";
import User from "../models/User.js";
const r = Router();
const ML = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

r.post("/generate", auth, async (req,res)=>{
  const { targetRole="", company="", jdSkills=[] } = req.body;
  const user = await User.findById(req.user.id).lean();
  const { data } = await axios.post(`${ML}/resume/latex`, {
    name: user.name, email: user.email, skills: user.skills, resumeBullets: user.resumeBullets||[], targetRole, company, jdSkills
  });
  res.setHeader("Content-Type","text/plain");
  res.send(data.tex);
});
export default r;
