import mongoose, { mongo, Schema } from "mongoose";

const CarSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    inventoryLocation: {
        type: String,
        required: [true, "Inventory Location is required"],
        trim: true
    },
    modelCode: {
        type: String,
        required: [true, "Model Code is required"],
        trim: true
    },
    year: {
        type: String,
        required: [true, "Year is required"],
        match: [/^\d{4}/, "Year format should be YYYY"]
    },
    transmission: {
        type: String,
        required: [true, "Transmission is required"],
        enum: ["AT (Automatic)", "MT (Manual)"]
    },
    color: {
        type: String,
        required: [true, "Color is required"],
        trim: true
    },
    drive: {
        type: String,
        required: [true, "Drive is required"],
        enum: ["2WD", "4WD", "AWD"]
    },
    doors: {
        type: String,
        required: [true, "Doors is required"],
    },
    steering: {
        type: String,
        required: [true, "Steering is required"],
        enum: ["LHD (Left-Hand Drive)", "RHD (Right-Hand Drive)"]
    },
    seats: {
        type: Number,
        required: [true, "Seats is required"],
        min: 1
    },
    engineType: {
        type: String,
        required: [true, "Engine Type is required"],
        trim: true
    },
    bodyType: {
        type: String,
        required: [true, "Body Type is required"],
        trim: true
    },
    engineSize: {
        type: String,
        required: [true, "Engine size is required"],
    },
    mileage: {
        type: String,
        required: [true, "Mileage is required"],
    },
    fuelType: {
        type: String,
        required: true,
        enum: ["Petrol", "Diesel", "Hybrid", "Electric"]
    },
    m3: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        url: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, "Invalid image URL"]
        },
        public_id: {
            type: String,
            required: true
        }
    }],
    ratings: {
        type: Number,
        default: 0,
        min: [0, "Ratings cannot be less than 0"],
        max: [5, "Ratings cannot exceed 5"],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Boolean,
        default: true
    },
    referenceNo : {
        type: String,
        required: true,
        unique: true,
    }

}, { timestamps: true });

const ProductModel = mongoose.model("Product", CarSchema);

export default ProductModel;