import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import NavBar from '../navbar/Navbar';
import PageLayoutProps from './PageLayoutProps';
import Title from '../Title/Title';
import Request from '../../requests/Request';
import CookieManager from '../../cookieManager/CookieManager';
import Timer from '../../timer/Timer';

import "./PageLayout.css"


const PageLayout: React.FC<PageLayoutProps> = ({children, title}) => {
    useEffect(() => {
      document.addEventListener('mousemove', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);

      const timeInterval = setInterval(validateToken, 60 * 1000)

      return () => {
        clearInterval(timeInterval)
      };
    }, [])

    const validateToken = async () => {
      Timer.validateTokenIntegrity()
    }

    const handleUserInteraction = (event: any) => {
      CookieManager.setLastInteraction(Timer.getCurrentTime())
    }

    return (
        <Box>
          <CssBaseline />
          <NavBar/>
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Title
              name={title}
            />
            <div className='page-layout-container'>
              { children }
            </div>
          </Box>
        </Box>
    );
}

export default PageLayout