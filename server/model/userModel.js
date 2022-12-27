const mongoose = require("mongoose");

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        // unique: true,
        required: true
    },
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    RegisteredDate: {
        type: String,
        default: currentDate

    },

    createOn: {
        type: Date
    }
});

module.exports = mongoose.model("User", userSchema);