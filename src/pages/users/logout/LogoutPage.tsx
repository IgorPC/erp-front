import React, { useEffect, Fragment } from "react"
import CookieManager from "../../../cookieManager/CookieManager";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        CookieManager.clearSessionData()
        navigate("/login")
    }, [])

    return (
        <Fragment>

        </Fragment>
      );
}

export default LogoutPage