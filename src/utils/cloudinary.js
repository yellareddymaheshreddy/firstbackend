import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'






cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_APISECRET 
});


const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath)return null
        const response =await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})

        console.log("File has uploaded Successfully")
        fs.unlinkSync(localFilePath)
        console.log(response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("failed to upload file")
        return null;
    }
}
const deleteOnCloudinary=async(link)=>{
    try {
        const id=link.split("/")
        const pid=id[id.length-1].split(".")
        const response=await cloudinary.uploader.destroy(pid[0])
        return response
    } catch (error) {
        console.log("error in deleting file")
    }
}

export {uploadOnCloudinary,deleteOnCloudinary}