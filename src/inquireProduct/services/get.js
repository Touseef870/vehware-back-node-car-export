import { getAll } from "../db/index.js";



const getData = ({ limit, skip }) => {
    return getAll({ limit, skip });
}

export default getData;