import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import Project from "../models/projectModel.js"
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
  // console.log("Login User Called");
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all fields" });
  }

  const userExist = await userModel.findOne({ email });
        if (!userExist) {
          console.error("Login attempt with unknown email:", email);
          return res.status(401).json({ message: "Invalid email or password" });
        }

  try {
    const user = await userModel.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // console.log(process.env.NODE_ENV === "production");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    });
    redirect('/login');
    return res.json({ success: true, message: "logout" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true});
    } catch (error) {
        res.json({ success: false, message:error.message})
    }
}

//Send Email
export const sendResetOtp = async (req, res) => {
  const {email} = req.body;

  if(!email){
    return res.json({ success: false, message: "Please provide an email" });
  }

  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    // console.log(otp);

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + (15 * 60 * 1000);

    try {
      await user.save();
      // console.log("User updated successfully");
    } catch (err) {
      console.error("Error while saving user:", err);
    }
    
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Set OTP",
      text: `Your OTP for Setting your password is ${otp}. Use this OTP to proceed with setting your password`
    };

    try {
      await transporter.sendMail(mailOptions);
      // console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Error while sending email:", emailError);
    }
    
    return res.json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message});
  }
}

// set Password
export const resetPassword = async (req, res) => {
  // console.log('resetPassword called');
  const {email, otp, newPassword} = req.body;
  if(!email || !otp || !newPassword){
    return res.json({ success: false, message: "Please provide all required fields" });
  }
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({ success: false, message: "User not found" });
    }

    if(user.resetOtp === "" || user.resetOtp !== otp){
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if(user.resetOtpExpireAt < Date.now()){
      return res.json({ success: false, message: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();
    
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const getProfile = async (req, res) => {
  try {
    // Get token from the Authorization header
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from the database using the decoded user ID
    const user = await userModel.findById(decoded.id);
    // console.log("USER IS THERE?    " , user);

    if (!user) {
      // console.log("No user found for ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }
    const userId = user._id; 
    const projects = await Project.find({userId})
    // Prepare user data to send as a response
    const profileData = {
      userId:user._id,
      name: user.name,
      rollNo: user.rollNo,
      phoneNo: user.phoneNo,
      email: user.email,
      year: user.year,
      batch: user.batch,
      department: user.department,
      projects: user.projects, // Assuming this is an array of projects
      profilepic: user.profilepic,
      projects:projects,
    };


    res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const userRole = async (req, res) => {
  // console.log("User Role Called");
    try {
      // Check if token exists in cookies
      const token = req.cookies?.token;
      // console.log("User Token", token);
      if (!token) {
        return res.json({ role: "guest" }); // If no token, treat as guest
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Fetch user from database
      const user = await userModel.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // console.log(user);
      // Send user role as response
      return res.json({ role: user.role }); // Should return "admin" or "user"
  
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
}

export const editProfile = async (req, res) => {
  // console.log("Edit Profile Called");
  try {
    // Get token from the Authorization header
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user data from the database using the decoded user ID
    let user = await userModel.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile with request body data
    const updatedData = {
      name: req.body.name || user.name,
      rollNo: req.body.rollNo || user.rollNo,
      phoneNo: req.body.phoneNo || user.phoneNo,
      email: req.body.email || user.email,
      year: req.body.year || user.year,
      batch: req.body.batch || user.batch,
      department: req.body.department || user.department,
      projects: req.body.projects || user.projects,
    };

    // Save updated user profile
    user = await userModel.findByIdAndUpdate(decoded.id, updatedData, { new: true });
    
    res.status(200).json({ message: "Profile updated successfully", profile: user });
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
export const storeProfilePicture = async (req, res) => {
  console.log("Edit Profile Called");
  console.log(req.body);
  try {
    // Get token from the Authorization header
    const token = req.cookies.token;
    // console.log("Token", token);
    
    if (!token) {
      return res.status(401).json({ message: "No token provided.............." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user data from the database using the decoded user ID
    let user = await userModel.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile with request body data
    const updatedData = {
      profilepic: req.file.path,
    };
    // console.log("Updated Data:", updatedData);
    // Save updated user profile
    user = await userModel.findByIdAndUpdate(decoded.id, updatedData, { new: true });
    
    res.status(200).json({ message: "Profile updated successfully", profile: user, filePath: req.file.path });
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
