import mongoose from "mongoose";

const confessionSchema=mongoose.Schema({
    headLine:String,
    displayName:String,
    content:String,
    image:String,
    madeBy:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Confession=mongoose.model("Confession",confessionSchema)