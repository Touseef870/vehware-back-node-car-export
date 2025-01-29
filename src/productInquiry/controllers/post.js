import Response from '../../../class/response.js';

const postController = async (req, res) => {
    const response = new Response(res); 

    try {
        return response.success({ key: 'value' }, 'Data fetched successfully');
    } catch (err) {
        response.error({}, 'Failed to fetch data');
    }
}

export default postController;