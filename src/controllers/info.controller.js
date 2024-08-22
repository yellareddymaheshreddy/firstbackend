import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Info } from '../models/info.model.js'

const createInfo = asyncHandler(async (req, res) => {
    const { headLine, displayName, content, madeBy } = req.body;
    console.log(headLine,displayName,content,madeBy)
    let user;
    try {
        user = await User.findOne({ rollNo: madeBy })
        if (!user) {
            console.log("user doesnot exist")
        }
    } catch (error) {
        console.log("error in fetching user details while createlng the info post")
    }

    const infopost = await Info.create({
        headLine,
        displayName,
        content,
        madeBy,
        createdBy: user?._id
    })
    return res.status(200).json(new ApiResponse(200, infopost, "infopost created succesfully"))
})

const deleteInfo = asyncHandler(async (req, res) => {
    const { id } = req.body
    const infopost = await Info.findOneAndDelete({ _id: id })
    if(!infopost){
        throw new ApiError(404,"Info post not found with that id")
    }
    console.log(infopost)
    // if (!infopost) {
    //     throw new ApiError(404, "infopost is not found")
    // }
    // const response = await Info.deleteOne({ _id: id })
    return res.status(200).json(new ApiResponse(200, infopost, "deletion succesfull"))
})

const listAllInfoPosts = asyncHandler(async (req, res) => {
    const infoposts = await Info.find({});
    return res.status(200).json(new ApiResponse(200, infoposts, "all infoposts are fetched"))
})
export { createInfo, deleteInfo, listAllInfoPosts }