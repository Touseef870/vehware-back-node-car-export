import Response from '../../../class/response.js';
import getData from '../services/get.js';

const getController = async (req, res) => {
    const response = new Response(res);

    try {
        const data = await getData();


        return response.success(data, 'Data fetched successfully');
    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        return response.error(messages, "Failed to fetch data");
    }
}

export default getController;