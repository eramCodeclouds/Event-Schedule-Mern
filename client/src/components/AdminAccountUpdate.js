import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const AdminAccountUpdate = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
        getAdmin();
    }, [])
    function getAdmin() {
        fetch("http://localhost:8000/api/view-admin").then((result) => {
            result.json().then((resp) => {
                console.log(resp.data[0].email);

                setEmail(resp.data[0].email);
                setPass(resp.data[0].password);
                // JSON.stringify(getemail.email);

            })
        })
    }
    const UpdateHandler = async (e) => {
        e.preventDefault();
        let AdminData = {
            email: email,
            password: pass,

        };
        let url = "http://localhost:8000/api/admin_update";

        const config = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };


        config["body"] = JSON.stringify(AdminData);
        let result = await fetch(url, config);
        let resultData = await result.json();
        // setEmail(resultData[0].email);
        console.log(resultData);
        if (resultData.status === false) {
            swal("Oops! Authentication Failed", "Please fill correct details!", "error");
        } else {
            console.log(resultData);
            swal("Great", "Successfully Updated!", "success")
                .then(() => {
                    window.location.replace("http://localhost:3000/sign-in")
                });
        }
    };
    return (
        <>


            <form onSubmit={UpdateHandler}>
                <h3>Update Admin Details</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}

                    />
                </div>

                <br />

                <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </div>
                <br /><center><a href="http://localhost:3000/admin-access">Go Back</a></center>
            </form>
        </>
    )
}

export default AdminAccountUpdate;

