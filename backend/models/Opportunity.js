import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title:String, company:String,
  type:{type:String, enum:["job","internship","hackathon","event"], default:"job"},
  location:String, salaryLPA:Number, stipend:Number,
  jd:String, skills:[String], applyUrl:String,
  deadline: Date, nextOpenMonth: Number, source:String
},{timestamps:true});
schema.index({company:1, title:1});

export default mongoose.model("Opportunity", schema);
