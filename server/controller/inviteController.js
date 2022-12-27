const inviteModel = require("../model/invitation");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
let express = require('express');
let app = express()

app.use(cookieParser());
exports.invite = async (req, res) => {
    try {
        const userResult = new inviteModel(req.body);
        const createUser = await userResult.save();
        res.status(201).json({ status: true, data: createUser });

    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};


exports.viewAllInvitedUsers = (req, res) => {
    return inviteModel.aggregate([
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

exports.userInviteUpdateData = (req, res) => {
    return inviteModel.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(req.params.id) },
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
            error: "Updation Failed !!!!"
        })
    });
}

exports.InviteduserAccess = async (req, res) => {
    try {
        let status = true;
        const user = await inviteModel.find({ status });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "You donn't have permission to register yourself, please try again later once your status get active",
            });
        } else {
            res
                .status(200)
                .json({ status: true, data: user, message: "Great, You have been invited by Admin please register yourself" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};