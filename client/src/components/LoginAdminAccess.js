import React from 'react';


const LoginAdminAccess = () => {


    return (
        <form>
            <center> <span className='text-success'><h3>Congratulations,</h3></span>
                <p> On Admin Panel</p>
            </center>
            <hr />
            <div className="mb-3">
                <a href='http://localhost:3000/edit-admin' className='text-primery text-center' >Change your Account Details</a><br /><br />

                <a href='http://localhost:3000/all-registered-user' className='text-primery text-center' >View All Registered User List</a>
                <br></br> <br></br>
                <a href='http://localhost:3000/Invitation' className='text-primery text-center' >Invite User By Email</a><br /><br />
                <a href='http://localhost:3000/invited-user-list' className='text-primery text-center' >View All Invited User's List</a>

            </div>
            <center> <button className='btn btn-danger'><a className='text-light' href="http://localhost:3000/sign-in">Logout</a></button></center>

        </form>

    )
}
export default LoginAdminAccess;
