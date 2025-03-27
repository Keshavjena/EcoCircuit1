import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { Schema, Model } from "mongoose";
import { resolve } from "path";
dotenv.config({ path: resolve("./.env") });  // Force dotenv to load .env

// console.log("Database URL:", process.env.DATABASE_URL);

// console.log(process.env.SECRET_KEY)
const databaseurl = process.env.DATABASE_URL

mongoose.connect(databaseurl)
.then(()=>{
     console.log("Database Connected !")
})
.catch((err)=>{
     console.log("Databse Not connected ", err)
     
})
const Scehma = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Scehma ({
     email:{type:String, unique:true},
     password: String,
     FirstName: String,
    
     


})
export const userModel = mongoose.model("user" ,userSchema);
const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
export const contactModel = mongoose.model("contact",contactSchema)