import { getById } from "../db/index.js";

export default async function getByIdService(id) {
    return await getById(id);
}