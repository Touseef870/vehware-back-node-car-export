import Response from '../../../class/response.js';
import getData from "../services/get.js"

const getController = async (req, res) => {
    const response = new Response(res);

    try {

        let data = await getData();
        if (!data) {
            return response.error({}, 'Data not found');
        }


        let getAllProduct = data.map((product) => {
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

        return response.success(getAllProduct, 'Data fetched successfully');
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

export default getController;