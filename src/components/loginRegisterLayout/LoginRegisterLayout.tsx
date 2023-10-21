import React, { useEffect } from "react";
import "./LoginRegisterLayout.css";
import Box from '@mui/material/Box';
import DefaultDivider from "../../components/divider/DefaultDivider";
import LoginRegiserLayoutProps from "./LoginRegisterLayoutProps";

const LoginRegisterLayout: React.FC<LoginRegiserLayoutProps> = ({ title, children, width, height }) => {

    useEffect(() => {
        document.title = capitalizeFirstLetter(title);
    }, []);

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className="login-register-layout-centered-div">
            <Box
                sx={{
                    width: width,
                    height: height,
                    borderRadius: '15px',
                    boxShadow: '6px 6px 14px 6px rgba(0, 0, 0, 0.3)',
                    padding: '15px',
                    backgroundColor: 'white'
                }}
            >
                <h1 >Simple ERP</h1>
                <DefaultDivider
                    title={title}
                />
                <br />
                {children}
            </Box>
        </div>

    )
}

export default LoginRegisterLayout