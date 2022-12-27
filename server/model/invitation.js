const mongoose = require("mongoose");
var currentDate = new Date();


const inviteSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    inviteDateTime: {
        type: String,
        default: currentDate
    },
    // token: {
    //     type: Number,
    //     default: token

    // },
    createOn: {
        type: Date
    }
});

module.exports = mongoose.model("invitation", inviteSchema);