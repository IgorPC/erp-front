import React, { useState, useEffect, Fragment } from "react"
import CookieManager from "../../../cookieManager/CookieManager";
import PageLayout from '../../../components/pageLayout/PageLayout';
import Request from "../../../requests/Request";
import Grid from '@mui/material/Grid';

const ProfilePage = () => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getUserData = async () => {
            const userData = CookieManager.getUserData()
            const response = await Request.get(`/profile-info/${userData.id}`, true)
            
            if (! response) {
                console.log("Request error")
                return false
            }

            if (! response.data.success) {
                console.log("User not found")
                return false
            }

            setUserData(response.data.data)
            
            console.log(response.data.data)
        }

        getUserData()
    }, [])

    return (
        <PageLayout title='Profile'>
            <div>
                <Grid container spacing={2}>
                    <Grid style={{backgroundColor: 'red'}} item md={5} xs={12}>
                        <span >Test</span>
                    </Grid>
                    <Grid style={{backgroundColor: 'blue'}} item md={7} xs={12}>
                        <span>Test</span>
                    </Grid>
                </Grid>
            </div>
        </PageLayout>
      );
}

export default ProfilePage