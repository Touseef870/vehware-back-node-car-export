import { getAll } from "../db/index.js";

async function getData({ limit, skip, search }) {
    return getAll({ limit, skip, search });
}

export default getData;