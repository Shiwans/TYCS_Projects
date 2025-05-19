import express from 'express';
import { logout, loginUser,sendResetOtp, resetPassword, getProfile, userRole, editProfile,storeProfilePicture } from '../controllers/authController.js';

import multer from "multer";
import cloudinary from '../config/cloudinaryConfig.js';
import { CloudinaryStorage } from "multer-storage-cloudinary";
const authRouter = express.Router();
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);
authRouter.post('/send-email', sendResetOtp);
authRouter.post('/set-password', resetPassword);
authRouter.get('/get-profile', getProfile);
authRouter.post('/update-profile', editProfile);
authRouter.get('/user-role', userRole);
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profile_pictures", // Folder name in Cloudinary
    format: async (req, file) => "png", // Convert images to PNG
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique filename
  },
});
// const upload = multer({dest: "uploads/"});
const upload = multer({storage})
console.log(upload);
const uploadMiddleware = upload.single('profilePicture');
authRouter.post('/upload', (req, res, next) => {
  console.log("Route /auth/upload reached");
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: "File upload error", error: err.message });
    }
    console.log("Multer middleware executed");
    next();
  });
}, storeProfilePicture);

export default authRouter;