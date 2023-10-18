import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import NavBar from '../navbar/Navbar';
import PageLayoutProps from './PageLayoutProps';
import Title from '../Title/Title';

import "./PageLayout.css"

const PageLayout: React.FC<PageLayoutProps> = ({children, title}) => {
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