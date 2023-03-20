import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input'
import { Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from '../context/user';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

// import { useTheme } from '@mui/material/styles'

const pages = ['Categories', 'Login'];
const settings = ['Account', 'Logout'];
const ariaLabel = { 'aria-label': 'description' };

const Nav = () => {
    // const theme = useTheme()
    const { user, setUser, setAuthErrors } = useContext(UserContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = (event) => {
        fetch('/logout', {
            method: 'DELETE'
        }).then(r => {
            if (r.ok) {
                setUser('')
                setAuthErrors([])
                navigate('/login')
            } else {
                r.json().then(data => console.log(data))
            }
        })
    }

    return (
        <AppBar position="static" sx={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'unset',
            paddingTop: '10px'
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link href='/' sx={{ marginRight: 'auto' }}>
                        <Box sx={{ 
                            display: { xs: 'none', md: 'flex' },
                        }}>
                            <img alt="Purrfect Adventures Logo" src={require('../media/purrfect-adventures-logo.png').default} style={{ marginRight: 'auto', maxWidth: '250px' }} />
                        </Box>
                    </Link>
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                    }}>
                    <img alt="Purrfect Adventures Logo" src={require('../media/purrfect-adventures-logo.png').default} style={{ marginRight: 'auto', maxWidth: '180px' }} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        <ListItem
                            component="a"
                            href={'/adventures'}
                            sx={{ my: 2, color: 'black', display: 'block', padding: '0 10px' }}
                        >
                            <ListItemText primary='Adventures' />
                        </ListItem>
                        <ListItem
                            component="a"
                            href={'/account'}
                            sx={{ my: 2, color: 'black', display: 'block', padding: '0 10px' }}
                        >
                            <ListItemText primary='Account' />
                        </ListItem>
                        <ListItem
                            component="button"
                            onClick={handleLogOut}
                            sx={{ my: 2, color: 'white', display: 'block', padding: '4px 16px', border: 'unset', backgroundColor: 'black', marginLeft: '10px', cursor: 'pointer' }}
                        >
                            <ListItemText primary='Log Out' />
                        </ListItem>
                    </Box>
                    <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link href='/adventures' underline="none">Adventures</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link href='/account' underline="none">Account</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link underline="none"><Button variant="contained" sx={{ borderRadius: '0px' }}>Log Out</Button></Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Nav;