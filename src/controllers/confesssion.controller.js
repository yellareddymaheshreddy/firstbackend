import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary,deleteOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import fs from 'fs'
import { Confession } from '../models/confession.model.js'

const createConfession=asyncHandler(async(req,res)=>{
    const {headLine,displayName,content,madeBy}=req.body;
    const localConfessionImg=req.file?.path
    let user;
    try {
        user=await User.findOne({rollNo:madeBy})
        if(!user){
            console.log("user doesnot exist")
        }
    } catch (error) {
        
    }
    if(!localConfessionImg){
        throw new ApiError(400,"image is needed")
    }
    const responce=await uploadOnCloudinary(localConfessionImg)
    // fs.unlinkSync(localConfessionImg)
    if(!responce){
        throw new ApiError(400,"something went wrong while uploading img to server")
    }
    const confession=await Confession.create({
        headLine,
        displayName,
        content,
        madeBy,
        image:responce.url,
        createdBy:user._id
    })
    return res.status(200).json(new ApiResponse(200,confession,"confession created succesfully"))
})

const deleteConfession=asyncHandler(async(req,res)=>{
    const {id}=req.body
    const confession=await Confession.findOne({_id:id})
    if(!confession){
        throw new ApiError(404,"confession is not found")
    }
    const ress=await deleteOnCloudinary(confession.image)
    const response=await Confession.deleteOne({_id:id})
    return res.status(200).json(new ApiResponse(200,response,"deletion succesfull"))
})

const listAllConfessions=asyncHandler(async(req,res)=>{
    const confessions=await Confession.find({});
    return res.status(200).json(new ApiResponse(200,confessions,"all confessions are fetched"))
})
export {createConfession,deleteConfession,listAllConfessions}