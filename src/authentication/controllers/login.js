import Response from '../../../class/response.js';
import login from '../services/get.js';
import generateToken from '../../../utils/generateToken.js';
import Model from '../models/index.js';

const loginController = async (req, res) => {
    const response = new Response(res);

    let user_login = {};
    user_login.email = req.body.email;
    user_login.password = req.body.password;

    try {

        const findUser = await Model.findOne({ email: user_login.email });
        if (!findUser) {
            return response.error("User not found");
        }

        const isMatch = await findUser.isPasswordValid(user_login.password);
        if (!isMatch) {
            return response.error("Password is incorrect");
        }

        const data = await login(user_login);

        const token = generateToken(data);

        delete data._doc.password;
        delete data._doc.__v;

        data._doc.token = token

        return response.success(data, 'Login successfully');
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

export default loginController;