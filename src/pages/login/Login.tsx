import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Request from "../../requests/Request";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const redirectTo = (path: string) => {
    navigate(path);
  }

  const login = async () => {
    const data = await Request.post('/login', {
      email: email,
      password: password
    })

    console.log(data)
  }
  
  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }


  return (
        <div className="login-page-container login-page-centered-div">
          <h1>Simple ERP</h1>  
          <hr />  
          <h2 className="login-page-subheader">Login</h2>
          <div className="login-page-form">
            <label className="login-page-label" htmlFor="email">Email:</label>
            <input className="login-page-input" onChange={handleEmail} type="email" id="email" name="email" />
            <label className="login-page-label" htmlFor="password">Password:</label>
            <input className="login-page-input" onChange={handlePassword} type="password" id="password" name="password" />
            <button onClick={login} className="submit-button">Login</button>
          </div>
          <br />
          <span>Don't have an account? <strong onClick={() => redirectTo('/register')} className="login-page-signup">Signup.</strong></span>
        </div>
      );
}

export default Login