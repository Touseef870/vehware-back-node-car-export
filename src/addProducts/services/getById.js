import { getById } from '../db/index.js';

const getDataById = async (id) => {
    return await getById(id)
}

export default getDataById;