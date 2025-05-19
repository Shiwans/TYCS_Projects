import mongoose  from 'mongoose';

const UserSchema = new mongoose.Schema({
    profilepic:{type:String,default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"},
    rollNo:{
      type:Number,
      required:true,
      unique:true,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        default:"$2a$10$XwI6H1wOOM5KFDOj.F6.n.SFboJvjNGDLAvUjjV4TLWmssmKjyHU2",
        required: true,
    },
    role: { type: String, enum: ['admin', 'student'],required:true,default:"student" },
    department:{type:String, enum: ['CS','IT'],default:""},
    phoneNo:{type:Number,default:0},
    batch:{type:String,default:""},//Batch
    year:{type:String,default:""},
    resetOtp: { type: String, default:''},
    resetOtpExpireAt: { type: Number, default:0},
    // projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }] , // 🔥 ADD THIS LINE
    // attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }] // ✅ Make sure this exists

    //add attendance object and fileds like no of days present
},{ timestamps: true,
     toJSON: { virtuals: true },
      toObject: { virtuals: true } 
});

// Virtual populate for projects
UserSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'userId'
});

// Virtual populate for attendance
UserSchema.virtual('attendance', {
    ref: 'Attendance',
    localField: '_id',
    foreignField: 'userId'
});

const User = mongoose.model('User', UserSchema);
export default User;
