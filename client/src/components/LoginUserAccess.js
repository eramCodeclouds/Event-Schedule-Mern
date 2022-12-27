import React, { useState } from 'react'
import { Link } from 'react-router-dom';

let getIdFromStorage = sessionStorage.getItem("user-id");
console.log(getIdFromStorage);

const LoginUserAccess = () => {

    return (
        <form>
            <center> <span className='text-success'><h3>Congratulations</h3></span>
                <p> ( Now you can access )</p>
            </center>
            <hr />
            <div className="mb-3">
                {/* <a href='http://localhost:3000/edit-user' className='text-primary text-center' >Change your Account Details</a> */}

                <Link className="nav-link text-primary" to={`/edit-user?id=${getIdFromStorage}`}>
                    <b>Change your Account Details</b>
                </Link>

                <br></br>
                <center>
                    <a href='/calendly-book' className='text-primary text-center' style={{ textDecoration: "none" }} >Book Your Slots with Admin</a>
                </center>



            </div>
        </form>
    )
}


export default LoginUserAccess;
