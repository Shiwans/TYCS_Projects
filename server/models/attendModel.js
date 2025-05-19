import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type:String,required:true},
    rollNo:{type:Number,required:true,},
      attendance: [
        {
            date: { type: Date, required: true },
            status: { type: String, enum: ['Present', 'Absent'], required: true },
            projectName:{type:String,enum:['Project One','Project Two'],required:true},
            sessionNo:{type:String,required:true},
            sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
        },
    ],
    totalPresent: { type: Number, default: 0 },
    totalAbsent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
