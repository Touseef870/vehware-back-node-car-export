import Response from '../../../class/response.js';
import updateData from "../services/update.js"
import { isValidMongooseId } from '../../../utils/index.js';

const updateController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;
    
    const { name, inventoryLocation, modelCode, year, transmission, color, drive, doors, steering, seats, engineType, bodyType, engineSize, mileage, fuelType, dimensions, m3, vehicleWeight, grossVehicleWeight, maxLoadingCapacity, stock } = req.body;

    const idValid = isValidMongooseId(id);
    if (!idValid) {
        return response.error(null, "Invalid ID");
    }

    if (Object.keys(req.body).length === 0) {
        return response.error(null, "Request body cannot be empty");
    }


    try {

        const requestUpdateData = {
            name: name,
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
            stock: stock
        }

        const updatedProduct = await updateData(id, requestUpdateData);

        return response.success("OK", "Data Updated Successfully");
    } catch (error) {
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

        return response.error(messages, "INTERNEL SERVER ERROR", error);
    }
}

export default updateController;