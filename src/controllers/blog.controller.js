import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Blog } from '../models/blog.model.js'

const createBlog = asyncHandler(async (req, res) => {
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

    const blgopost = await Blog.create({
        headLine,
        displayName,
        content,
        madeBy,
        createdBy: user?._id
    })
    return res.status(200).json(new ApiResponse(200, blgopost, "blgopost created succesfully"))
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.body
    const blgopost = await Blog.findOneAndDelete({ _id: id })
    if(!blgopost){
        throw new ApiError(404,"Info post not found with that id")
    }

    return res.status(200).json(new ApiResponse(200, blgopost, "deletion succesfull"))
})

const listAllBlogs = asyncHandler(async (req, res) => {
    const blgoposts = await Blog.find({});
    return res.status(200).json(new ApiResponse(200, blgoposts, "all blgoposts are fetched"))
})
export { createBlog, deleteBlog, listAllBlogs }