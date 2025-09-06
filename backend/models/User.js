import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  skills: {type:[String], default:[]},
  preferences: { role: String, location: String, minLPA: Number },
  resumeBullets: {type:[String], default:[]},
  savedOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Opportunity"}]
},{timestamps:true});

export default mongoose.model("User", schema);
