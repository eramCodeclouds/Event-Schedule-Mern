import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';


let getIdFromStorage = sessionStorage.getItem("user-id");
//console.log(getIdFromStorage);

const UserAccountUpdate = () => {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    useEffect(() => {
        getUser();
    }, [])

    function getUser() {
        fetch(`http://localhost:8000/api/view-single-user/${getIdFromStorage}`).then((result) => {
            result.json().then((resp) => {
                console.log(resp.data);

                setEmail(resp.data.email);
                setMobile(resp.data.mobile);
                setPassword(resp.data.password);
                setFname(resp.data.fname);
                setLname(resp.data.lname);
                setAddress(resp.data.address);
                setGender(resp.data.gender);
                setDob(resp.data.dob);
                setFatherName(resp.data.fathername);
                setState(resp.data.state);
                setCity(resp.data.city);
                setPincode(resp.data.pincode);

            })
        })
    }
    const UpdateHandler = async (e) => {
        e.preventDefault();
        let UserData = {
            email: email,
            mobile: mobile,
            password: password,
            fname: fname,
            lname: lname,
            address: address,
            gender: gender,
            dob: dob,
            fathername: fatherName,
            state: state,
            city: city,
            pincode: pincode

        };
        let url = `http://localhost:8000/api/user-data-update/${getIdFromStorage}`;

        const config = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };


        config["body"] = JSON.stringify(UserData);
        let result = await fetch(url, config);
        let resultData = await result.json();
        console.log(resultData);
        if (resultData.status === false) {
            swal("Oops! Authentication Failed", "Please fill correct details!", "error");
        } else {
            console.log(resultData);
            swal("Great", "Successfully Updated!", "success")
                .then(() => {
                    window.location.replace("http://localhost:3000/UserLogin")
                });
        }
    };
    return (
        <>
            <br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br />
            <form onSubmit={UpdateHandler}>

                <h3 className='text-success'>Change Details</h3>
                <div className="mb-10">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Mobile</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        name="mobile"
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                        pattern="/^-?\d+\.?\d*$/"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                        required
                    />
                </div>


                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="text"
                        id='password'
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        name="fname"
                        onChange={(e) => setFname(e.target.value)}
                        value={fname}
                        required

                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        name="lname"
                        onChange={(e) => setLname(e.target.value)}
                        value={lname}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                    >{address}</textarea>
                </div>
                <div className="mb-3">
                    <label>Choose Gender</label><br />
                    Male <input type="radio" name="gen" onChange={(e) => setGender(e.target.value)} value="Male" checked={gender === "Male"} />

                    &nbsp; &nbsp;   Female <input type="radio" name="gen" onChange={(e) => setGender(e.target.value)} value="Female" checked={gender === "Female"} />
                </div>

                <div className="mb-3">
                    <label>DOB</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter DOB"
                        name="dob"
                        onChange={(e) => setDob(e.target.value)}
                        value={dob}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Father's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        name="fathername"
                        onChange={(e) => setFatherName(e.target.value)}
                        value={fatherName}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Choose State</label><br />
                    <select className="form-select" name='state' onChange={(e) => setState(e.target.value)} >
                        <option>--select one--</option>
                        <option value="West Bengal" selected={state === "West Bengal"} >West Bengal</option>
                        <option value="Assam" selected={state === "Assam"}>Assam</option>
                        <option value="Arunachal Pradesh" selected={state === "Arunachal Pradesh"}>Arunachal Pradesh</option>
                        <option value="Chhattisgarh" selected={state === "Chhattisgarh"} >Chhattisgarh</option>
                        <option value="Bihar" selected={state === "Bihar"}>Bihar</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Choose City</label><br />
                    <select className="form-select" name='city' onChange={(e) => setCity(e.target.value)} >
                        <option>--select one--</option>
                        <option value="Kolkata" selected={city === "Kolkata"}>Kolkata</option>
                        <option value="Guwahati" selected={city === "Delhi"}>Guwahati</option>
                        <option value="Dharampur" selected={city === "Dharampur"}>Dharampur</option>
                        <option value="Bilaspur" selected={city === "Bilaspur"}>Bilaspur</option>
                        <option value="Patna" selected={city === "Patna"}>Patna</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Pin Code</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Pin Code"
                        name="pincode"
                        onChange={(e) => setPincode(e.target.value)}
                        value={pincode}
                        onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                        required
                    />
                </div>

                <br />

                <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </div>

                <center> <a href="/user-dashboard" style={{ textDecoration: "none" }}>Go Back</a></center>

            </form>
        </>
    )
}

export default UserAccountUpdate;

