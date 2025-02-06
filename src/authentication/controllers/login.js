import Response from '../../../class/response.js';
import login from '../services/get.js';
import generateToken from '../../../utils/generateToken.js';

const loginController = async (req, res) => {
    const response = new Response(res);

    let userLogin = {};
    userLogin.email     = req.body.email;
    userLogin.password  = req.body.password;

    let messages = [];
    userLogin.email ? null : messages.push("email is required");
    userLogin.password ? null : messages.push("password is required");

    if (messages.length > 0) {
        return response.error(messages, "validation failed");
    }

    try {
        const responseCredential = await login(userLogin);
        if (!responseCredential) {
            return response.error("this email is not registered");
        }

        const isPasswordMatch = await responseCredential.isPasswordValid(userLogin.password);
        if (!isPasswordMatch) {
            return response.error("the passowrd is incorrect");
        }

        let credential = responseCredential.toObject();
        const token = generateToken(credential);

        let credentialInfo = {
            _id         : credential._id,
            name        : credential.name,
            email       : credential.email,
            country     : credential.country,
            token       : token,
        };

        return response.success(credentialInfo, 'login successfully');
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

export default loginController;