import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authenticate from "./middleware/userAuth.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import connectDB from "./config/mongodb.js";
import express from "express";
import path from "path"
import cors from "cors";
// const morgan = require("morgan");
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import admin from "./middleware/adminAuth.js";

import multer from "multer";
dotenv.config({ path: "./.env" });
connectDB();
const app = express();
// In your Express app setup
// const cors = require('cors');
app.use(cors({
  origin: `${process.env.FRONT_URL}`, // Your frontend URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'Accept', 'x-access-token'],
}));
app.use((req, res, next) => {
  // console.log(`Request Origin: ${req.headers.origin}, Method: ${req.method}, Path: ${req.path}`);
  res.header('Access-Control-Allow-Origin', `${process.env.FRONT_URL}`);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-csrf-token');
  next();
});
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(express.static(path.join(__dirname, '../client/dist')));


// app.use(morgan("dev"));

//APT Endpoints
app.use("/auth", authRouter);
app.use("", authenticate, userRouter);
app.use("/admin",authenticate, adminRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  // });
  

//MULTER IMPLEMENTATION

// MULTER IMPLEMENTATION END
const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port:${port}`));