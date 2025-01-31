import Response from '../../../class/response.js';
import { getById } from "../db/index.js";
import { wait } from '../../../utils/index.js';

const getByIdController = async (req, res) => {
    await wait(3000);
    const response = new Response(res);
    const { id } = req.params;

    try {

        const credentialResponse = await getById(id);
        if (!credentialResponse) {
            return response.error("id doesn't match any data");
        }

        const credential = credentialResponse.toObject();
        const credentialInfo = {
            _id     : credential._id,
            name    : credential.name,
            email   : credential.email,
            country : credential.country
        };

        return response.success(credentialInfo, "data fetched successfully");
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

export default getByIdController;