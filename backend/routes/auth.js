import express from "express"
const router = express.Router();
import mongoose from "mongoose"
import { Router } from "express";
import  cors from "cors"
import * as dotenv from "dotenv"
import { userModel ,contactModel} from "../models/db.js";

dotenv.config()

// console.log(process.env.SECRET_KEY)
const databaseurl = process.env.DATABASE_URL 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });

    if (user) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body;

  try {


    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    const newUser = new userModel({ email, firstName, password });
    await newUser.save();

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newSubmission = new Contact({ name, email, message });
    await newSubmission.save();
    res.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
