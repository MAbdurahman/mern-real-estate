//**************** imports ****************//
import mongoose from "mongoose";


//**************** variables ****************//
const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;
const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

//**************** schema ****************//
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required!'],
        minlength: [4, 'Username must be at least 4 characters!'],
        maxLength: [32, 'Username cannot exceed 32 characters!'],
        unique: [true, 'Username already exists!']
    }, email: {
        type: String,
        trim: true,
        required: [true, 'Email is required!'],
        unique: true,
        match: [email_pattern, 'Enter a valid email address!']
    }, password: {
        type: String,
        trim: true,
        required: [true, 'Please enter your password!'],
        minlength: [8, 'Password must be at least 8 characters!'],
        select: false,
    }, avatar: {
        type: String,
        default: "https://res.cloudinary.com/mdbdrrhm/image/upload/v1635086610/people/default-user_dmmlom.png"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;