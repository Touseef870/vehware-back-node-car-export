import Response from '../../../class/response.js';
import getDataById from "../services/getById.js"
import { isValidMongooseId, wait } from '../../../utils/index.js';

export default async function getByIdController(req, res) {
    await wait(2000)
    const response = new Response(res);

    const { id } = req.params;

    const idValid = isValidMongooseId(id);
    if (!idValid) {
        return response.error([], "Invalid ID");
    }

    try {
        const resProductReview = await getDataById(id);

        const productReview = {
            _id             : resProductReview._id,
            productId       : resProductReview.productId,
            totalReviews    : resProductReview.reviews.length,
            reviews         : resProductReview.reviews.map((review) => {
                return {
                    _id         : review._id,
                    review      : review.reviewMessage,
                    rating      : review.rating,
                    userId      : review.userId,
                    createdAt   : review.createdAt
                }
            }),
        }


        response.success(productReview, 'Data fetched successfully');
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