import express from "express";
import {
  login,
  logout,
  profile,
  register,
  toggleAvailability,
  waitForNewRide,
} from "../controllers/captain.controller.js";
import { captainAuth } from "../middleware/auth.middlware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", captainAuth, profile);
router.patch("/toggle-availability", captainAuth, toggleAvailability);
router.get("/new-ride", captainAuth, waitForNewRide);


export default router;
