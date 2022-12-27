import React from 'react'

const PageNotFound = () => {
    return (
        <div>

            <div>
                <h3 className='text-danger'>Your Registration Page has been Expired.</h3>
                <p className='text-black'>Please Contact With Admin for further assistance</p>
                <center> <img src="./error.png" alt="error" className='img-fluid' height="400px" width="300px" /></center>
            </div>
            <center><a href="http://localhost:3000/UserLogin" className='btn btn-warning'>Go Back</a></center>
        </div>
    )
}

export default PageNotFound