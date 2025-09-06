import mongoose from "mongoose";
const schema = new mongoose.Schema({
  company:String, role:String, question:String,
  difficulty:{type:String, enum:["Easy","Medium","Hard"], default:"Medium"},
  tags:[String], source:String
},{timestamps:true});

export default mongoose.model("QnA", schema);
