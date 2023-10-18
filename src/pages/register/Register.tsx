import React, { useState, Fragment } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Request from "../../requests/Request";

const Register = () => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [done, setDone] = useState(false)

  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handleFirstName = (event: any) => {
    setFirstName(event.target.value)
  }

  const handleLastName = (event: any) => {
    setLastName(event.target.value)
  }

  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  }

  const register = async () => {
    const body = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password
    }

    const data = await Request.post('/register', body)
    console.log(data)
    if (data.data.success) {
      setDone(true)
    }

    //console.log(data)
  }

  let body = (
    <Fragment>
      <Alert variant="filled" severity="success">
          Account Created!
        </Alert>
        <div className="register-done-component">
          <div>
        </div>
          <div>
            <p>Please go the login page to access your account</p>
        </div>
          <div>
            <Button onClick={redirectToLogin} variant="contained">Go to Login</Button>
          </div>
        </div>
    </Fragment>
  )

  if (! done) {
    body = (
      <Fragment>
        <label className="register-page-label" htmlFor="email">Email:</label>
        <input onChange={handleEmail} className="register-page-input" type="email" id="email" name="email" />
        <label className="register-page-label" htmlFor="first_name">First Name:</label>
        <input onChange={handleFirstName} className="register-page-input" type="text" id="first_name" name="first_name" />
        <label className="register-page-label" htmlFor="last_name">Last Name:</label>
        <input onChange={handleLastName} className="register-page-input" type="text" id="last_name" name="last_name" />
        <label className="register-page-label" htmlFor="password">Password:</label>
        <input onChange={handlePassword} className="register-page-input" type="password" id="password" name="password" />
        <label className="register-page-label" htmlFor="confirm_password">Confirm Password:</label>
        <input className="register-page-input" type="password" id="confirm_password" name="confirm_password" />
        <button onClick={register} className="submit-button">Register</button>
      </Fragment>
    )
  }

  return (
    <div className="register-page-container centered-div">
      <h1>Simple ERP</h1>
      <hr />
      <h2 className="register-page-subheader">Register</h2>
      <div className="register-page-form">
        { body }
      </div>
      <br />
      <span>Already have an account? <strong onClick={redirectToLogin} className="register-page-signup">Signin.</strong></span>
    </div>
  )
}

export default Register;