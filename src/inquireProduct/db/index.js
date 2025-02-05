import Model from "../models/index.js";

const getAll = async ({ limit, skip }) => await Model.find().limit(limit).skip(skip);

const addData = (data) => new Model(data).save().then((user) => user.toObject());

const deleteById = async (id) => await Model.findByIdAndDelete(id);

const updateById = async (id, data) => await Model.findByIdAndUpdate(id, data);


export {
    getAll,
    addData,
    deleteById,
    updateById
}