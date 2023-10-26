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
import "./ProfilePage.css"

const ProfilePage = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const [city, setCity] = useState("")
    const [contry, setCountry] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [number, setNumber] = useState("")
    const [street, setStreet] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            setIsLoading(true)
            const userData = CookieManager.getUserData()
            const response = await Request.get(`/profile-info/${userData.id}`, true)
            
            if (! response) {
                console.log("Request error")
                setIsLoading(false)
                return false
            }

            if (! response.data.success) {
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

        getUserData()
    }, [])

  if (isLoading) {
    return (
        <PageLoadingSpinner
            title="Profile"
        />
    )
  }

    return (
        <PageLayout title='Profile'>
            <div>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12} xs={12}>
                        <DefaultBox>
                            <ProfilePicture
                                pictureUrl={profilePicture}
                            />
                            <br />
                            <DefaultDivider
                                title="Personal Information"
                            />
                            <br />
                            <TextInput
                                name="Email"
                                type="email"
                                callback={() => console.log('test')}
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
                                        callback={() => console.log('test')}
                                        error={''}
                                        value={firstName}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        name="Last Name"
                                        type="text"
                                        callback={() => console.log('test')}
                                        error={''}
                                        value={lastName}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <Button 
                                onClick={() => console.log('clicked')} 
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
                                callback={() => console.log('test')}
                                error={''}
                                value={zipCode}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Country"
                                type="text"
                                callback={() => console.log('test')}
                                error={''}
                                value={contry}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="City"
                                type="text"
                                callback={() => console.log('test')}
                                error={''}
                                value={city}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Neighborhood"
                                type="text"
                                callback={() => console.log('test')}
                                error={''}
                                value={neighborhood}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Street"
                                type="text"
                                callback={() => console.log('test')}
                                error={''}
                                value={street}
                            />
                            <br />
                            <br />
                            <TextInput
                                name="Number"
                                type="text"
                                callback={() => console.log('test')}
                                error={''}
                                value={number}
                            />
                            <br />
                            <br />
                             <Button 
                                onClick={() => console.log('clicked')} 
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