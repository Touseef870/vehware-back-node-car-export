import Response from '../../../class/response.js';
import postData from '../services/post.js';
import generateToken from '../../../utils/generateToken.js';

const postController = async (req, res) => {
    const response = new Response(res);

    let userInfo = {};
    userInfo.name       = req.body.name;
    userInfo.email      = req.body.email;
    userInfo.password   = req.body.password;
    userInfo.country    = req.body.country;

    try {

        const credential = await postData(userInfo);
        const token = generateToken(credential);

        let credentialInfo = {
            _id         : credential._id,
            name        : credential.name,
            email       : credential.email,
            country     : credential.country,
            token       : token,
        };

        return response.success(credentialInfo, 'Data Added successfully');
    } catch (error) {

        if (error.code == 11000) {
            return response.error("Email already exists", "Failed to add data");
        }

        if (error.name === "ValidationError") {
            return response.error(error.message);

        }

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