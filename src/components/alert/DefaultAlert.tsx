import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import DefaultAlertProps from './DefaultAlertProps';
import Collapse from '@mui/material/Collapse';

const DefaultAlert: React.FC <DefaultAlertProps> = ({message, type}) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Collapse in={isOpen}>
            <Alert severity={type} onClose={() => {setIsOpen(false);}}> {message} </Alert>
        </Collapse>
      
    );
}

export default DefaultAlert