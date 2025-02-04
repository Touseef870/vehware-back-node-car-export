import { getAll } from "../db/index.js";

async function getData({ limit, skip, filters }) {
    return getAll({ limit, skip, filters });
}

export default getData;