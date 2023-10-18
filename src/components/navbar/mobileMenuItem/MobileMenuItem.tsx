import React, { useState, useEffect, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DnsIcon from '@mui/icons-material/Dns';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MobileMenuItemProps from './MobileMenuItemProps';

const MobileMenuItem: React.FC <MobileMenuItemProps> = ({name, redirectTo, icon, menus}) => {
    const [open, setOpen] =  useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    const id = `mobile-menu-item${name}`

    return (
        <Fragment>
            <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    menus.map(menu => {
                        return (
                            <ListItemButton  key={`${id}-${menu.path}`} onClick={() => { redirectTo(menu.path) }} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.name} />
                            </ListItemButton>
                        )
                    })
                }
            </Collapse>
        </Fragment>
    )
}

export default MobileMenuItem