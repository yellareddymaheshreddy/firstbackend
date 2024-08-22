import mongoose from "mongoose";

const blogSchema=mongoose.Schema({
    headLine:String,
    displayName:String,
    content:String,
    madeBy:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Blog=mongoose.model("Blog",blogSchema)