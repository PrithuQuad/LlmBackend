import express from "express";
import {
  loginUser,
  myProfile,
  registerUser,
  verifyUser,
} from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/login", loginUser);
// router.post("/verify", verifyUser);
router.get("/me", isAuth, myProfile);
router.post("/register", registerUser);

export default router;
