const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const mongoose = require("mongoose");

exports.adminSignup = async (req, res) => {
    try {
        const adminResult = new adminModel(req.body);
        const createAdmin = await adminResult.save();
        res.status(201).json({ status: true, data: createAdmin });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};


exports.adminLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let pass = req.body.password;

        const user = await adminModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User does not exist",
            });
        } else {
            if (user.password == pass) {
                res
                    .status(200)
                    .json({ status: true, data: user, message: "Login successfull" });
            } else {
                res
                    .status(200)
                    .json({ status: false, data: null, message: "Password not matched" });
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};

exports.update_data = (req, res) => {
    return adminModel.findOneAndUpdate(
        { "email": req.body.email },
        { $set: req.body }
    ).then((result) => {
        return res.send({
            status: true,
            data: { ...result._doc, ...req.body },
            error: null
        })
    }).catch((err) => {
        return res.send({
            status: false,
            data: null,
            error: "Update Failed !!!!"
        })
    });
}

exports.viewAllUsers = (req, res) => {
    return userModel.aggregate([
        {
            $project: {
                __v: 0,
            },
        },
        {
            $sort: {
                _id: -1
            }
        }
    ])
        .then((data) => {
            return res.status(200).json({
                status: true,
                data: data,
                error: null
            });
        })
        .catch((error) => {
            return res.status(200).json({
                status: false,
                data: null,
                error: "Something Went Wrong !!!" + error,
            });
        });
}

exports.viewSingelUser = (req, res) => {
    return userModel.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project: {
                __v: 0,
            },
        },
        {
            $sort: {
                _id: -1
            }
        }
    ])
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "User Get Successfully",
                data: data[0],
            });
        })
        .catch((error) => {
            return res.status(200).json({
                status: false,
                message: "Server error. Please try again.",
                error: error,
            });
        });
}

exports.viewAdmin = (req, res) => {
    return adminModel.aggregate([
        {
            $project: {
                __v: 0,
            },
        },
    ])
        .then((data) => {
            return res.status(200).json({
                status: true,
                data: data,
                error: null
            });
        })
        .catch((error) => {
            return res.status(200).json({
                status: false,
                data: null,
                error: "Something Went Wrong !!!" + error,
            });
        });
}



