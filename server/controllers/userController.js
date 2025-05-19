import Attendance from "../models/attendModel.js";
import Project from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"

// export const getUserData = async (req, res) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.json({ status: 400, message: "login first" }); // If no token, treat as guest
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const { userId } = req.body;
//     const id = decoded.id;
//     const user = await userModel.findById(userId || id);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }
//     res.json({
//       success: true,
//       userData: {
//         // name: user.name,
//         rollno: user.rollNo,
//         department: user.department,
//         batch: user.batch,
//         email: user.email,
//         phoneno: user.phoneNo,
//         year: user.year,
//         profilepic: user.profilepic,
//         // role:user.role,
//         name: user.name,
//       },
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// };
export const getUserData = async (req, res) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.json({ status: 400, message: "Login first" }); // If no token, treat as guest
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // Get user ID from decoded token
  
      const user = await userModel.findById(userId); // Use userId from token directly
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
  
      res.json({
        success: true,
        userData: {
          rollno: user.rollNo,
          department: user.department,
          batch: user.batch,
          email: user.email,
          phoneno: user.phoneNo,
          year: user.year,
          profilepic: user.profilepic,
          name: user.name,
        },
      });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  };
  

export const fetchProjects = async (req, res) => {
  try {
    const data = await Project.find().populate('userId', 'profilepic');
    // console.log("data",data)
    res
      .status(200)
      .json({ message: "Successfully fetched all the projects", data: data });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error fetching projects", error });
  }
};
export const fetchAttendance = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch attendance only for the given user ID
    const data = await Attendance.find({ userId: id });

    if (!data || data.length === 0) {
      return res.json({ message: "No attendance records found" });
    }
    // console.log(data)
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};
export const UserProject = async (req, res) => {
  try {
    const project = await Project.find({ userId: req.user.id });
    // console.log(project)
    if (!project) {
      return res
        .status(404)
        .json({ message: "No project found for this user." });
    }
    res
      .status(200)
      .json({ message: "Successfully fetched your project", data: project });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error fetching your project", error });
  }
};

export const addProject = async (req, res) => {
  try {
    const main = req.user.id; // Get the user ID from the request
    const user = await userModel.findById(main); // Fetch the user details
    const {
      name,
      rollno,
      department,
      description,
      title,
      category,
      project,
      iscompleted,
      batch,
      year,
      deployed,
      future,
      github,
      twitter,
      linkedin,
      instagram,
    } = req.body;

    if (project !== "Project One" && project !== "Project Two") {
      //checking project
      return res
        .status(400)
        .json({
          message:
            'Invalid project label. Only "Project One" and "Project Two" are allowed.',
        });
    }

    const existingProject = await Project.findOne({
      userId: req.user.id,
      project,
    }); //checking if the project already exist
    if (existingProject) {
      return res
        .status(409)
        .json({ message: `You already have a project labeled "${project}".` });
    }

    const existingProjectsCount = await Project.countDocuments({
      userId: req.user.id,
    }); //counting projects uploaded as it should be only 2
    if (existingProjectsCount >= 2) {
      return res
        .status(409)
        .json({ message: "You can only create up to 2 projects." });
    }

    const email = user.email;

    // Create a new project
    const newP = new Project({
      userId: req.user.id,
      name,
      rollno,
      description,
      category,
      department,
      title,
      deployed,
      project,
      iscompleted,
      batch,
      year,
      twitter,
      email,
      linkedin,
      future,
      github,
      instagram,
    });

    // Save the new project
    await newP.save();
    res.status(201).json({ message: "New Project added", newP });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error adding Project", error });
  }
};

export const updateProject = async (req, res) => {
  try {
    // const { name, rollno,description,category,department,year,title,deployed,iscompleted,project,batch,future,github,twitter,linkedin,instagram } = req.body;
    const updateProject = await Project.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updateProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project updated successfully", updateProject });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error updating project", error });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }); // Ensure the project belongs to the user
    if (!project) {
      return res
        .status(404)
        .json({
          message: "Project not found or does not belong to this user.",
        });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    // console.log("Error deleting project", error);
    return res.status(500).json({ message: "Error deleting project", error });
  }
};
