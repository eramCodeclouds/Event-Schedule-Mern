import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


const RegisteredUserList = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [status, setStatus] = useState(false);

    const loadPosts = async () => {
        setLoading(true);
        const response = await axios.get(
            "http://localhost:8000/api/view-all-users/"
        );
        // console.log(response.data.data);
        setPosts(response.data.data);
        setLoading(false);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    //for status update
    const statusChange = async (e, id) => {
        console.log(id);
        console.log(e.target.checked);
        setStatus(e.target.checked);

        let postId;
        for (const post of posts) {
            if (post._id === id) {
                postId = post._id;
                console.log(postId);
            }
        }
        //for updatation code....
        let UserStatusValue = {
            isActive: status
        };
        let url = `http://localhost:8000/api/user-data-update/${id}`;

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
        console.log(resultData);
        if (resultData.status === false) {
            swal("Oops! Authentication Failed", "Please fill correct details!", "error");
        } else {
            console.log(resultData);
            swal("Great", "Status Successfully Updated!", "success")
                .then(() => {
                    //window.location.replace("http://localhost:3000/all-registered-user")
                    loadPosts()
                });
        }


    }


    return (
        <div className="App">
            <h3 className='text-success'>All Registered User's</h3>
            <center>  <input
                style={{ width: "30%", height: "25px" }}
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTitle(e.target.value)}
                className="form-control"
            /></center>
            <br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Registered Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">View </th>
                        <th cope="col">Change Status</th>
                    </tr>
                </thead>
                <tbody>

                    {loading ? (
                        <tr>Loading ...</tr>
                    ) : (
                        posts
                            .filter((value) => {
                                if (searchTitle === "") {
                                    return value;
                                } else if (
                                    value.email.toLowerCase().toUpperCase().includes(searchTitle.toLowerCase().toUpperCase())
                                    || value.fname.toLowerCase().toUpperCase().includes(searchTitle.toLowerCase().toUpperCase())
                                    || value.lname.toLowerCase().toUpperCase().includes(searchTitle.toLowerCase())

                                    || value.RegisteredDate.includes(searchTitle)
                                ) {
                                    return value;
                                }
                            })
                            .map((item) => {
                                return (
                                    <>
                                        <tr key={item._id}>
                                            <td>{item.fname}</td>
                                            <td>{item.lname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.RegisteredDate}</td>
                                            {item.isActive ? <td className='text-success'><b>Active</b></td> : <td className='text-danger'><b>Deactive</b></td>}

                                            <td className='text-primary'><Link className="nav-link" to={`/registered-user/${item._id}`}>
                                                <b>Single User</b>
                                            </Link></td>

                                            <td>

                                                <div className="form-check form-switch ms-2">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                                                        onChange={(e) => { statusChange(e, item._id) }}
                                                        name="status"
                                                        value={status}
                                                        checked={item.isActive ? true : false}

                                                    />
                                                </div>

                                            </td>

                                        </tr>
                                    </>
                                )
                            }
                            )
                    )}
                </tbody>
            </table>
            <center><a href="http://localhost:3000/admin-access" style={{ textDecoration: "none" }}>Go Back</a></center>
        </div>


    );
}

export default RegisteredUserList;
