import express from 'express';
import { addstudent, getprojectdata,createSession, getstudentsdata,fetchSession,deleteSession ,attendanceMark, getAttendanceStatus, getAttendanceStatusWithId,dashboard, uploadStudentData,exportData} from '../controllers/adminController.js';
import admin from '../middleware/adminAuth.js'
const adminRouter = express.Router();

// Apply admin middleware to all routes in this router
adminRouter.use(admin);
// adminRouter.post('/attendance', attendance);
// adminRouter.get('/user-data')
adminRouter.post('/addstudent', addstudent); 
adminRouter.post('/createsession', createSession);
adminRouter.post('/attendance/mark', attendanceMark);
adminRouter.post('/attendance/status', getAttendanceStatus);
// adminRouter.get('/attendance/status/:sessionId', getAttendanceStatusWithId);
adminRouter.get('/attendance/status/:sessionId', getAttendanceStatusWithId);

adminRouter.get('/fetchsession', fetchSession);
adminRouter.delete('/deletesession', deleteSession);


adminRouter.get('/getstudent', getstudentsdata);
adminRouter.get('/getproject', getprojectdata);

adminRouter.get('/dashboard',dashboard)

adminRouter.post('/student-data-upload', uploadStudentData)

adminRouter.get('/exportdata', exportData);
export default adminRouter;