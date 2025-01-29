import Response from '../../../class/response.js';
import updateData from '../services/update.js';
import { decodeVerifiedToken } from '../../../utils/index.js';
import Model from '../models/index.js';

const updateController = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let { _id } = decodeVerifiedToken(token)

    const response = new Response(res);

    if (req.body.email || req.body.password || req.body._id) {
        const invalidKeys = Object.keys(req.body).filter(key => ['email', 'password', '_id'].includes(key));
        return response.error({}, `You cannot update the following fields: ${invalidKeys.join(', ')}`);
    }


    if (!req.body || Object.keys(req.body).length === 0) {
        return response.error([], "Please provide data to update.");
    }

    try {

        const updatedUser = await Model.findOne({ _id });
        if (!updatedUser) {
            return response.error("User not found");
        }

        const data = await updateData(_id, req.body);

        delete data._doc.password;
        delete data._doc.__v;

        return response.success(data, 'Data Updated successfully');
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

export default updateController;