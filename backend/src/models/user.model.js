import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: [13, 'Must be at least 13 years old']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
        default: null
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
