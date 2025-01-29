import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Response from "./../class/response.js";
import multer from "multer";


dotenv.config();

export async function verifyToken(req, res, next) {
    const response = new Response(res);

    const { authorization } = req.headers;
    if (!authorization) {
        return response.error({}, "Authorization header is missing");
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return response.error({}, "Invalid token format");
    }

    const authToken = parts[1];

    try {
        let verified = jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = verified;
        next();

    } catch (error) {
        const errorMsg = req.query.dev == 1 ? error?.message : 'Unauthorized';
        return response.error({}, errorMsg);
    }
}




export function uploadMiddleware(req, res, next) {
    const response = new Response(res);

    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1024 * 1024 }
    }).array('images', 6);

    upload(req, res, (err) => {

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return response.error({}, 'Maximum of 6 images allowed.');
        }

        if (err.code === 'LIMIT_FILE_SIZE') {
            return response.error({}, 'Maximum file size is 10MB');
        }

        if (err) {
            return response.error({}, 'Error uploading image');
        }

        if (!req.files || req.files.length === 0) {
            return response.error({}, 'At least one image is required.');
        }

        if (req.files.length > 6) {
            return response.error({}, 'Maximum of 6 images allowed.');
        }

        next();
    });
}


export default verifyToken;