import postData from "../services/post.js"
import Response from '../../../class/response.js';
import { wait, decodeVerifiedToken } from '../../../utils/index.js';
import { getById } from '../../authentication/db/index.js';
import getDataById from "../../addProducts/services/getById.js"
import getByIdService from "../services/getById.js"

export default async function postController(req, res) {
    const response = new Response(res);

    const token = req.headers.authorization.split(' ')[1];
    let { _id } = decodeVerifiedToken(token)

    const { productId, reviewMessage, rating } = req.body;

    try {

        const responseUserExists = await getById(_id);
        if (!responseUserExists) {
            return response.error({}, 'User not found');
        }

        const responseProductExists = await getDataById(productId);
        if (!responseProductExists) {
            return response.error({}, 'Product not found');
        }


        const responseReviewExists = await getByIdService(productId);
        if (responseReviewExists) {

            const existingReview = responseReviewExists.reviews.find(
                (res) => res.userId.toString() === responseUserExists._doc._id.toString()
            );

            if (existingReview) {
                return response.error({}, "Product already reviewed")
            }

            responseReviewExists.reviews.push(
                {
                    userId: responseUserExists._id,
                    name: responseUserExists.name,
                    reviewMessage: reviewMessage,
                    rating: rating
                }
            );

            const totalRating = responseReviewExists.reviews.reduce((acc, rev) => acc + rev.rating, 0);
            responseProductExists.ratings = totalRating / responseReviewExists.reviews.length;

            responseProductExists.numOfReviews = responseReviewExists.reviews.length;

            await responseProductExists.save();

            await responseReviewExists.save();
            return response.success(responseReviewExists, 'Review added successfully');
        }



        const addReview = {
            productId: responseProductExists._id,
            reviews: [
                {
                    userId: responseUserExists._id,
                    name: responseUserExists.name,
                    reviewMessage: reviewMessage,
                    rating: rating
                }
            ],
        }

        const newReview = await postData(addReview);

        responseProductExists.ratings = rating;
        responseProductExists.numOfReviews = 1;

        await responseProductExists.save();

        return response.success(addReview, 'Review added successfully');
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