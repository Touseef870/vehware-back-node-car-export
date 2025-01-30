import Response from '../../../class/response.js';
import postData from "../services/post.js"
import { isValidMongooseId, sendEmail } from "../../../utils/index.js"
import getDataById from "../../product/services/getById.js"
import { inquiryAgentTemp, inquirySellerTemp } from "../../../email template/index.js"

const postController = async (req, res) => {
    const response = new Response(res);

    const { productId, name, email, country, number, city, remarks } = req.body;

    try {

        const isValidProductId = isValidMongooseId(productId)
        if (!isValidProductId) {
            return response.error({}, 'Invalid Product ID');
        }

        const findProduct = await getDataById(productId);
        if (!findProduct) {
            return response.error({}, 'Product not found');
        }

        const inquiryProduct = {
            productId,
            name,
            email,
            country,
            phoneNumber: number,
            city,
            remarks
        }
        const data = await postData(inquiryProduct);

        const inquiryDetails = {
            productData: findProduct._doc,
            inquireData: data
        }

        const inquiryAgentEmail = await sendEmail({ data: inquiryDetails, customerEmail: data.email, template: inquiryAgentTemp })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending agent email:", error.message);
                response.error({}, 'Failed to send sender email');
            });

        const inquirySellerEmail = await sendEmail({ data: inquiryDetails, customerEmail: findProduct._doc.sellerEmail, template: inquirySellerTemp })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending seller email:", error.message);
                response.error({}, 'Failed to send sender email');
            });


        if (!data) {
            return response.error({}, 'sorry data not saved');
        }



        return response.success({ key: 'value' }, 'Data fetched successfully');
    } catch (error) {
        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        response.error(messages, "Internal Server Error", 500);
    }
}

export default postController;