import cloudinary from 'cloudinary';

const deleteCloudinaryImages = async (publicIds, options = {}) => {
    try {
        // Validate maximum 6 images
        if (!publicIds || publicIds.length === 0) {
            throw new Error('No public IDs provided for deletion.');
        }
        if (publicIds.length > 6) {
            throw new Error('Maximum 6 images can be deleted at once.');
        }

        // Single API call for bulk deletion (best for <=100 images)
        const result = await cloudinary.v2.api.delete_resources(publicIds, {
            resource_type: 'image',
            invalidate: true,
            type: 'upload',
            ...options
        });

        // Check actual deletion status
        const failedDeletions = Object.entries(result.deleted)
            .filter(([_, status]) => status !== 'deleted')
            .map(([id]) => id);

        if (failedDeletions.length > 0) {
            throw new Error(`Failed to delete: ${failedDeletions.join(', ')}`);
        }

        return result.deleted;

    } catch (error) {
        throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
};

export default deleteCloudinaryImages;




// import cloudinary from 'cloudinary';

// const deleteCloudinaryImages = async (publicIds, options = {}) => {
//     try {
//         if (!publicIds || publicIds.length === 0) {
//             throw new Error('No public IDs provided for deletion.');
//         }

//         const deleteResults = await Promise.all(
//             publicIds.map(publicId => {
//                 return cloudinary.v2.uploader.destroy(publicId, {
//                     resource_type: 'image',
//                     invalidate: true,
//                     ...options
//                 });
//             })
//         );

//         return deleteResults;
//     } catch (error) {
//         throw new Error(`Cloudinary deletion failed: ${error.message}`);
//     }
// };

// export default deleteCloudinaryImages;