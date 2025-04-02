import express from "express"
const router = express.Router();
import mongoose from "mongoose"
import { Router } from "express";
import  cors from "cors"
import * as dotenv from "dotenv"
import { userModel ,contactModel} from "../models/db.js";
import {z} from "zod"
import bcrypt from "bcrypt"
const Salt_Rounds =10;
import { error } from "console";

dotenv.config()

// console.log(process.env.SECRET_KEY)
const databaseurl = process.env.DATABASE_URL 

router.get("/status" , (req,res)=>{
  res.json({
    message:"Server is Up",
    serverTime: Date.now(),
  })
})

router.post("/register", async (req, res) => {
const RequiredBody = z.object({
  firstName:z.string().min(3).max(10),
  email:  z.string().min(3).max(50).email(),
  password: z.string()
          .min(5, "Password must be at least 5 characters long")
          .max(20, "Password must be at most 20 characters long")
          .regex(/[0-9]/, "Password must contain at least one number")
})

const Parsebodywithsucess = RequiredBody.safeParse(req.body);
if(!Parsebodywithsucess){
  return res.status(500).json({
    message:"Enter the Valid Credentials",
    error:true,
 })
}

  const { firstName, email, password } = req.body;
  try{
    if (!firstName || !email || !password) {
      return res.status(400).json({
          message: "Please Enter the Required Fields",
          error: true
      });

  }
  
}catch(err){
  console.log(err);
}
 
   try {
    
    const Hashedpassword = await bcrypt.hash(password,Salt_Rounds)
 const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }

    const user = await userModel.create({
      email,
      password:Hashedpassword,
      firstName
    })
    if(user){
      res.json({
        message:"user created",
        success : true
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      error: true
    });
  }
  
  try {
   
    const user = await userModel.findOne({ email: email });
    
   
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email",
        error: true
      });
    }
    
   
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({
        message: "Incorrect password",
        error: true
      });
    }
    

    res.json({
      message: "User logged in successfully",
      success: true
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
      error: true
    });
  }

  // try {
  //   const user = await userModel.findOne({ email, password });

  //   if (user) {
  //     res.json({ success: true, message: "Login successful" });
  //   } else {
  //     res.status(401).json({ success: false, message: "Invalid credentials" });
  //   }
  // } catch (error) {
  //   console.error("Error during login", error);
  //   res.status(500).json({ success: false, message: "Internal server error" });
  // }
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
