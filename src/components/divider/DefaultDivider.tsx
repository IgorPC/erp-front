import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DefaultDividerProps from './DefaultDividerProps';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) ~ :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

const DefaultDivider: React.FC<DefaultDividerProps> = ({title}) => {
    return (
        <Divider>
            <Chip style={{fontSize: '15px', fontWeight: 'bold'}} label={title} />
        </Divider>
    );
}

export default DefaultDivider