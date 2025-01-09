import express from "express";
import {
  acceptedRide,
  login,
  logout,
  profile,
  register,
} from "../controllers/captain.controller.js";
import { captainAuth } from "../middleware/auth.middlware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", captainAuth, profile);
router.get("/accepted-ride", captainAuth, acceptedRide);

export default router;
