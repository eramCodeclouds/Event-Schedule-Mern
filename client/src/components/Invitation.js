import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import swal from 'sweetalert';
import { useCookies } from "react-cookie";


const Invitation = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [cookies, setCookie] = useCookies(["email"]);

    const sendEmail = async (e) => {
        e.preventDefault();
        setCookie("email", email, {
            path: "/",
            expires: new Date(Date.now() + 7200000)
        });

        const res = await fetch("http://localhost:8000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        });
        // console.log(res);

        const data = await res.json();
        console.log(data);

        if (data.status === 401 || !data) {
            console.log("error")
        } else {
            setShow(true);
            setEmail("")
            console.log("Email sent")
        }



        let userData = {
            email: email,
        };
        let url = "http://localhost:8000/api/invite-user";
        const config = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        config["body"] = JSON.stringify(userData);
        let result = await fetch(url, config);
        let resultData = await result.json();
        console.log(resultData);
        // if (resultData.status === false) {
        //     swal("Oops! Something went wrong", "Please try again", "error");
        // }
        // else {
        console.log(resultData);
        swal("Great", "Successfully Invited!", "success")
            .then(() => {
                window.location.replace("http://localhost:3000/sign-in")
            });
        // }
    }

    return (
        <form>

            <h3>Invite User</h3>
            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Great, Your have Succesfully invited
                </Alert> : ""
            }
            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter user email"
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
            </div>


            <div className="d-grid">
                <button type="submit" className="btn btn-success" onClick={sendEmail}>
                    Send
                </button>
            </div>
            <br />  <center><a href="http://localhost:3000/admin-access">Go Back</a></center>
        </form>


    )
}
export default Invitation;
