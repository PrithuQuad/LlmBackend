import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Admin emails list (can be moved to env/config later)
    const adminEmails = process.env.ADMIN_EMAILS.split(",");

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    // If the user does not exist, create a new one and assign a role
    if (!user) {
      // Assign "admin" role if the email is in the adminEmails list, otherwise "user"
      const role = adminEmails.includes(email) ? "admin" : "user";
      
      // Create the new user with the assigned role
      user = await User.create({
        email,
        role, // Save the role to the user
      });
    }

    // Generate OTP and verify token as before
    const otp = Math.floor(Math.random() * 1000000);

    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      expiresIn: "5m",
    });

    // Send OTP email
    await sendMail(email, "ChatBot", otp);

    // Send back response including the role
    res.json({
      message: "Otp sent to your mail",
      verifyToken,
      role: user.role, // Send the role back to the frontend
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;

    // Verify the OTP token
    const verify = jwt.verify(verifyToken, process.env.Activation_sec);

    // If the verification failed, send an error response
    if (!verify)
      return res.status(400).json({
        message: "OTP Expired",
      });

    // If the OTP doesn't match, send an error response
    if (verify.otp !== otp)
      return res.status(400).json({
        message: "Wrong OTP",
      });

    // Create a new JWT token with the user's ID and role
    const token = jwt.sign(
      { _id: verify.user._id, role: verify.user.role }, // Include the role in the JWT payload
      process.env.Jwt_sec,
      {
        expiresIn: "5d", // Set the token expiration to 5 days
      }
    );

    // Respond with the success message, user data, and token
    res.json({
      message: "Logged in successfully",
      user: {
        _id: verify.user._id,
        email: verify.user.email,
        role: verify.user.role, // Include the user's role in the response
      },
      token, // Send the newly created JWT token to the frontend
    });
  } catch (error) {
    // Handle any errors that occur during verification
    res.status(500).json({
      message: error.message,
    });
  }
};



export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
