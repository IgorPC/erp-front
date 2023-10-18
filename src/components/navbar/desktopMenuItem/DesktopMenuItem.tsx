import React, { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DesktopMenuItemProps from './DesktopMenuItemPros';

const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({name, redirectTo, icon, menus}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (path: string | null) => {
        if (path) {
            redirectTo(path)
        }

        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = `desktop-menu-item${name}`

    return (
        <Fragment>
            <Button
                id={`${id}-button`}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: 'white' }}
            >
                {icon}
                {name}
            </Button>
            <Menu
               id={`${id}-menu`}
                anchorEl={anchorEl}
                open={open}
                onClose={() => { handleClose(null) }}
                MenuListProps={{
                    'aria-labelledby': `${id}-button`,
                }}
            >
                {
                    menus.map(menu => {
                        return (<MenuItem key={`${id}-${menu.path}`} onClick={() => { handleClose(menu.path) }}>{menu.name}</MenuItem>)
                    })
                }
            </Menu>
        </Fragment>
    )
}

export default DesktopMenuItem