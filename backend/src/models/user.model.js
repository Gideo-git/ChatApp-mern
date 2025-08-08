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
