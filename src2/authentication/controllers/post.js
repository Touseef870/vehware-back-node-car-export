import Response from '../../../class/response.js';
import postData from '../services/post.js';
import generateToken from '../../../utils/generateToken.js';

const postController = async (req, res) => {
    const response = new Response(res);

    let userInfo = {};
    userInfo.name = req.body.name;
    userInfo.username = req.body.username;
    userInfo.email = req.body.email;
    userInfo.phoneNo = req.body.phoneNo;
    userInfo.password = req.body.password;

    try {

        const credential = await postData(userInfo);
        const token = generateToken(credential);

        let credentialInfo = {
            _id: credential._id,
            name: credential.name,
            username: credential.username,
            email: credential.email,
            phoneNo: credential.phoneNo,
            token: token,
        };

        return response.success(credentialInfo, 'Data Added successfully');
    } catch (error) {

        if (error.code == 11000) {
            let duplicationErrors = {}
            for (let field in error.keyPattern) {
                duplicationErrors[field] = `${field} already exists`
            }
            return response.error(duplicationErrors, "Duplicate Key Error", 400)
        }


        if (error.name === "ValidationError") {
            let validationErrors = {};
            for (let field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            return response.error(validationErrors, "Validation Error", 400);
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