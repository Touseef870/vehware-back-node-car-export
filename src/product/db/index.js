import ProductModel from "../models/index.js";

const getAll = async () => await ProductModel.find();

const addData = (data) => new ProductModel(data).save().then((res) => res.toObject()).catch((err) => { throw err });

const getById = async (id) => await ProductModel.findById({ _id: id });

const updateById = async (id, data) => await ProductModel.findByIdAndUpdate(id, data);

const deleteById = async (id) => await ProductModel.findByIdAndDelete(id);

export {
    getAll,
    addData,
    deleteById,
    updateById,
    getById,
}