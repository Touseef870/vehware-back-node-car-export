import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const dataSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [20, "Name must be at most 20 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [25, "Password must be at most 25 characters long"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
}, { timestamps: true });

dataSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

dataSchema.methods.isPasswordValid = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

const Model = mongoose.model("User", dataSchema);

export default Model;