import mongoose  from 'mongoose';

const SessionSchema = new mongoose.Schema({
    department:{type:String, enum: ['CS','IT'],required:true},
    year:{type:String,required:true},//2023-2024
    project: { type: String, required:true},//project number //Project One  or Project Two
    batch:{type:String,required:true},//Batch1  Batch2  Batch3
    date:{type:Date,required:true},
    sessionNo:{type:String,required:true},//session1  session2 ....... session9
    students:[//this will store all the student name in this session
        {
            rollNo: { type: Number },
            name: { type: String, },
            projectName:{type:String,},
            // email:{type:String,},
            userId:{type:String},
            status: {type:String , enum: ['Present', 'Absent'],default:""},
        }
    ],
    presentCount: { type: Number, default: 0 },
    absentCount: { type: Number, default: 0 },
},{ timestamps: true });

const Session = mongoose.model('Session', SessionSchema);
export default Session;