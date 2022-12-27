import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RegisteredUserListDetails = () => {
    const { id } = useParams();
    //console.log(id);
    const [user, setUser] = useState([])

    useEffect(() => {
        getSingleData();

    }, [])

    const getSingleData = async () => {
        const url = `http://localhost:8000/api/view-single-user/${id}`
        const req = await fetch(url);
        const datas = await req.json();
        console.log(datas.data.email);
        setUser(datas.data);
    }
    return (
        <>
            <br /><br />
            <center><h5 className='text-success'>View Single User</h5></center>
            <table >
                <tr>
                    <td><b>Field Name</b></td>
                    <td><b>Field Values</b></td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>{user.fname}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{user.lname}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td>Date Of Birth</td>
                    <td>{user.dob}</td>
                </tr>
                <tr>
                    <td>Mobile No</td>
                    <td>{user.mobile}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{user.gender}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{user.address}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{user.city}</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>{user.state}</td>
                </tr>
                <tr>
                    <td>Pin Code</td>
                    <td>{user.pincode}</td>
                </tr>

            </table>
            <center> <a href="http://localhost:3000/all-registered-user" style={{ textDecoration: "none" }}>Go Back</a></center>


        </>
    )
}

export default RegisteredUserListDetails;