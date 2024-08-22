import mongoose from "mongoose";

const infoSchema=mongoose.Schema({
    headLine:String,
    displayName:String,
    content:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    madeBy:String
},{timestamps:true})

export const Info=mongoose.model("Info",infoSchema)