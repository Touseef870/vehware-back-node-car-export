import { model, Schema } from "mongoose";

const ProductReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewMessage: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, "Comment cannot exceed 500 characters"]
    }
}, { timestamps: true });


const ReviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    reviews: [ProductReviewSchema],
}, { timestamps: true });

const ReviewModel = model("Review", ReviewSchema);

export default ReviewModel;