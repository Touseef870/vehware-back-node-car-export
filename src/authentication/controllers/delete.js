import Response from '../../../class/response.js';
import deleteData from '../services/delete.js';
import deCodeVerifiedToken from '../../../utils/playWithToken.js';
import { wait } from '../../../utils/index.js';

const deleteController = async (req, res) => {
    await wait(3000);
    const token = req.headers.authorization.split(' ')[1]; // need to remove after function modify
    let { _id } = deCodeVerifiedToken(token)

    if (!_id) {
        return response.error("the token is invalid");
    }

    const response = new Response(res);

    try {
        const deletedCredential = await deleteData(_id);

        if (!deletedCredential) {
            return response.error("id doesn't match any data");
        }

        return response.success({ id: _id }, 'Data Deleted successfully');
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

export default deleteController;