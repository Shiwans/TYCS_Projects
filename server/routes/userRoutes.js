import express from 'express';
import { getUserData,fetchProjects, addProject, updateProject, deleteProject,fetchAttendance,UserProject} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/data', getUserData);
userRouter.get('/get-all-project', fetchProjects);
userRouter.get('/user', UserProject);
userRouter.post('/',addProject );
userRouter.post('/attendance', fetchAttendance);
userRouter.put('/:id', updateProject);
userRouter.delete('/:id', deleteProject);

export default userRouter;