import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:String,
    image:String,
    rollNo:String,
    email:String,
    password:String
},{timestamps:true})

export const User=mongoose.model("User",userSchema)