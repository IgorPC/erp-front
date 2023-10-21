import React, { useState, Fragment } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Request from "../../requests/Request";
import LoginRegisterLayout from "../../components/loginRegisterLayout/LoginRegisterLayout";
import TextInput from "../../components/inputs/textInput/TextInput";
import Spinner from "../../components/spinner/Spinner";
import DefaultAlert from "../../components/alert/DefaultAlert";

const Register = () => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [emailError, setEmailError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [pageHeight, setPageHeight] = useState(710)
  const [requestError, setRequestError] = useState(false)
  const [requestErrorMessage, setRequestErrorMessage] = useState("")
  const [done, setDone] = useState(false)

  const handleEmail = (value: string) => {
    setEmailError("")
    setEmail(value)
  }

  const handleFirstName = (value: string) => {
    setFirstNameError("")
    setFirstName(value)
  }

  const handleLastName = (value: string) => {
    setLastNameError("")
    setLastName(value)
  }

  const handlePassword = (value: string) => {
    setPasswordError("")
    setPassword(value)
  }

  const handleConfirmPassword = (value: string) => {
    setConfirmPasswordError("")
    setConfirmPassword(value)
  }

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  }

  const register = async () => {
    setPageHeight(710)
    
    if (!validateFields()) {
      return false;
    }

    setIsLoading(true)

    const body = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password
    }

    const data = await Request.post('/register', body)

    if (!data) {
      setError("Internal Server Error")
      setIsLoading(false)
      return false
    }

    if (data.data.data.success) {
      setIsLoading(false)
      setDone(true)
      setPageHeight(330)
      return false
    }

    setError(data.data.data.data)
    setIsLoading(false)
  }

  const setError = (message: string) => {
    setIsLoading(false)
    setRequestError(true)
    setRequestErrorMessage(message)
  }

  const validateFields = () => {
    let error = false;

    if (!email) {
      setEmailError("Email is required")
      error = true
    }

    if (! email.includes("@")) {
      setEmailError("Invalid Email")
      error = true
    }

    if (!password) {
      setPasswordError("Password is required")
      error = true
    }

    if (!confirmPassword) {
      setConfirmPasswordError("You have to confirm your password")
      error = true
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Your password does not match")
      error = true
    }

    if (!firstName) {
      setFirstNameError("First Name is required")
      error = true
    }

    if (!lastName) {
      setLastNameError("Last Name is required")
      error = true
    }

    if (error) {
      return false
    }

    return true;
  }

  let bottomContent = (
    <Button
      onClick={register}
      style={{ width: '100%' }}
      variant="contained">
      Register
    </Button>
  )

  if (isLoading) {
    bottomContent = (
      <Spinner />
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

  let body = (
    <Fragment>
      <TextInput
        name="Email"
        type="email"
        callback={handleEmail}
        error={emailError}
      />
      <br />
      <br />
      <TextInput
        name="First Name"
        type="text"
        callback={handleFirstName}
        error={firstNameError}
      />
      <br />
      <br />
      <TextInput
        name="Last Name"
        type="text"
        callback={handleLastName}
        error={lastNameError}
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
      <TextInput
        name="Confirm Password"
        type="password"
        callback={handleConfirmPassword}
        error={confirmPasswordError}
      />
      <br />
      <br />

      {bottomContent}

      {displayError}

      <span className="login-page-span">Already have an account? <strong onClick={redirectToLogin} className="login-page-signup">Sign in.</strong></span>
    </Fragment>
  )

  if (done) {
    body = (
      <div>
        <p>Your account was successfully created!</p>
        <p>Use your <strong>EMAIL</strong> and <strong>PASSWORD</strong> to access your account</p>
        <br />
        <Button
          onClick={redirectToLogin}
          style={{ width: '100%' }}
          variant="contained">
          GO TO LOGIN PAGE
        </Button>
      </div>
    )
  }

  return (
    <LoginRegisterLayout
      title="REGISTER"
      width={300}
      height={pageHeight}
    >
      { body }
    </LoginRegisterLayout>
  )
}

export default Register;