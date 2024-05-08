import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


//we will upload our file on server and then upload it on cloudinary
//after that we will unlink the file from server
//this function will return the response from cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        })
        //file has been uploaded on cloudinary successfully
        console.log("File uploaded successfully on cloudinary",response.url)
        return response;
    }catch(error){
        //unlink file from server that was not uploaded successfully on cloudinary
        fs.unlinkSync(localFilePath)
        return null;
    }
}