import mongoose, { mongo, Schema } from "mongoose";

const CarSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    // sellerEmail: {
    //     type: String,
    //     required: [true, 'Email is required'],
    //     trim: true,
    //     match: [
    //         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //         'Please enter a valid email address'
    //     ]
    // },
    // sellerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, "Pleaes provide seller id"]
    // },
    // price: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },
    inventoryLocation: {
        type: String,
        required: true,
        trim: true
    },
    modelCode: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        match: [/^\d{4}/, "Year format should be YYYY"]
    },
    transmission: {
        type: String,
        required: true,
        enum: ["AT (Automatic)", "MT (Manual)"]
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    drive: {
        type: String,
        required: true,
        enum: ["2WD", "4WD", "AWD"]
    },
    doors: {
        type: String,
        required: true,
    },
    steering: {
        type: String,
        required: true,
        enum: ["LHD (Left-Hand Drive)", "RHD (Right-Hand Drive)"]
    },
    seats: {
        type: Number,
        required: true,
        min: 1
    },
    engineType: {
        type: String,
        required: true,
        trim: true
    },
    bodyType: {
        type: String,
        required: true,
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
    dimensions: {
        type: String,
        required: true,
        trim: true
    },
    m3: {
        type: Number,
        required: true,
        min: 0
    },
    vehicleWeight: {
        type: String,
        required: [true, "Vehicle weight is required"],
    },
    grossVehicleWeight: {
        type: Number,
        required: true,
        min: 0
    },
    maxLoadingCapacity: {
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
    }

}, { timestamps: true });

const ProductModel = mongoose.model("Product", CarSchema);

export default ProductModel;