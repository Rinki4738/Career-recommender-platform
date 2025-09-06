// backend/src/routes/recommend.js
import { Router } from "express";
import axios from "axios";
import User from "../models/User.js";
import Opportunity from "../models/Opportunity.js";
import  auth from "../middlewares/Auth.js";

const r = Router();
const ML = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

function normalizeText(s=""){ return (s||"").toString().toLowerCase().replace(/\s+/g,' ').trim(); }
function mapExternalJob(j){
  return {
    id: j.id || j._id || (j.source? `${j.source}_${j.applyUrl || j.title}`: j.title),
    title: j.title || "",
    description: j.description || j.jd || j.summary || "",
    skills: (j.skills || []).map(s => s.toString().toLowerCase()),
    location: j.location || j.city || "remote",
    raw: j
  };
}

r.get("/recommend", auth, async (req,res)=>{
  try{
    // 1) load user
    const user = await User.findById(req.user.id).lean();
    if(!user) return res.status(404).json({error:"User not found"});

    // Build user text & skills
    const userSkills = (user.skills || []).map(s => s.toLowerCase());
    const userText = [userSkills.join(" "), ...(user.interests||[]).map(i=>i.toLowerCase())].join(" ");

    // 2) fetch candidate jobs
    // OPTION A: from local DB (fast)
    // let candidates = await Opportunity.find({}).limit(500).lean();
    // OPTION B: live from external APIs: implement fetchExternalJobs()
    const candidatesRaw = await fetchExternalJobs(req.query); // implement below
    const candidates = candidatesRaw.map(mapExternalJob);

    // 3) call ML service to score
    const mlResp = await axios.post(`${ML}/match`, {
      user: { id:user._id, skills: userSkills, text: userText },
      jobs: candidates.map(c => ({ id:c.id, title:c.title, description:c.description, skills:c.skills, location:c.location }))
    }, { timeout: 30000 });

    const scores = mlResp.data.scores || [];

    // 4) attach scores to jobs
    const jobWithScores = candidates.map(c => {
      const s = scores.find(x=>x.id === c.id) || { score:0, cosine:0, overlap:0, matchedSkills:[] };
      const skillMatchPct = s.overlap ? Math.round(s.overlap * 100) : (c.skills.length? Math.round((s.matchedSkills?.length||0)/c.skills.length*100):0);
      return { job: c.raw, id:c.id, title:c.title, location:c.location, score: s.score, cosine: s.cosine, skillMatchPct, matchedSkills: s.matchedSkills || [] };
    });

    // 5) final filters / sort / paginate
    const minScore = Number(req.query.minScore || 0);
    const filtered = jobWithScores.filter(j=> j.score >= minScore);
    filtered.sort((a,b)=> b.score - a.score);

    const page = Math.max(1, Number(req.query.page||1));
    const pageSize = Math.min(50, Number(req.query.pageSize||20));
    const start = (page-1)*pageSize;

    res.json({
      total: filtered.length,
      page, pageSize,
      results: filtered.slice(start, start+pageSize)
    });

  }catch(err){
    console.error("Recommend error:", err?.response?.data|| err.message || err);
    res.status(500).json({ error: "Server error" });
  }
});

export default r;

/* -------------------------
  Implement fetchExternalJobs(query)
  - Either call external APIs (Jooble, Eventbrite, etc.)
  - or fetch from your Opportunity collection (preferred for speed)

  Example simple implement: return Opportunity.find({}).limit(500)
---------------------------*/
async function fetchExternalJobs(query){
  // simple placeholder -> read from local DB (fast)
  // return await Opportunity.find({}).sort({createdAt:-1}).limit(500).lean();

  // OR a live API example (pseudo)
  // const resp = await axios.get("https://api.example.com/search", { params:{ q: query.q || "internship", location: query.location }});
  // return resp.data.results;

  // For now: throw if DB not configured -> implement per your data source
  return await Opportunity.find({}).sort({createdAt:-1}).limit(500).lean();
}
