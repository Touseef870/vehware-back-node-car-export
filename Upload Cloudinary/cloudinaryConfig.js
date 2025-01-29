import cloudinary from 'cloudinary';
import dotenv from "dotenv";

dotenv.config()

export default function cloudinaryConfig() {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME || "dv3pq6g96",
        api_key: process.env.CLOUD_API_KEY || "747259244364176",
        api_secret: process.env.CLOUD_API_SECRET || "CC_7oZl1e3wc5mdbgXbUh_I-7mk",
    });

};