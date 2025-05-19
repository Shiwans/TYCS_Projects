import mongoose from 'mongoose';
import userModel from '../models/userModel.js';
import DBconnect from './massproject.js';

// const connectDB = async ()=>{
//     mongoose.connection.on('connected', ()=>console.log('Database Connected'));

//     await mongoose.connect(process.env.MONGODB_URI);
// };

const students = [
    {
      rollNo: 500,
      name:"Shiwans Vaishya",
      email: "shiwans.vaishya@gmail.com",
      role:"admin",
      department:"CS",
      batch:"Batch0",
      year:"2024-2025"
    },
  ];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const bulkOps = students.map(student => ({
      updateOne: {
        filter: { rollNo: student.rollNo },
        update: { $setOnInsert: student }, // Only set if the document does not exist
        upsert: true
      }
    }));

    const result = await userModel.bulkWrite(bulkOps);
    console.log(`${result.upsertedCount} new student(s) inserted`);
    console.log(`${result.modifiedCount} existing student(s) updated`);
  } catch (error) {
    console.error("Error connecting to MongoDB or updating data:", error);
  }
  DBconnect();
};

export default connectDB;