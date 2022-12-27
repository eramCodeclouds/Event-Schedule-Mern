import React, { useState } from 'react';
import swal from 'sweetalert';






const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        let userData = {
            email: email,
            password: pass,
        };
        let url = "http://localhost:8000/api/user-login";
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
        // let getId = resultData.data._id;
        // sessionStorage.setItem("user-id", getId);
        if (resultData.status === false) {
            swal("Oops! Authentication Failed", "Please fill correct details!", "error");
        }

        else {
            console.log(resultData);
            let getId = resultData.data._id;
            sessionStorage.setItem("user-id", getId);
            swal("Great", "Successfully Login!", "success")
                .then(() => {
                    window.location.replace("http://localhost:3000/user-dashboard")
                });
        }
        // let getId = resultData.data._id;
        // sessionStorage.setItem("user-id", getId);
    };





    return (
        <>

            <nav>
                <ul className="pagination pagination-sm justify-content-end">
                    <li className="page-item "><a className="page-link" href="/sign-in">Admin Login</a></li>
                    <li className="page-item page-item active"><a className="page-link" href="#">User Login</a></li>
                </ul>
            </nav>
            <br />

            <form onSubmit={loginHandler}>
                <h3>User Login</h3>
                <marquee direction="left" className="text-danger"><b>Only Active User's Can Login</b></marquee>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

            </form>
        </>
    )
}

export default UserLogin;

