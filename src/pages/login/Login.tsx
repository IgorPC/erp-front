import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Request from "../../requests/Request";
import CookieManager from "../../cookieManager/CookieManager";
import Timer from "../../timer/Timer"
import Box from '@mui/material/Box';
import DefaultDivider from "../../components/divider/DefaultDivider";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoginRegisterLayout from "../../components/loginRegisterLayout/LoginRegisterLayout";

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

    if (data.data.data.success) {
      const token = data.data.data.data.token
      const userData = data.data.data.data.user

      CookieManager.setJwtToken(token)
      CookieManager.setUserData(userData)
      CookieManager.setTokenTime(Timer.getCurrentTime())

      redirectTo("/dashboard")
    }
  }

  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }

  return (
    <LoginRegisterLayout
      title="LOGIN"
      width={300}
      height={380}
    >
      <TextField helperText="Incorrect entry." error onChange={handleEmail} style={{ width: '100%' }} id="outlined-basic" type="email" label="Email" variant="outlined" />
      <br />
      <br />
      <TextField onChange={handlePassword} style={{ width: '100%' }} id="outlined-basic" type="password" label="Password" variant="outlined" />
      <br />
      <br />
      <Button onClick={login} style={{ width: '100%' }} variant="contained">Login</Button>
      <span className="login-page-span">Don't have an account? <strong onClick={() => redirectTo('/register')} className="login-page-signup">Signup.</strong></span>
    </LoginRegisterLayout>
  )
}

export default Login