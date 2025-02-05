import Response from '../../../class/response.js';
import getData from "../services/get.js"
import model from "../models/index.js"

const getController = async (req, res) => {
    const response = new Response(res);

    const { limit, skip } = req.query;

    let recordsLimit = parseInt(limit) || 10;
    let recordsSkip = parseInt(skip) || 0;

    if (recordsLimit > 20) recordsLimit = 20;
    if (recordsLimit < 5) recordsLimit = 5;

    try {

        let data = await getData({ limit: recordsLimit, skip: recordsSkip, });
        if (!data) {
            return response.error(null, 'Data not found');
        }

        let dataModified = data.map((product) => {
            return {
                id: product._id,
                productId: product.productId,
                name: product.name,
                email: product.email,
                country: product.country,
                phoneNumber: product.phoneNumber,
                city: product.city,
                remarks: product.remarks,
                createdAt: product.createdAt,
            }
        });


        const totalProducts = await model.countDocuments();

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