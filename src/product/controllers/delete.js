import Response from '../../../class/response.js';
import deleteData from "../services/delete.js"
import { isValidMongooseId, wait } from '../../../utils/index.js';
import { deleteCloudinaryImages } from "../../../Upload Cloudinary/index.js"

const deleteController = async (req, res) => {
    await wait(2000);
    const response = new Response(res);
    const { id } = req.params

    const idValid = isValidMongooseId(id);
    if (!idValid) {
        return response.error([], "Invalid ID");
    }

    try {

        const responseDeleteProduct = await deleteData(id);
        if (!responseDeleteProduct) {
            return response.error([], "Sorry! Data Could not Deleted, Please Try Again");
        }

        const publicIds = responseDeleteProduct.images.map(img => img.public_id);
        await deleteCloudinaryImages(publicIds)
            .then(() => console.log("image deleted successfully"))
            .catch(error => console.error('Cloudinary cleanup failed:', error));


        return response.success(null, 'Deleted Successfully');
    } catch (err) {
        response.error({}, 'Internal Server Error', 500);
    }
}

export default deleteController;