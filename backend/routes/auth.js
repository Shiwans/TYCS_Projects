const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/User');

// Check Email and Send Reset Link
router.post("/setpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id;
    const ltoken = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "5m" });
    const link = `http://localhost:5173/setpassword/${user.email}/${ltoken}`;

    // Uncomment to enable email sending functionality
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'your-email@gmail.com',
    //       pass: process.env.PASS
    //     }
    //   });
      
    // var mailOptions = {
    //     from: 'your-email@gmail.com',
    //     to: email,
    //     subject: 'Set your password for logging in',
    //     text: link
    // };
      
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });

    console.log(link); // For testing purposes

    // In a real-world scenario, you'd send this link via email
    return res.status(200).json({ status: "Reset link sent", link });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Internal server error" });
  }
});

// Verify Token and Return Status
router.get("/setpassword/:email/:ltoken", async (req, res) => {
  const { email, ltoken } = req.params;

  try {
    const user = await User.findOne({ email });
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
});

// Set New Password
router.post('/setpassword/:email/:ltoken', async (req, res) => {
  const { email, ltoken } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User does not exist" });
    }

    const secret = process.env.JWT_SECRET_KEY + user._id; // Your JWT secret
    jwt.verify(ltoken, secret); // Verify the token

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    // const token = userCreated.generateToken();
    return res.status(200).json({ status: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ status: error.message });
  }
});

// Auth Routes
router.post('/login', authController.loginUser);
// router.post('/logout', authController.logoutUser);

module.exports = router;
