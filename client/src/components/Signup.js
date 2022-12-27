import React, { useEffect, useState } from 'react'
import PwdStrength from './PwdStrength';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
//import { useCookies } from "react-cookie";


const Signup = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //const [cookies, setCookie] = useCookies(["email"]);

  const win = window.localStorage;

  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  //end email ...
  //for paaaword...
  const [pwd, setPwd] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false
  });
  //end password ...
  //get data from localStorage

  const [form, setForm] = useState({
    email: JSON.parse(localStorage.getItem('email')),
    mobile: JSON.parse(localStorage.getItem('mobile')),
    password: JSON.parse(localStorage.getItem('password')),
    fname: JSON.parse(localStorage.getItem('fname')),
    lname: JSON.parse(localStorage.getItem('lname')),
    address: JSON.parse(localStorage.getItem('address')),
    gen: JSON.parse(localStorage.getItem('gen')),
    dob: JSON.parse(localStorage.getItem('dob')),
    fathername: JSON.parse(localStorage.getItem('fathername')),
    state: JSON.parse(localStorage.getItem('state')),
    city: JSON.parse(localStorage.getItem('city')),
    pincode: JSON.parse(localStorage.getItem('pincode'))

  })

  const [count, setCount] = useState(1)
  const RegForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    if (form.email.match(pattern)) {
      //console.log(true);
      setMessage('');
    } else {
      //console.log(false);
      setMessage('please enter valid email');
    }
  }

  //for password..
  const handleOnFocus = () => {
    setPwd(true);
  }
  const handleOnBlur = () => {
    setPwd(false);
  }

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck
    })

  }
  //end passwrod ..
  //start regiatration
  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      let userData = {
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        fname: form.fname,
        lname: form.lname,
        address: form.address,
        gender: form.gen,
        dob: form.dob,
        fathername: form.fathername,
        state: form.state,
        city: form.city,
        pincode: form.pincode

      };
      console.log(userData);
      let url = "http://localhost:8000/api/user-create";
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
      if (result.status === 500) {
        swal("Oops!", "Please Fill all the details!", "error");
      } else if (result.status === 201) {
        swal(
          'Good job!',
          'Your Response has been Recorded',
          'success'
        ).then(() => {
          window.location.replace("http://localhost:3000/sign-up")
          localStorage.clear();
          //   cookies.remove("email");
        });

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  //end registration

  useEffect(() => {
    checkInvitation();
  }, []);

  const checkInvitation = async () => {

    const response = await axios.get(

      "http://localhost:8000/api/user-invite-by-status"
    );
    console.log(response.data.status)
    if (response.data.status !== true) {
      return navigate("/404-page");
    }

  }

  useEffect(() => {
    win.setItem('email', JSON.stringify(form.email));
    win.setItem('mobile', JSON.stringify(form.mobile));
    win.setItem('password', JSON.stringify(form.password));
    win.setItem('fname', JSON.stringify(form.fname));
    win.setItem('lname', JSON.stringify(form.lname));
    win.setItem('address', JSON.stringify(form.address));
    win.setItem('gen', JSON.stringify(form.gen));
    win.setItem('dob', JSON.stringify(form.dob));
    win.setItem('fathername', JSON.stringify(form.fathername));
    win.setItem('state', JSON.stringify(form.state));
    win.setItem('city', JSON.stringify(form.city));
    win.setItem('pincode', JSON.stringify(form.pincode));
  }, [form]);


  return (
    <>
      <form>
        <h3>User Registration </h3>
        {count === 1 ? (
          <>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
                id='email'
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={RegForm}
                value={form.email}
                required
              />
              <p className='text-danger'>{message}</p>


            </div>
            <div className="mb-3">
              <label>Mobile</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Mobile Number"
                name="mobile"
                onChange={RegForm}
                value={form.mobile}
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
                onChange={RegForm}
                placeholder="Enter Password"
                name="password"
                value={form.password}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyUp={handleOnKeyUp}
                required
              />
            </div>
            {pwd ? <PwdStrength capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
              numberFlag={checks.numberCheck ? "valid" : "invalid"}
              passwordLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
              specialCharCheckFlag={checks.specialCharCheck ? "valid" : "invalid"}

            /> : null}
          </>

        ) : null}

        {count === 2 ? (
          <>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                name="fname"
                onChange={RegForm}
                value={form.fname}
                required
                id='fname'
              />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                name="lname"
                id='lname'
                onChange={RegForm}
                value={form.lname}
                required
              />
            </div>
            <div className="mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                name="address"
                onChange={RegForm}
                value={form.address}
                id="address"
                required
              />
            </div>

          </>
        ) : null}
        {count === 3 ? (
          <>

            <div className="mb-3">
              <label>Choose Gender</label><br />
              {/* {localStorage.getItem('gen') === 'Male' ? :} */}

              Male <input type="radio" name="gen" onChange={RegForm} value="Male" id='male' checked={form.gen === 'Male'} />
              &nbsp;&nbsp;   Female <input type="radio" name="gen" onChange={RegForm} value="Female" checked={form.gen === 'Female'} />
            </div>

            <div className="mb-3">
              <label>DOB</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter DOB"
                name="dob"
                id='dob'
                onChange={RegForm}
                value={form.dob}
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
                id='fathername'
                onChange={RegForm}
                value={form.fathername}
                required
              />
            </div>

          </>
        ) : null}

        {count === 4 ? (
          <>
            <div className="mb-3">
              <label>Choose State</label><br />
              <select className="form-select" name='state' id='state' onChange={RegForm} value={form.state}>
                <option>--select one--</option>
                <option>West Bengal</option>
                <option>Assam</option>
                <option>Arunachal Pradesh</option>
                <option>Chhattisgarh</option>
                <option>Bihar</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Choose City</label><br />
              <select className="form-select" name='city' id='city' onChange={RegForm} value={form.city}>
                <option>--select one--</option>
                <option >Kolkata</option>
                <option >Guwahati</option>
                <option>Dharampur</option>
                <option>Bilaspur</option>
                <option>Patna</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Pin Code</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Pin Code"
                name="pincode"
                onChange={RegForm}
                value={form.pincode}
                onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
                required
              />
            </div>

          </>
        ) : null}


        {count === 4 ? (
          <div className="d-grid">
            <Button variant="primary" onClick={handleShow}>
              Submit
            </Button>
          </div>
        ) : null}

        <br></br>
        <Button className="btn btn-light mr-3" onClick={() => setCount(count - 1)} disabled={count < 2}>
          Back
        </Button>
        &nbsp;&nbsp;&nbsp;<Button className="btn btn-warning mr-5" onClick={() => setCount(count + 1)} disabled={count > 3} >
          Next
        </Button>

        {/* Modal  */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><center>Your All Information</center></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <p>Email = {form.email} </p>
              <p>Mobile = {form.mobile} </p>
              <p>Password = {form.password}</p>
              <p>First Name = {form.fname}</p>
              <p>Last Name = {form.lname}</p>
              <p> Address =  {form.address}</p>
              <p>Gender = {form.gen}</p>
              <p>Date of Birth = {form.dob}</p>
              <p>Father Name = {form.fathername}</p>
              <p> State = {form.state}</p>
              <p> City = {form.city}</p>
              <p>Pincode = {form.pincode}</p>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close Modal
            </Button>
            <Button variant="success" type="submit" onClick={signupHandler}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  )
}

export default Signup;
