import React, { useState, useEffect, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
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
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Button from '@mui/material/Button';
import NavBarProps from './NavbarProps';
import DesktopMenuItem from './desktopMenuItem/DesktopMenuItem';
import MobileMenuItem from './mobileMenuItem/MobileMenuItem';
import { useNavigate } from 'react-router-dom';
import CookieManager from '../../cookieManager/CookieManager';

const NavBar: React.FC<NavBarProps> = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [user, setUser] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        userData()
    });

    const handleWindowSize = () => {
        setWindowSize(window.innerWidth)
    }

    const redirectTo = (path: string | null) => {
        if (path) {
           navigate(path);
        }
    }

    const userData = async () => {
        const data = await CookieManager.getUserData()
        setUser(`${data.first_name} ${data.last_name}`)
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    let desktopContent = (
        <div>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
            >
                Simple ERP
            </Typography>
        </div>
    )

    if (windowSize >= 600) {
        desktopContent = (
            <Fragment>
                <Button
                    onClick={() => {redirectTo('/dashboard')}}
                    style={{ color: 'white' }}
                >
                    <DnsIcon />
                    Dashboard
                </Button>
                <DesktopMenuItem
                    icon={<WarehouseIcon/>}
                    name="Products"
                    redirectTo={redirectTo}
                    menus={[
                        {
                            name: "List",
                            path: "/products/list"
                        },
                        {
                            name: "Create",
                            path: "/products/create"
                        }
                    ]}
                />
                <DesktopMenuItem
                    icon={<GroupIcon />}
                    name="Clients"
                    redirectTo={redirectTo}
                    menus={[
                        {
                            name: "List",
                            path: "/clients/list"
                        },
                        {
                            name: "Create",
                            path: "/clients/create"
                        }
                    ]}
                />
                <DesktopMenuItem
                    icon={<AssignmentIndIcon />}
                    name={user ? user : "User"}
                    redirectTo={redirectTo}
                    menus={[
                        {
                            name: "Profile",
                            path: "/users/profile"
                        },
                        {
                            name: "Logout",
                            path: "/users/logout"
                        }
                    ]}
                />
                <DesktopMenuItem
                    icon={<SettingsIcon />}
                    name="Settings"
                    redirectTo={redirectTo}
                    menus={[
                        {
                            name: "List",
                            path: "/products/list"
                        },
                        {
                            name: "Create",
                            path: "/products/create"
                        },
                        {
                            name: "Sell",
                            path: "/products/sell"
                        },
                    ]}
                />
            </Fragment>
        )
    }

    const desktop = (
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Simple ERP
                </Typography>
                {desktopContent}
            </Toolbar>

        </AppBar>
    )

    const mobile = (
        <nav>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        Simple ERP
                    </Typography>
                    <Divider />
                    <List>
                        <ListItemButton onClick={() => {redirectTo('/dashboard')}}>
                            <ListItemIcon>
                                <DnsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <MobileMenuItem
                            name="Products"
                            icon={<WarehouseIcon />}
                            redirectTo={redirectTo}
                            menus={[
                                {
                                    name: "List",
                                    path: "/products/list",
                                    icon: <StarBorder/>
                                },
                                {
                                    name: "Create",
                                    path: "/products/create",
                                    icon: <StarBorder/>
                                }
                            ]}
                        />
                        <MobileMenuItem
                            name="Clients"
                            icon={ <GroupIcon />}
                            redirectTo={redirectTo}
                            menus={[
                                {
                                    name: "List",
                                    path: "/clients/list",
                                    icon: <StarBorder/>
                                },
                                {
                                    name: "Create",
                                    path: "/clients/create",
                                    icon: <StarBorder/>
                                }
                            ]}
                        />
                        <MobileMenuItem
                            name={user ? user : "User"}
                            icon={ <AssignmentIndIcon />}
                            redirectTo={redirectTo}
                            menus={[
                                {
                                    name: "Profile",
                                    path: "/users/profile",
                                    icon: <StarBorder/>
                                },
                                {
                                    name: "Logout",
                                    path: "/users/logout",
                                    icon: <StarBorder/>
                                }
                            ]}
                        />
                         <MobileMenuItem
                            name="Settings"
                            icon={ <SettingsIcon />}
                            redirectTo={redirectTo}
                            menus={[
                                {
                                    name: "List",
                                    path: "/products/list",
                                    icon: <StarBorder/>
                                },
                                {
                                    name: "Create",
                                    path: "/products/create",
                                    icon: <StarBorder/>
                                },
                                {
                                    name: "Sell",
                                    path: "/products/sell",
                                    icon: <StarBorder/>
                                },
                            ]}
                        />
                    </List>
                </Box>
            </Drawer>
        </nav>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {desktop}
            {mobile}
        </Box>
    );
}

export default NavBar