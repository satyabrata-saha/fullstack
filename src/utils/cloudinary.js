import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //Upload the file in cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        //file has been uploaded successfull
        console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response


    } catch (err) {
        fs.unlinkSync(localFilePath) //remove the locally saved temp file as the upload operation got failed
        console.error("Error while uploading file on cloudinary", err);
        return null
    }
}

export { uploadOnCloudinary }