import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { captainModel } from "../models/captain.model.js";
import { blacklisttokenModel } from "../models/blacklisttoken.model.js";
import { subscribeToQueue } from "../service/rabbit.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const captain = await captainModel.findOne({ email });

    if (captain) {
      return res.status(400).json({ message: "captain already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newCaptain = new captainModel({ name, email, password: hash });

    await newCaptain.save();

    const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("captainToken", token);

    delete newCaptain._doc.password;

    res.send({
      message: "captain registered successfully",
      newCaptain,
      captainToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "captain does not exist" });
    }

    const isMatch = await bcrypt.compare(password, captain.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete captain._doc.password;

    res.cookie("captainToken", token);

    res.send({
      message: "captain logged in successfully",
      captain,
      captainToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.captainToken;
    await blacklisttokenModel.create({ token });
    res.clearCookie("captainToken");
    res.send({ message: "captain logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    res.send(req.captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id);
    captain.isAvailable = !captain.isAvailable;
    await captain.save();
    res.send(captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// subscribeToQueue("new-ride", (data) => {
//   console.log(JSON.parse(data));
// });