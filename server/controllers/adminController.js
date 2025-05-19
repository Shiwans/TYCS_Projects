import userModel from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Session from "../models/sessionModel.js";
import Attendance from "../models/attendModel.js";
import { Parser } from "json2csv"; // CSV conversion package
import fs from "fs";
import XLSX from 'xlsx'
import path from "path";

export const addstudent = async (req, res) => {
  const { email, name, rollNo, batch, role, department, year } = req.body;
  try {
    if(!email || !name || !rollNo || !batch || !role || !department || !year) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userExist = await userModel.findOne({ email: email });
    // console.log(userExist);
    if (userExist) {
      console.error("User exist with this email:", email);
      return res.status(401).json({ message: "Email exist" });
    }

    const newS = new userModel({
      name,
      email,
      rollNo,
      batch,
      department,
      year,
      role,
    });

    await newS.save();
    res.status(201).json({ message: "Student added", newS });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Unable to add Student" });
  }
};
// export const attendanceMark = async (req, res) => {
//   try {
//     const { userId, date, status, sessionId } = req.body;

//     // Validate input
//     if (!userId || !date || !status || !sessionId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Convert the string to a Date object
//     const formattedDate = new Date(date);  // Ensure date is in a valid format

//     // Check if attendance is already marked for this student on the same date and session
//     const existingAttendance = await Attendance.findOne({
//       userId,
//       "attendance.sessionId": sessionId,
//       "attendance.date": formattedDate,  // Compare with the Date object
//     });

//     if (existingAttendance) {
//       return res.status(400).json({
//         error: "Attendance for this student has already been marked for this session and date.",
//       });
//     }

//     // Update the existing document or create a new one
//     const updateResult = await Attendance.updateOne(
//       { userId },
//       {
//         $push: {
//           attendance: { date: formattedDate, status, sessionId },
//         },
//       },
//       { upsert: true }
//     );

//     res.status(200).json({
//       message: "Attendance marked successfully",
//       result: updateResult,
//     });
//   } catch (error) {
//     console.error("Error updating attendance:", error);
//     res.status(500).json({ message: "Failed to mark attendance" });
//   }
// };

export const attendanceMark = async (req, res) => {
  try {
    const {
      userId,
      name,
      rollNo,
      date,
      status,
      projectName,
      sessionNo,
      sessionId,
    } = req.body;

    // Validate input
    if (
      !userId ||
      !name ||
      !rollNo ||
      !date ||
      !status ||
      !sessionId ||
      !projectName ||
      !sessionNo
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert the status to match enum format (capitalize first letter)
    const formattedStatus =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    // Check if the provided status is valid
    if (!["Present", "Absent"].includes(formattedStatus)) {
      return res
        .status(400)
        .json({ error: "Invalid status value. Use 'Present' or 'Absent'." });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    // Convert date to a Date object
    const formattedDate = new Date(date);

    // Find the student attendance record
    const studentAttendance = await Attendance.findOne({ userId });

    if (studentAttendance) {
      // Check if attendance is already marked for the same date and session
      const existingEntry = studentAttendance.attendance.find(
        (entry) =>
          entry.sessionId.toString() === sessionId &&
          entry.date.toISOString().split("T")[0] ===
            formattedDate.toISOString().split("T")[0]
      );

      if (existingEntry) {
        return res.status(400).json({
          error: "Attendance already marked for this session and date.",
        });
      }

      const student = session.students.find(
        (student) => student.userId === userId
      );

      // console.log("stu",formattedStatus)
      if (student) {

        // Update the status of the student
        student.status = formattedStatus;

        // Update the present or absent count based on the new status
        if (formattedStatus === "Present") {
          session.presentCount += 1;
        } else if (formattedStatus=== "Absent") {
          session.absentCount += 1;
        }

        // Save the updated session
        await session.save();
      }
      // const existingAttendance = await Attendance.findOne({ userId });

      // if (existingAttendance) {
      //   // Find if the user already has an attendance entry for this session
      //   const existingRecord = existingAttendance.attendance.find(
      //     (entry) =>
      //       entry.date.toISOString() === formattedDate &&
      //       entry.sessionId.toString() === sessionId
      //   );

      //   if (existingRecord) {
      //     // If changing status, adjust totalPresent & totalAbsent
      //     if (existingRecord.status !== formattedStatus) {
      //       if (existingRecord.status === "Present") {
      //         existingAttendance.totalPresent -= 1;
      //       } else {
      //         existingAttendance.totalAbsent -= 1;
      //       }

      //       if (formattedStatus === "Present") {
      //         existingAttendance.totalPresent += 1;
      //       } else {
      //         existingAttendance.totalAbsent += 1;
      //       }

      //       existingRecord.status = formattedStatus; // Update status
      //     }
      //   } else {
      //     // If no existing record, add new attendance entry
      //     existingAttendance.attendance.push({
      //       date: formattedDate,
      //       status: formattedStatus,
      //       sessionId,
      //       projectName,
      //       sessionNo,
      //     });

      //     if (formattedStatus === "Present") {
      //       existingAttendance.totalPresent += 1;
      //     } else {
      //       existingAttendance.totalAbsent += 1;
      //     }
      //   }
      // }
      // await existingAttendance.save();
      // Update existing attendance record

      const updatedAttendance = await Attendance.findOneAndUpdate(
        { userId },
        {
          $push: {
            attendance: {
              date: formattedDate,
              status: formattedStatus,
              sessionId,
              projectName,
              sessionNo,
            },
          },
          $inc: {
            [formattedStatus === "Present" ? "totalPresent" : "totalAbsent"]: 1,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Attendance updated successfully",
        data: updatedAttendance,
      });
    } else {
      // Create new attendance record
      const newAttendance = new Attendance({
        userId,
        name,
        rollNo,
        attendance: [
          {
            date: formattedDate,
            status: formattedStatus,
            sessionId,
            projectName,
            sessionNo,
          },
        ],
        totalPresent: formattedStatus === "Present" ? 1 : 0,
        totalAbsent: formattedStatus === "Absent" ? 1 : 0,
      });

      await newAttendance.save();
      return res.status(201).json({
        message: "Attendance created successfully",
        data: newAttendance,
      });
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

//NEW
// Route: /admin/attendance/status
// New function for getAttendanceStatus
export const getAttendanceStatus = async (req, res) => {
  try {
    const { userId, date, sessionId } = req.body;

    if (!userId || !date || !sessionId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert date string to Date object for accurate comparison
    const formattedDate = new Date(date);
    // console.log(formattedDate);
    // Fetch attendance record for the student
    const attendance = await Attendance.findOne({
      userId,
      "attendance.date": formattedDate, // Match the exact date
      "attendance.sessionId": sessionId,
    });

    if (!attendance) {
      return res.status(404).json({ status: null });
    }

    // Find the specific attendance record for the student on that date and session
    const record = attendance.attendance.find(
      (att) =>
        new Date(att.date).toDateString() === formattedDate.toDateString() &&
        att.sessionId.toString() === sessionId
    );

    if (record) {
      // console.log(record.status);
      return res.status(200).json({ status: record.status });
    } else {
      return res.status(404).json({ status: null });
    }
  } catch (error) {
    console.error("Error fetching attendance status:", error);
    res.status(500).json({ error: "Failed to fetch attendance status" });
  }
};
// export const getAttendanceStatusWithId = async (req, res) => {
//   console.log("Getting Attendance Status");
//   try {
//     const { sessionId } = req.params;

//     // Fetch attendance records and populate student details
//     const attendanceRecords = await Attendance.find({
//       "attendance.sessionId": sessionId,
//     }).populate("userId", "name"); // Populate only name field from User

//     if (!attendanceRecords || attendanceRecords.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No attendance records found for this session" });
//     }

//     // Process the attendance data safely
//     const attendanceData = attendanceRecords
//       .map((record) => {
//         if (!record.userId) {
//           console.warn("Missing userId for attendance record:", record._id);
//           return null; // Skip this record if userId is null
//         }

//         return {
//           userId: record.userId._id,
//           name: record.userId.name || "Unknown",
//           attendance: record.attendance.filter(
//             (a) => a.sessionId.toString() === sessionId
//           ),
//         };
//       })
//       .filter(Boolean); // Remove null values from the array
//       console.log(attendanceData.attendance);
//     res.status(200).json({ attendance: attendanceData });
//   } catch (error) {
//     console.error("Error fetching attendance status:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getAttendanceStatusWithId = async (req, res) => {
  // console.log("Getting Attendance Status");

  try {
    const { sessionId } = req.params;

    // Fetch attendance records for the given sessionId
    const attendanceRecords = await Attendance.find({
      attendance: { $elemMatch: { sessionId: sessionId } },
    });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res
        .status(404)
        .json({ error: "No attendance records found for this session" });
    }

    // Extract only the 'status' from the attendance array
    const attendanceStatus = attendanceRecords.map((record) => {
      const sessionAttendance = record.attendance.find(
        (a) => a.sessionId.toString() === sessionId
      );
      return {
        userId: record.userId,
        status: sessionAttendance ? sessionAttendance.status : "Unknown",
      };
    });

    // console.log(attendanceStatus);
    res.status(200).json({ attendanceStatus });
  } catch (error) {
    console.error("Error fetching attendance status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//creating sesssion
export const createSession = async (req, res) => {
  const { sessionNo, date, batch, project, department, year } = req.body;
  // Validate required fields
  if (!department || !year || !project || !batch || !date || !sessionNo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch and filter projects with populated user data
    const existingSession = await Session.findOne({
      department,
      year,
      date,
      project,
      batch,
      sessionNo,
    });

    if (existingSession) {
      return res.status(400).json({ message: "Session already exists." });
    }

    //this will filter samne session as with same sessionname there could not be others
    const existingSessionName = await Session.findOne({
      department,
      batch,
      year,
      project,
      sessionNo
    })
    if(existingSessionName) {
      return res.status(400).json({message:"This session has already in db.Same name session can't be created"})
    }

    // Fetch and filter projects with populated user data
    const projects = await Project.find().populate({
      path: "userId", // Populate the user details
      select: "department year batch rollNo name", // Fetch only required fields
    });

    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No projects found in the database." });
    }

    // Filter projects based on criteria
    const filteredProjects = projects.filter((projectData) => {
      const user = projectData.userId;
      return (
        user &&
        user.department === department &&
        user.year === year &&
        (batch === "All" || user.batch === batch) && // Handle 'All' or specific batch
        projectData.project === project // Match the provided project
      );
    });

    if (!filteredProjects.length) {
      return res
        .status(404)
        .json({ message: "No projects match the given criteria." });
    }

    // Prepare student data from filtered projects
    const studentData = filteredProjects.map((projectData) => ({
      rollNo: projectData.userId.rollNo,
      name: projectData.userId.name,
      projectName: projectData.project, // Assuming projectData has 'project' field
      email: projectData.userId.email || null, // Include additional fields if necessary
      userId: projectData.userId._id,
      status: "Absent", // Default status
    }));

    // Create a new session
    const newSession = new Session({
      department,
      year,
      project,
      batch,
      date,
      sessionNo,
      students: studentData,
    });

    // Save the session
    await newSession.save();

    // Return success response
    res
      .status(201)
      .json({ message: "Session added successfully", session: newSession });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session", error });
  }
};

export const getstudentsdata = async (req, res) => {
  try {
    const users = await userModel
    .find() // Fetch only students
    .select('email rollNo department batch year') // Select necessary fields
    .populate('attendance', 'totalPresent') // Populate only totalPresent
    .lean(); // Convert Mongoose docs to plain JSON
// Fetch all users from the database
    if (users.length === 0 || !users) {
      // Check if the array is empty
      console.error("No users found");
      return res.status(404).json({ message: "No users found" });
    }
    const studentsData = users.map(user => ({
      ...user,
      noOfDaysPresent: user.attendance?.[0]?.totalPresent || "-" // Default to 0 if not available
    }));

    // console.log("students data",studentsData)
    res.status(200).json({ message: "Students fetched", data: studentsData });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Unable to fetch students", error });
  }
};

export const fetchSession = async (req, res) => {
  try {
    const session = await Session.find(); // Fetch all users from the database
    if (session.length === 0) {
      console.error("No Session found");
      return res.status(404).json({ message: "No Session found" });
    }

    res.status(200).json({ message: "Session fetched", session });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Unable to fetch sessions", error });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await Session.findByIdAndDelete(sessionId);

    if (!session) {
      return res
        .status(404)
        .json({ message: "No session found with the given ID" });
    }

    // Now, delete all attendance records associated with this session
    // const deletedAttendance = await Attendance.updateMany(
    //   { "attendance.sessionId": sessionId }, // Find all attendance records with this sessionId
    //   { $pull: { attendance: { sessionId } } } // Remove the sessionId from the attendance array
    // );

    // // If no attendance records were updated, return a message
    // if (deletedAttendance.modifiedCount === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No attendance records found for this session" });
    // }

    // Find all users whose attendance contains this sessionId
    const affectedUsers = await Attendance.find({ "attendance.sessionId": sessionId });

    if (!affectedUsers.length) {
      return res.status(404).json({
        message: "No attendance records found for this session",
      });
    }

    // Remove attendance entries related to this session
    await Attendance.updateMany(
      { "attendance.sessionId": sessionId },
      { $pull: { attendance: { sessionId } } }
    );

    // Recalculate totalPresent and totalAbsent for affected users
    for (const user of affectedUsers) {
      const updatedAttendance = await Attendance.findById(user._id);

      if (updatedAttendance) {
        const newTotalPresent = updatedAttendance.attendance.filter(
          (entry) => entry.status === "Present"
        ).length;
        const newTotalAbsent = updatedAttendance.attendance.filter(
          (entry) => entry.status === "Absent"
        ).length;

        // Update the totalPresent and totalAbsent in DB
        await Attendance.findByIdAndUpdate(user._id, {
          totalPresent: newTotalPresent,
          totalAbsent: newTotalAbsent,
        });
      }
    }

    // Return success message
    res.status(200).json({
      message: "Session and associated attendance records deleted successfully",
      session,
      // deletedAttendanceCount: deletedAttendance.modifiedCount,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Unable to fetch sessions", error });
  }
};

export const getprojectdata = async (req, res) => {
  try {
    const users = await Project.find(); // Fetch all users from the database
    if (users.length === 0) {
      // Check if the array is empty
      console.error("No projects found");
      return res.status(404).json({ message: "No project found" });
    }

    res.status(200).json({ message: "Projects fetched", data: users });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Unable to fetch Projects", error });
  }
};

export const dashboard = async (req, res) => {
  try {
    const { project } = req.query; // Get project from query

    const totalStudents = await userModel.countDocuments({ role: "student" });
    const projectOneStudents = await userModel.countDocuments({
      department: "CS",
      year: "2024-2025",
    });
    const projectOneCompleted = await Project.countDocuments({
      department: "CS",
      project,
      year: "2024-2025",
    });
    const projectOneNotUploaded = projectOneStudents - projectOneCompleted;
    const totalSessions = await Session.countDocuments({
      department: "CS",
      project,
      year: "2024-2025",
    });
    const latestProjects = await Project.find({
      project,
      department: "CS",
      year: "2024-2025",
    })
      .sort({ createdAt: -1 })
      .limit(5);
    const sessions = await Session.find().sort({ date: 1 });
    res.json({
      totalStudents,
      projectOneStudents,
      projectOneCompleted,
      projectOneNotUploaded,
      totalSessions,
      latestProjects,
      sessions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

export const uploadStudentData = async (req, res) => {
  try {
    let { students } = req.query;
    // console.log(students);
    if (typeof students === "string") {
      students = JSON.parse(students);
    }
    if (!Array.isArray(students)) {
      return res.status(400).json({ error: "Invalid students data format" });
    }
    const bulkOps = students?.map((student) => ({
      updateOne: {
        filter: { rollNo: student.rollNo },
        update: { $setOnInsert: student }, // Only set if the document does not exist
        upsert: true, // Insert if the document doesn't exist
      },
    }));

    const result = await userModel.bulkWrite(bulkOps);
    console.log(`${result.upsertedCount} new student(s) inserted`);
    console.log(`${result.modifiedCount} existing student(s) updated`);
  } catch (error) {
    console.error("Error connecting to MongoDB or updating data:", error);
  }
};


// const users = await userModel.find({ role: 'student' })
//     .select('name email rollNo department batch year')
//     .lean();

// const userIds = users.map(user => user._id);

// // Fetch projects where userId matches
// const projects = await Project.find({ user: { $in: userIds } })
//     .select('title deployed github user')
//     .lean();

// // Fetch attendance where userId matches
// const attendance = await Attendance.find({ user: { $in: userIds } })
//     .select('attendance totalPresent totalAbsent user')
//     .lean();

// // Merge manually
// const usersWithDetails = users.map(user => ({
//     ...user,
//     projects: projects.filter(project => project.user.toString() === user._id.toString()),
//     attendance: attendance.filter(att => att.user.toString() === user._id.toString())
// }));

// console.log(usersWithDetails);

// export const exportData = async (req, res) => {
//   try {
//     // Get query parameters
//     const { department, year, project } = req.query;

//     // Build filters
//     const sessionFilter = {};
//     if (department) sessionFilter.department = department;
//     if (year) sessionFilter.year = year;
//     // if (project) sessionFilter.project = new mongoose.Types.ObjectId(project); // Ensure ObjectId for project filter
//     if (project) sessionFilter.project = project; // Ensure ObjectId for project filter

//     const userss = await userModel.find({ role: 'student' })
//     .populate({ path: 'projects', select: 'title deployed github' })
//     .populate({ path: 'attendance', select: 'attendance totalPresent totalAbsent' })
//     .lean();
  
//   console.log("Fetched Users with Projects & Attendance:", userss);
//     // Fetch all data in parallel (Resilient Queries)
//     const [sessionResult, userResult] = await Promise.allSettled([
//       Session.find(sessionFilter).sort({ date: 1 }).lean(),
//       userModel.find({ role: 'student' })
//         .select('name email rollNo department batch year')
//         .populate('projects', 'title deployed github')
//         .populate('attendance', 'attendance totalPresent totalAbsent')
//         .lean(),
//     ]);

//     // Handle query results
//     const sessions = sessionResult.status === "fulfilled" ? sessionResult.value : [];
//     const users = userResult.status === "fulfilled" ? userResult.value : [];

//     if (!sessions.length && !users.length) {
//       return res.status(404).json({ success: false, message: "No data found for the given filters." });
//     }

//     // Transform data
//     const transformedData = users.map((user) => {
//       const userProject = user.projects?.[0] || {}; // Default empty object if no project found
//       const userAttendance = user.attendance?.[0] || {}; // Default empty object if no attendance found

//       // Base record with user info
//       const record = {
//         "Roll No": user.rollNo,
//         "Name": user.name,
//         "Email": user.email,
//         "Department": user.department,
//         "Batch": user.batch,
//         "Year": user.year,
//         "Project Title": userProject.title || "Not Submitted",
//         "Project Link": userProject.deployed || "Not Submitted",
//         "Github Link": userProject.github || "Not Submitted",
//         "Total Present": userAttendance.totalPresent || 0,
//         "Total Absent": userAttendance.totalAbsent || 0,
//       };

//       // Add session-wise attendance
//       sessions.forEach((session) => {
//         const sessionAttendance = Array.isArray(userAttendance?.attendance)
//           ? userAttendance.attendance.find(a => a.sessionId?.toString() === session._id.toString())
//           : undefined;

//         record[`${session.project} - ${session.sessionNo} (${new Date(session.date).toLocaleDateString()})`] =
//           sessionAttendance?.status || "Not Marked";
//       });

//       return record;
//     });

//     // Send response
//     res.json({ success: true, data: transformedData });

//   } catch (error) {
//     console.error("Export error:", error);
//     res.status(500).json({ success: false, message: "Failed to export data", error: error.message });
//   }
// };


// Working except session
export const exportData = async (req, res) => {
  try {
    const { department, year, project } = req.query;  

    const sessionFilter = {};
    if (department) sessionFilter.department = department;
    if (year) sessionFilter.year = year;
    if (project) sessionFilter.project = project;

    const [sessionResult, userResult] = await Promise.allSettled([
      Session.find(sessionFilter).sort({ date: 1 }).lean(),
      userModel.find({ role: "student" })
        .select("name email rollNo department batch year")
        .populate("projects", "title deployed github")
        .populate("attendance", "attendance totalPresent totalAbsent")
        .lean(),
    ]);

    const sessions = sessionResult.status === "fulfilled" ? sessionResult.value : [];
    const users = userResult.status === "fulfilled" ? userResult.value : [];

    if (!sessions.length && !users.length) {
      return res.status(404).json({ success: false, message: "No data found for the given filters." });
    }

    const transformedData = users.map((user) => {
      const userProject = user.projects?.[0] || {};
      const userAttendance = user.attendance?.[0] || {};
      let record = {
        "Roll No": user.rollNo || "N/A",
        "Name": user.name || "N/A",
        "Email": user.email || "N/A",
        "Batch": user.batch,
        "Total Present": userAttendance.totalPresent || 0,
        "Total Absent": userAttendance.totalAbsent || 0,
        "Project Title": userProject.title || "Not Submitted",
        "Project Link": userProject.deployed ? { t: "n", f: `HYPERLINK("${userProject.deployed}", "Project Link")` } : "Not Submitted",
        "Github Link": userProject.github ? { t: "n", f: `HYPERLINK("${userProject.github}", "Github Repo")` } : "Not Submitted",
      };

      sessions.forEach((session) => {
        const sessionAttendance = userAttendance.attendance?.find(
          (a) => a.sessionId?.toString() === session._id.toString()
        );
      
        record[`${session.sessionNo} (${new Date(session.date).toLocaleDateString("en-GB")})`] =
          sessionAttendance?.status || "Not Marked";
      });

      return record;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(transformedData, {
      cellDates: true,
    });

    worksheet["!cols"] = [
      { wch: 7 },
      { wch: 20 },
      { wch: 35 },
      { wch: 10 }, // Batch
      { wch: 12 },
      { wch: 12 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      ...sessions.map(() => ({ wch: 15 })), // Dynamic session columns
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "ExportedData");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader("Content-Disposition", "attachment; filename=export.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    res.send(excelBuffer);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ success: false, message: "Failed to export data", error: error.message });
  }
}