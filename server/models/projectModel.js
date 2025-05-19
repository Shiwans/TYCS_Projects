import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
  image:{type:String,},
  name: {type: String,required: true,trim: true,},
  email:{type:String,required:true,},
  iscompleted:{type:Boolean,required:true,default:false},
  rollno: {type: Number,required: true,},
  title: { type: String, required: true },
  description: {type: String,required: true,},
  category: {type: String,required: true,},
  deployed: {type: String},
  future: {type: String,},
  batch:{type:String,required:true},
  year:{type:String,required:true},
  department:{type:String, enum: ['CS','IT'],required:true},
  project: { type: String, required:true,}, //this is for project pehchano 1 or2  ...for unique true we need to check for each person not from everyone
  github: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
},{timestamps:true});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
