import Response from '../../../class/response.js';
import updateData from "../services/update.js"
import { isValidMongooseId } from '../../../utils/index.js';

const updateController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    const { name, inventoryLocation, modelCode, year, transmission, color, drive, doors, steering, seats, engineType, bodyType, engineSize, mileage, fuelType, stock, description } = req.body;

    const idValid = isValidMongooseId(id);
    if (!idValid) {
        return response.error(null, "Invalid ID");
    }

    if (Object.keys(req.body).length === 0) {
        return response.error(null, "Validation Error: Please include the necessary fields in the request body.");
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
            description: description,
            stock: stock
        }

        const updatedProduct = await updateData(id, requestUpdateData);

        return response.success(updatedProduct, "Data Updated Successfully");
    } catch (error) {
        let messages = [];
        if (error.name === 'ValidationError' && error.errors) {
            for (const field in error.errors) {
                messages.push(error.errors[field].message);
            }
        }
        else {
            messages.push(error.message);
        }

        return response.error(messages, "INTERNEL SERVER ERROR", error);
    }
}

export default updateController;