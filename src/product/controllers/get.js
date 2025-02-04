import Response from '../../../class/response.js';
import getData from "../services/get.js"
import ProductModel from "../models/index.js"

const getController = async (req, res) => {
    const response = new Response(res);

    const { limit, skip } = req.query;

    let recordsLimit = parseInt(limit) || 10;
    let recordsSkip = parseInt(skip) || 0;

    if (recordsLimit > 20) recordsLimit = 20;
    if (recordsLimit < 5) recordsLimit = 5;

    try {

        const allowedFilters = ["name", "modelCode", "year", "bodyType"];

        const filters = Object.fromEntries(
            Object.entries(req.query)
                .filter(([key]) => allowedFilters.includes(key))
                .map(([key, value]) => [key, { $regex: String(value), $options: "i" }])
        );

        let data = await getData({ limit: recordsLimit, skip: recordsSkip, filters });
        if (!data) {
            return response.error(null, 'Data not found');
        }

        let dataModified = data.map((product) => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                inventoryLocation: product.inventoryLocation,
                modelCode: product.modelCode,
                year: product.year,
                transmission: product.transmission,
                color: product.color,
                drive: product.drive,
                doors: product.doors,
                steering: product.steering,
                seats: product.seats,
                engineType: product.engineType,
                bodyType: product.bodyType,
                engineSize: product.engineSize,
                mileage: product.mileage,
                fuelType: product.fuelType,
                dimensions: product.dimensions,
                m3: product.m3,
                vehicleWeight: product.vehicleWeight,
                grossVehicleWeight: product.grossVehicleWeight,
                maxLoadingCapacity: product.maxLoadingCapacity,
                image: product.images,
                publishAt: product.createdAt,
                ratings: product.ratings,
                numOfReviews: product.numOfReviews,
            }
        });


        const totalProducts = await ProductModel.countDocuments(filters);

        const dataPaginate = {
            products: dataModified,
            total: totalProducts,
            limit: recordsLimit,
            skip: recordsSkip,
        }

        return response.success(dataPaginate, "Data Get Successfully");
    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        return response.error(messages, "Internal Server Error", 500);
    }
}

export default getController;