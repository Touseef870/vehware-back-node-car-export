import Response from '../../../class/response.js';
import { getById } from "../db/index.js";

const getByIdController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    try {


        const data = await getById(id);
        if (!data) {
            return response.error("User not found");
        }

        delete data._doc.password;
        delete data._doc.__v;

        return response.success(data);
    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        response.error(messages, "Failed to fetch data");
    }
}

export default getByIdController;