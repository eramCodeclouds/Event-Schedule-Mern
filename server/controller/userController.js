const userModel = require("../model/userModel");
const mongoose = require("mongoose");
exports.userSignup = async (req, res) => {
    try {

        const userResult = new userModel(req.body);
        const createUser = await userResult.save();
        res.status(201).json({ status: true, data: createUser });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
};


exports.userLogin = async (req, res) => {
    try {
        let isActive = true;
        let email = req.body.email;
        let pass = req.body.password;


        const user = await userModel.findOne({ email, isActive });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User does not exists or your are not active user please consult with you admin to activate your account",
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


exports.userUpdateData = (req, res) => {
    return userModel.findOneAndUpdate(
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
            error: "Update Failed !!!!"
        })
    });
}
