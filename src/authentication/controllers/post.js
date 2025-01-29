import Response from '../../../class/response.js';
import postData from '../services/post.js';
import generateToken from '../../../utils/generateToken.js';


const postController = async (req, res) => {
    const response = new Response(res);

    let user_create = {};
    user_create.name = req.body.name;
    user_create.email = req.body.email;
    user_create.password = req.body.password;
    user_create.country = req.body.country;

    try {

        const data = await postData(user_create);
        const token = generateToken(data);

        delete data.password;
        delete data.__v;

        data.token = token

        return response.success(data, 'Data Added successfully');
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

        response.error(messages, "Failed to fetch data");
    }

}

export default postController;