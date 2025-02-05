import Response from '../../../class/response.js';
import deleteData from "../services/delete.js"
import { isValidMongooseId } from '../../../utils/index.js';

const deleteController = async (req, res) => {
    const response = new Response(res);
    const { id } = req.params

    const idValid = isValidMongooseId(id);
    if (!idValid) {
        return response.error([], "Invalid ID");
    }

    try {

        const responseDeleteProduct = await deleteData(id);
        if (!responseDeleteProduct) {
            return response.error(null, "Sorry! Data Could not Deleted, Please Try Again");
        }

        return response.success(null, 'Deleted Successfully');
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

export default deleteController;