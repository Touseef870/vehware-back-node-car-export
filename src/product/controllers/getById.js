import Response from '../../../class/response.js';
import getDataById from "../services/getById.js"
import { isValidMongooseId, wait } from '../../../utils/index.js';

export default async function getByIdController(req, res) {
    await wait(2000);
    const response = new Response(res);

    const { id } = req.params;

    const idValid = isValidMongooseId(id);
    if (!idValid) {
        return response.error([], "Invalid ID");
    }

    try {
        const product = await getDataById(id);
        if (!product) {
            return response.error([], "Data not found");
        }
        
        const dataModified = {
            _id                 : product._id,
            name                : product.name,
            description         : product.description,
            chassisNo           : product.chassisNo,
            color               : product.color,
            price               : product.price,
            inventoryLocation   : product.inventoryLocation,
            modelCode           : product.modelCode,
            year                : product.year,
            transmission        : product.transmission,
            drive               : product.drive,
            doors               : product.doors,
            steering            : product.steering,
            seats               : product.seats,
            engineType          : product.engineType,
            bodyType            : product.bodyType,
            engineSize          : product.engineSize,
            mileage             : product.mileage,
            fuelType            : product.fuelType,
            ratings             : product.ratings,
            numOfReviews        : product.numOfReviews,
            stock               : product.stock,
            referenceNo         : product.referenceNo,
            image               : product.images,
            publishAt           : product.createdAt,
        }

        response.success(dataModified);
    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        return response.error(messages, "Failed to fetch data");

    }
}