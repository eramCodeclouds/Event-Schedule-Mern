import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/Login';
import SignUp from './components/Signup';
import Invitation from './components/Invitation';
import RegisteredUserList from './components/RegisteredUserList';
import RegisteredUserListDetails from './components/RegisteredUserListDetails';
import UserLogin from './components/UserLogin';
import LoginUserAccess from './components/LoginUserAccess';
import UserAccountUpdate from './components/UserAccountUpdate';
import AdminAccountUpdate from './components/AdminAccountUpdate';
import LoginAdminAccess from './components/LoginAdminAccess';
import PageNotFound from './components/PageNotFound';
import InvitedUser from './components/InvitedUserList';
import Calendly from './components/Calendly'
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies();
  let a = cookies.email;
  console.log(a);
  return (
    <>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={'/sign-in'}>
                codeClouds
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                      Login
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li> */}

                  {/* <li className="nav-item">
                    <Link className="nav-link" to={'/Invitation'}>
                      Invite User
                    </Link>
                  </li> */}
                  {/* <li className="nav-item">
                    <Link className="nav-link" to={'/all-registered-user'}>
                      All Users
                    </Link>
                  </li> */}



                  {/* <li className="nav-item">
                    <Link className="nav-link" to={'/registered-user/:id'}>
                      Single User
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                {/* <Route path="/sign-up" element={<SignUp />} /> */}
                <Route path="/Invitation" element={<Invitation />} />
                <Route path="/all-registered-user" element={<RegisteredUserList />} />
                <Route path="/registered-user/:id" element={<RegisteredUserListDetails />} />
                <Route path="/UserLogin" element={<UserLogin />} />
                <Route path="/User-dashboard" element={<LoginUserAccess />} />
                <Route path="/edit-user" element={<UserAccountUpdate />} />
                <Route path="/edit-admin" element={<AdminAccountUpdate />} />
                <Route path="/admin-access" element={<LoginAdminAccess />} />
                <Route path="/invited-user-list" element={<InvitedUser />} />
                <Route path="/calendly-book" element={<Calendly />} />
                {/* <Route path="*" element={<PageNotFound />} /> */}

                {
                  cookies.email ?
                    <Route path="/sign-up" element={<SignUp />} />
                    :
                    <Route path="*" element={<PageNotFound />} />
                }
              </Routes>

            </div>
          </div>
        </div>

      </Router>




    </>
  )
}

export default App;
