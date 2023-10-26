import React from 'react';
import { Box } from '@mui/system';
import DefaultBoxProps from './DefaultBoxProps';
import "./DefaultBox.css"

const DefaultBox: React.FC<DefaultBoxProps> = ({children}) => {
    return (
        <Box sx={{minHeight: '780px'}} className='default-page-box' alignItems='center' alignContent='center'>
            { children }
        </Box>
    )
}

export default DefaultBox