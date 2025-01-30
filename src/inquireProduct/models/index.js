import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product ID is required'],
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address'
        ]
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        minlength: [2, 'Country code must be at least 2 characters'],
        maxlength: [56, 'Country name cannot exceed 56 characters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [
            /^\+?[0-9]{10,15}$/,
            'Please enter a valid phone number (10-15 digits, optional + prefix)'
        ]
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        minlength: [2, 'City name must be at least 2 characters long'],
        maxlength: [100, 'City name cannot exceed 100 characters']
    },
    remarks: {
        type: String,
        trim: true,
        maxlength: [500, 'Remarks cannot exceed 500 characters'],
        default: ''
    }
}, {
    timestamps: true
});


const model = mongoose.model('inquiryProduct', userSchema);

export default model;