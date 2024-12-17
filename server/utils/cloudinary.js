import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (file) => {
    try {

        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return uploadResponse;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload media to Cloudinary.");
    }
};

export const deleteMedia = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
    }
};

export const deleteVideo = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
    } catch (error) {
        console.log(error);
    }
}