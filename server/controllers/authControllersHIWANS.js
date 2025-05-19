import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  try {

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      console.error("Login attempt with unknown email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Use the comparePassword method
    const isMatch = await userExist.comparePassword(password);
    if (isMatch) {
      const token = userExist.generateToken();
      return res.status(200).json({
        message: "Login successful",
        token,
        // userId: userExist._id.toString(),
      });
    } else {
      console.warn("Invalid password for user:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const setpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id;
    const ltoken = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "30m",
    });
    const link = `${process.env.FRONT_URL}/auth/setpassword/${user.email}/${ltoken}`;
    // const link = `https://tycs-projects-frontend-0ds0.onrender.com/setpassword/${user.email}/${ltoken}`;

    // Uncomment to enable email sending functionality
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "g22.shiwans.vaishya@gnkhalsa.edu.in",
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Set your password for logging in",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    // console.log(link);

    return res.status(200).json({ status: "Reset link sent", link });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
};

// Verify Token and Return Status
export const verifytoken = async (req, res) => {
  const { email, ltoken } = req.params;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id;
    jwt.verify(ltoken, secret); // Verifying the token

    // If verified, return status so the front-end can proceed with password reset form
    return res.status(200).json({ status: "Token verified", email });
  } catch (error) {
    return res.status(400).json({ status: error.message });
  }
};

// Set New Password
export const setnewpass = async (req, res) => {
  const { email, ltoken } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id; // Your JWT secret
    jwt.verify(ltoken, secret); // Verify the token

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    return res.status(200).json({ status: "Password updated successfully" });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ status: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ status: "Token expired" });
    }
    return res
      .status(500)
      .json({ status: "Internal server error", error: error.message });
  }
};