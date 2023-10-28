import React, { useState, useEffect, Fragment } from "react"
import CookieManager from "../../../cookieManager/CookieManager";
import PageLayout from '../../../components/pageLayout/PageLayout';
import Request from "../../../requests/Request";
import Grid from '@mui/material/Grid';
import ProfilePicture from "../../../components/profilePicture/ProfilePicture";
import TextInput from "../../../components/inputs/textInput/TextInput";
import DefaultDivider from "../../../components/divider/DefaultDivider";
import Button from '@mui/material/Button';
import DefaultBox from "../../../components/box/DefaultBox";
import PageLoadingSpinner from "../../../components/pageLoading/PageLoading";
import DefaultAlert from "../../../components/alert/DefaultAlert";
import "./ProfilePage.css"

const ProfilePage = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [number, setNumber] = useState("")
    const [street, setStreet] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")

    const [cityError, setCityError] = useState("")
    const [countryError, setCountryError] = useState("")
    const [neighborhoodError, setNeighborhoodError] = useState("")
    const [numberError, setNumberError] = useState("")
    const [streetError, setStreetError] = useState("")
    const [zipCodeError, setZipCodeError] = useState("")

    const [userId, setUserId] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        setIsLoading(true)
        const userData = await CookieManager.getUserData()
        setUserId(userData.id)
        const response = await Request.get(`/profile-info/${userData.id}`, true)

        if (!response) {
            console.log("Request error")
            setIsLoading(false)
            return false
        }

        if (!response.data.success) {
            console.log("User not found")
            setIsLoading(false)
            return false
        }

        setEmail(response.data.data.email)
        setFirstName(response.data.data.first_name)
        setLastName(response.data.data.last_name)
        setProfilePicture(response.data.data.profile_picture)

        if (response.data.data.user_address[0] !== undefined) {
            setCountry(response.data.data.user_address[0].country)
            setNeighborhood(response.data.data.user_address[0].neighborhood)
            setCity(response.data.data.user_address[0].city)
            setStreet(response.data.data.user_address[0].street)
            setNumber(response.data.data.user_address[0].number)
            setZipCode(response.data.data.user_address[0].zip_code)
        }

        setIsLoading(false)
    }

    const handleFirstName = (value: string) => {
        setFirstNameError("")
        setFirstName(value)
    }

    const handleLastName = (value: string) => {
        setLastNameError("")
        setLastName(value)
    }

    const handleCity = (value: string) => {
        setCityError("")
        setCity(value)
    }

    const handleCountry = (value: string) => {
        setCountryError("")
        setCountry(value)
    }

    const handleNeighborhood = (value: string) => {
        setNeighborhoodError("")
        setNeighborhood(value)
    }

    const handleNumber = (value: string) => {
        setNumberError("")
        setNumber(value)
    }

    const handleStreet = (value: string) => {
        setStreetError("")
        setStreet(value)
    }

    const handleZipCode = (value: string) => {
        setZipCodeError("")
        setZipCode(value)
    }

    const handleProfilePictureChange = async (pictureUpdated: boolean) => {
        if (pictureUpdated) {
            window.location = window.location;
        }
    }

    const validatePersonalInfoFields = () => {
        let error = false

        if (! firstName.length) {
            setFirstNameError("First name can not be empty")
            error = true
        }

        if (! lastName.length) {
            setLastNameError("Last name can not be empty")
            error = true
        }

        return error
    }

    const validateAddressFields = () => {
        let error = false

        if (! zipCode.length) {
            setZipCodeError("Zip Code can not be empty")
            error = true
        }

        if (! country.length) {
            setCountryError("Country can not be empty")
            error = true
        }

        if (! city.length) {
            setCityError("City can not be empty")
            error = true
        }

        if (! neighborhood.length) {
            setNeighborhoodError("Neighborhood can not be empty")
            error = true
        }

        if (! street.length) {
            setStreetError("Street can not be empty")
            error = true
        }

        if (! number.length) {
            setNumberError("Number can not be empty")
            error = true
        }

        return error
    }

    const saveUserAddress = async () => {
        setIsLoading(true)
        setError("")
        setSuccess("")

        if (validateAddressFields()) {
            setIsLoading(false)
            return false
        }

        const body = {
            user_id: userId,
            street: street,
            neighborhood: neighborhood,
            number: number, 
            city: city,
            country: country,
            zip_code: zipCode
        }

        const response = await Request.post(`/add-address`, body, true)
    
        if (! response) {
            setError("Internal Server Error")
            setIsLoading(false)
            setSuccess("")
            return false
        }

        if (! response.data.success) {
            setError("User Address could not be updated")
            setIsLoading(false)
            setSuccess("")
            return false
        }


        setSuccess('User Address Sucessfully updated')
        setIsLoading(false)
    }

    const savePersonalInfo = async () => {
        setIsLoading(true)
        setError("")
        setSuccess("")

        if (validatePersonalInfoFields()) {
            setIsLoading(false)
            return false
        }

        const body = {
            firstName: firstName,
            lastName: lastName
        }

        const response = await Request.put(`/profile-info/${userId}`, body, true)

        if (! response) {
            setError("Internal Server Error")
            setIsLoading(false)
            setSuccess("")
            return false
        }

        if (! response.data.success) {
            setError(response.data.data)
            setIsLoading(false)
            setSuccess("")
            return false
        }


        setSuccess(response.data.data)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <PageLoadingSpinner
                title="Profile"
            />
        )
    }

    let alert = (<Fragment></Fragment>)

    if (error && ! success) {
        alert = (
            <Fragment>
                <br />
                    <DefaultAlert
                        type="error"
                        message={error}
                    />
                <br />
            </Fragment>
        )
    }

    if (! error && success) {
        alert = (
            <Fragment>
                <br />
                    <DefaultAlert
                        type="success"
                        message={success}
                    />
                <br />
            </Fragment>
        )
    }

    return (
        <PageLayout title='Profile'>
            <div>
                { alert }
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12} xs={12}>
                        <DefaultBox>
                            <ProfilePicture
                                pictureUrl={profilePicture}
                                callback={handleProfilePictureChange}
                            />
                            <br />
                            <DefaultDivider
                                title="Personal Information"
                            />
                            <br />
                            <TextInput
                                name="Email"
                                type="email"
                                callback={() => { return false }}
                                error={''}
                                disabled={true}
                                value={email}
                            />
                            <br />
                            <br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        name="First name"
                                        type="text"
                                        callback={handleFirstName}
                                        error={firstNameError}
                                        value={firstName}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        name="Last Name"
                                        type="text"
                                        callback={handleLastName}
                                        error={lastNameError}
                                        value={lastName}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Button
                                onClick={savePersonalInfo}
                                style={{ width: '100%' }}
                                variant="contained">
                                Save
                            </Button>
                        </DefaultBox>
                    </Grid>
                    <Grid item md={8} sm={12} xs={12}>
                        <DefaultBox>
                            <DefaultDivider
                                title="User Address"
                            />
                            <br />
                            <TextInput
                                name="Zip Code"
                                type="text"
                                callback={handleZipCode}
                                error={zipCodeError}
                                value={zipCode}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Country"
                                type="text"
                                callback={handleCountry}
                                error={countryError}
                                value={country}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="City"
                                type="text"
                                callback={handleCity}
                                error={cityError}
                                value={city}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Neighborhood"
                                type="text"
                                callback={handleNeighborhood}
                                error={neighborhoodError}
                                value={neighborhood}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Street"
                                type="text"
                                callback={handleStreet}
                                error={streetError}
                                value={street}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Number"
                                type="text"
                                callback={handleNumber}
                                error={numberError}
                                value={number}
                            />
                            <br />
                            <br />
                            <Button
                                onClick={saveUserAddress}
                                style={{ width: '100%' }}
                                variant="contained">
                                Save Address
                            </Button>
                        </DefaultBox>
                    </Grid>
                </Grid>
            </div>
        </PageLayout>
    );
}

export default ProfilePage