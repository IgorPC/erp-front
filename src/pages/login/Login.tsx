import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Request from "../../requests/Request";
import CookieManager from "../../cookieManager/CookieManager";
import Timer from "../../timer/Timer"
import Button from '@mui/material/Button';
import LoginRegisterLayout from "../../components/loginRegisterLayout/LoginRegisterLayout";
import TextInput from "../../components/inputs/textInput/TextInput";
import Spinner from "../../components/spinner/Spinner";
import DefaultAlert from "../../components/alert/DefaultAlert";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [pageHeight, setPageHeight] = useState(410)
  const [requestError, setRequestError] = useState(false)
  const [requestErrorMessage, setRequestErrorMessage] = useState("")

  const navigate = useNavigate();

  const redirectTo = (path: string) => {
    navigate(path);
  }

  const validateFields = () => {
    let error = false;

    if (! email) {
      setEmailError("Email is required")
      error = true
    }

    if (! password) {
      setPasswordError("Password is required")
      error = true
    }

    if (error) {
      return false
    }

    return true;
  }

  const login = async () => {
    setRequestError(false)

    if (! validateFields()) {
      return false
    }

    setIsLoading(true)

    const data = await Request.post('/login', {
      email: email,
      password: password
    })

    if (! data) {
      setError("Internal Server Error")
      return false
    }

    if (data.data.data.success) {
      const token = data.data.data.data.token
      const userData = data.data.data.data.user

      await CookieManager.setJwtToken(token)
      await CookieManager.setUserData(userData)
      await CookieManager.setTokenTime(Timer.getCurrentTime())

      redirectTo("/dashboard")
    }
    
    setError("Invalid Email or Password")
  }

  const setError = (message: string) => {
    setIsLoading(false)
    setRequestError(true)
    setRequestErrorMessage(message)
    setPageHeight(450)
  }

  const handleEmail = (value: string) => {
    setEmailError("")
    setEmail(value)
  }

  const handlePassword = (value: string) => {
    setPasswordError("")
    setPassword(value)
  }

  let bottomContent = (
    <Button 
      onClick={login} 
      style={{ width: '100%' }} 
      variant="contained">
        Login
    </Button>
  )

  if (isLoading) {
    bottomContent = (
      <Spinner/>
    )
  }

  let displayError = (<></>)

  if (requestError) {
    displayError = (
      <div>
        <br />
        <DefaultAlert
          type="error"
          message={requestErrorMessage}
        />
      </div>
    )
  }

  return (
    <LoginRegisterLayout
      title="LOGIN"
      width={300}
      height={pageHeight}
    >
      <TextInput
        name="Email"
        type="email"
        callback={handleEmail}
        error={emailError}
      />
      <br />
      <br />
      <TextInput
        name="Password"
        type="password"
        callback={handlePassword}
        error={passwordError}
      />
      <br />
      <br />
      
      { bottomContent }

      { displayError }

      <span className="login-page-span">Don't have an account? <strong onClick={() => redirectTo('/register')} className="login-page-signup">Sign up.</strong></span>
    </LoginRegisterLayout>
  )
}

export default Login