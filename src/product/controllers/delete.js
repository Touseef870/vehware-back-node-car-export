import Response from '../../../class/response.js';

const deleteController = async (req, res) => {
    const response = new Response(res); 

    try {
        return response.success(null, 'Deleted Successfully');
    } catch (err) {
        response.error({}, 'Internal Server Error', 500);
    }
}

export default deleteController;