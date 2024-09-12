import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res.status(403).json({
        message: "Please login",
      });

    const decode = jwt.verify(token, process.env.Activation_sec);
    console.log(decode,'this is token info')

    req.user = await User.findById(decode.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};
