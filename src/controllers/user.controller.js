import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary,deleteOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import fs from 'fs'


const registerUser=asyncHandler(async(req,res)=>{
    const {email,name,rollNo,password}=req.body
    if([name,email,rollNo,password].some(field=>field?.trim()==="")){
        throw new ApiError(400,"allfields are required")

    }
    const existedUser=await User.findOne({
        $or:[{email},{rollNo}]
    })
    const imageLocalPath=req.file?.path
    if(existedUser){
        fs.unlinkSync(imageLocalPath)
        throw new ApiError(409,"User already exists with same email or rollNo")
    }
    
    // console.log(req.file)
    if(!imageLocalPath){
        throw new ApiError(400,"image is needed")
    }
    const response =await uploadOnCloudinary(imageLocalPath)

    if(!response){
        throw new ApiError(500,"image upload to servver failed")
    }
    const user=await User.create({
        name,
        email,
        image:response.url,
        rollNo,
        password
    })
    const createduser=await User.findById(user._id).select("-password")
    if(!createduser){
        throw new ApiError(500,"something wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createduser,"user registered succesfully")
    )

})

const loginUser=asyncHandler(async(req,res)=>{
    //get login credentials
    //make a dbcl and verify password

    const {email,rollNo,password}=req.body
    if(!email &&!rollNo){
        throw new ApiError(400,"email or rollNo is required")
    }
    const user=await User.findOne({
        $or:[{email},{rollNo}]
    })
    console.log(user)
    if(!user){
        throw new ApiError(404,"user doesnt exist")
    }
    if(user.password!=password){
        throw new ApiError(400,"Invalid password")
    }
    const userinfo=await User.findById(user._id).select("-password")
    return res.status(200).json(new ApiResponse(200,userinfo,"login success"))

})

const changeCurrentPassword=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword,rollNo}=req.body;
    if([oldPassword,newPassword,rollNo].some(field=>field?.trim()==="")){
        throw new ApiError(400,"allfields are required")
    }
    const user=await User.findOne({rollNo})
    if(!user || user.password !=oldPassword){
        throw new ApiError(400,"Invalid credentials")
    }
    // await user.password=newPassword;
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    return res.status(200).json(new ApiResponse(200,user,"password changed successfully"))
    // await User.findOne
})

const updateUserDetails=asyncHandler(async(req,res)=>{
    const {fullName,email,rollNo}=req.body;
    if(!fullName || !email || !rollNo){
        throw new ApiError(400,"all fields are needed");
    }
    const user=await User.findOneAndUpdate(
        {rollNo},
        {
            $set:{
                name:fullName,
                email
            }
        },{new:true}

    ).select("-password")
    res.status(200).json(new ApiResponse(200,user,"updated successfully"))
})
const updateImage=asyncHandler(async(req,res)=>{
    // console.log(req.file)
    const localPath=req.file?.path
    const {rollNo}=req.body
    if(!localPath){
        throw new ApiError(400,"file is required")
    }
    const response=await uploadOnCloudinary(localPath)
    if(!response){
        throw new ApiError(505,"something went wrong while updateing image")
    }
    const user=await User.findOne({rollNo})
    await deleteOnCloudinary(user.image)
    const details=await User.findOneAndUpdate(
        {rollNo},
        {
            $set:{image:response.url}
        },{new:true}
    ).select("-password")
    return res.status(200).json(
        new ApiResponse(200,details,"image uploaded succuesfully")
    )
})
export {registerUser,loginUser,changeCurrentPassword,updateUserDetails,updateImage}