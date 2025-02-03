import { getAll } from "../db/index.js";



async function getData({ limit, skip, search }) {

    const productQuery = getAll({ limit, skip })

    if (search) {
        productQuery.where('name').regex(new RegExp(search, 'i'));
    }

    const product = await productQuery;

    return product
}

export default getData;