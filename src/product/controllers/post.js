import Response from '../../../class/response.js';
import { uploadImageToCloudinary, deleteCloudinaryImages } from '../../../Upload Cloudinary/index.js';
import { decodeVerifiedToken } from "../../../utils/index.js"
import postData from '../services/post.js';

const postController = async (req, res) => {
    const response = new Response(res);

    let { _id, email } = decodeVerifiedToken(req.headers.authorization)

    if (!_id && email) {
        return response.error("the token is invalid");
    }

    const { name, price, inventoryLocation, modelCode, year, transmission, color, drive, doors, steering, seats, engineType, bodyType, engineSize, mileage, fuelType, dimensions, m3, vehicleWeight, grossVehicleWeight, maxLoadingCapacity } = req.body;

    const addProduct = {
        name: name,
        price: price,
        inventoryLocation: inventoryLocation,
        modelCode: modelCode,
        year: year,
        transmission: transmission,
        color: color,
        drive: drive,
        doors: doors,
        steering: steering,
        seats: seats,
        engineType: engineType,
        bodyType: bodyType,
        engineSize: engineSize,
        mileage: mileage,
        fuelType: fuelType,
        dimensions: dimensions,
        m3: m3,
        vehicleWeight: vehicleWeight,
        grossVehicleWeight: grossVehicleWeight,
        maxLoadingCapacity: maxLoadingCapacity,
        sellerEmail: email,
        sellerId: _id,
    }

    let uploadedImages = [];

    try {

        uploadedImages = await uploadImageToCloudinary(req.files.map(file => file.buffer));
        addProduct.images = uploadedImages.map(img => ({
            url: img.secure_url,
            public_id: img.public_id
        }));
        console.log(addProduct, "uploadedImages")

        const newProduct = await postData(addProduct);

        return response.success(newProduct, 'Data added successfully');
    } catch (error) {

        if (uploadedImages?.length > 0) {
            const publicIds = uploadedImages.map(img => img.public_id);
            await deleteCloudinaryImages(publicIds).then(() => console.log("ho gya delete")).catch(error => {
                console.error('Cloudinary cleanup failed:', error);
            });
        }

        let messages = [];
        if (error.name === 'ValidationError' && error.errors) {
            for (const field in error.errors) {
                messages.push(error.errors[field].message);
            }
        }
        else if (error.message.includes('Cloudinary')) {
            messages.push('Image upload failed: ' + error.message);
        }
        else {
            messages.push(error.message);
        }

        return response.error(messages, "Product creation failed");
    }
}

export default postController;