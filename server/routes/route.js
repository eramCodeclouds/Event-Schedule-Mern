const express = require('express');
const app = express();
const router = new express.Router();
const nodemailer = require("nodemailer");


require("dotenv").config();

router.post('/login', (req, res) => {
    console.log(req.body);
})

router.post("/send", (req, res) => {
    const { email } = req.body;


    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: "Please Complete The Registration Process",
            html: `
            <div style="padding:10px;border-style: ridge">
            <p>You have a new Registration request.</p>
            <h3>The Registration link will expire after 2 hour's</h3>
            <ul>
                <li>Email: ${email}</li>
                <li>Subject: Please Complete The Registration Process</li>
                <li>Link: <a href='http://localhost:3000/sign-up'>Please Registered with this link</a></li>
                <p>You won't be allowed to the registration process after it's expiry and any submission after expiry time will be invalid.</p>
            </ul>`
        }
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log("Error", error);
            } else {
                console.log("Email sent" + info.response);
                res.status(201).json({ status: 201, info })

            }
        })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }



});
module.exports = router;