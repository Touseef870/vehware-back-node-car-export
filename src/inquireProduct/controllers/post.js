import Response from '../../../class/response.js';
import postData from "../services/post.js"
import { isValidMongooseId, sendEmail, wait } from "../../../utils/index.js"
import getDataById from "../../product/services/getById.js"
import { inquiryAgentTemp, inquirySellerTemp } from "../../../email template/index.js"

const postController = async (req, res) => {
    await wait(2000);
    const response = new Response(res);

    const { productId, name, email, country, number, city, remarks } = req.body;

    try {

        const isValidProductId = isValidMongooseId(productId)
        if (!isValidProductId) {
            return response.error(null, 'Invalid Product ID');
        }

        const responseProduct = await getDataById(productId);
        if (!responseProduct) {
            return response.error(null, 'Product not found');
        }

        const findProduct = responseProduct.toObject();

        if (!findProduct) {
            return response.error(null, 'Product not found');
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
        if (!data) {
            return response.error(null, 'Unfortunatly, Inquiry not sent');
        }


        const inquiryDetails = {
            productData: findProduct,
            inquireData: data
        }


        const inquiryAgentEmail = await sendEmail({ data: inquiryDetails, customerEmail: data.email, template: inquiryAgentTemp, subject: 'Inquiry For Cars' })
        if (!inquiryAgentEmail.success) {
            return response.error(inquiryAgentEmail.error, 'Failed to send agent email');
        }

        const inquirySellerEmail = await sendEmail({ data: inquiryDetails, customerEmail: process.env.EMAIL_USER, template: inquirySellerTemp, subject: "New Inquiry Received For Cars" })
        if (!inquirySellerEmail.success) {
            return response.error(inquirySellerEmail.error, 'Failed to send seller email');
        }

        return response.success(null, 'Inquiry Send successfully');
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