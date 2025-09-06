import { Router } from "express";
import Opportunity from "../models/Opportunity.js";
const r = Router();
r.get("/", async (req,res)=>{
  const {type, location, minLPA} = req.query;
  const q = {};
  if(type) q.type=type;
  if(location) q.location = new RegExp(location,"i");
  if(minLPA) q.salaryLPA = {$gte: Number(minLPA)};
  res.json(await Opportunity.find(q).sort({createdAt:-1}).limit(50));
});
r.post("/seed", async (req,res)=>{
  const demo = [
    { title:"SDE Intern", company:"Acme", type:"internship", location:"Bengaluru", stipend:30000, jd:"JS React Node SQL", skills:["javascript","react","node","sql"], applyUrl:"#", deadline:new Date(Date.now()+2592000000), source:"seed" },
    { title:"Data Analyst", company:"DataCorp", type:"job", location:"Hyderabad", salaryLPA:8, jd:"SQL Python Pandas", skills:["sql","python","pandas"], applyUrl:"#", deadline:new Date(Date.now()+1728000000), source:"seed" }
  ];
  await Opportunity.insertMany(demo);
  res.json({ok:true, inserted:demo.length});
});
export default r;
