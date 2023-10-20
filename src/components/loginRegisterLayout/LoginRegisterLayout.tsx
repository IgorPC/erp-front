import React from "react";
import "./LoginRegisterLayout.css";
import Box from '@mui/material/Box';
import DefaultDivider from "../../components/divider/DefaultDivider";
import LoginRegiserLayoutProps from "./LoginRegisterLayoutProps";

const LoginRegisterLayout: React.FC<LoginRegiserLayoutProps> = ({title, children, width, height}) => {
    return (
        <div className="login-register-layout-centered-div">
            <Box
                sx={{
                    width: width,
                    height: height,
                    borderRadius: '15px',
                    boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
                    padding: '15px'
                }}
            >
                <h1 >Simple ERP</h1>
                <DefaultDivider 
                    title={title}
                />
                <br />
                { children }
            </Box>
        </div>

    )
}

export default LoginRegisterLayout