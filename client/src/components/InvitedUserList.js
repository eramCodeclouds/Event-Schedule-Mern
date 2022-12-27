import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const InvitedUser = () => {
    const [invite, setInvite] = useState([]);
    const [status, setStatus] = useState(true);

    const loadPosts = async () => {
        const response = await axios.get(
            "http://localhost:8000/api/view-invite-user"
        );
        console.log(response.data.data);
        setInvite(response.data.data);

    };
    useEffect(() => {
        loadPosts();
    }, []);

    const statusChange = async (e, id) => {
        setStatus(e.target.value)
        let postId;
        for (const post of invite) {
            if (post._id === id) {
                postId = post._id;
                console.log(postId);
                if (status === false) {
                    setStatus(true)
                } else {
                    setStatus(false)
                }
            }
        }
        //for updatation code....
        let UserStatusValue = {
            status: status
        };
        let url = `http://localhost:8000/api/user-invite-update/${postId}`;

        const config = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        config["body"] = JSON.stringify(UserStatusValue);
        let result = await fetch(url, config);
        let resultData = await result.json();
        // console.log(resultData);
        swal("Great", "Status Successfully Updated!", "success")
            .then(() => {
                loadPosts();
                //  window.location.replace("http://localhost:3000/all-registered-user")
            });


    }

    return (
        <div className="App">
            <h3 className='text-success'>All Invited User's</h3>

            <br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invite.map((user) => {
                        return (
                            <tr>
                                <td>{user.email}</td>
                                {user.status ? <td><p className='text-success'><b>Invited</b></p></td> : <td><p className='text-danger'><b>Rejected</b></p> </td>}

                                <td>
                                    <div className="form-check form-switch ms-2">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                                            name="status" onChange={(e) => { statusChange(e, user._id) }} checked={user.status ? true : false} />
                                    </div>

                                </td>

                            </tr>

                        )
                    })}




                </tbody>
            </table>
            <center><a href="http://localhost:3000/admin-access" style={{ textDecoration: "none" }}>Go Back</a></center>

        </div>
    );
}

export default InvitedUser;
