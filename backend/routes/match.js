import { Router } from "express";
import axios from "axios";
import  auth from "../middlewares/Auth.js";
import User from "../models/User.js";
const r = Router();
const ML = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

r.post("/score", auth, async (req,res)=>{
  const { jdSkills = [] } = req.body;
  const user = await User.findById(req.user.id).lean();
  const userSkills = user?.skills || [];
  const { data } = await axios.post(`${ML}/match`, { userSkills, jdSkills });
  res.json(data);
});
export default r;
