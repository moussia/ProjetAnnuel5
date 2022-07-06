import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../contexts/AuthContext';
import { roles } from '../../constants/roles';
import HeaderAdmin from './HeaderAdmin';
import HeaderParent from './HeaderParent';
import HeaderPro from './HeaderPro';
import styles from '../../style/header.module.css';

const pages = [
    { label: 'Qui sommes-nous ?', route: 'qui-sommes-nous' },
    { label: 'Contact', route: 'contact' },
    { label: 'Connexion', route: 'login' },
    { label: 'Vous êtes un professionel ?', route: 'pro/create' },
];

const Header = () => {
    const { context } = React.useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleMenuClick = (route) => {
        handleCloseNavMenu();
        navigate(route);
    }
    if (context.role === roles.ADMIN) return <HeaderAdmin />
    if (context.role === roles.PARENT) return <HeaderParent />
    if (context.role === roles.PRO) return <HeaderPro />

    return (


        <AppBar sx={{ display: 'flex' }} position="static" className={styles.colorwhite} >
            <Container maxWidth="xl">
                <Toolbar>
                    <img
                        alt='logo'
                        height='auto'
                        width='100px'
                        className={styles.cursor}
                        src={require('../../images/Blanc et Noir Moderne Icônes Enseignement Hôpital Logo.png')}
                        onClick={() => handleMenuClick('/')}
                    />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={() => handleMenuClick(page.route)}>
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => handleMenuClick(page.route)}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default Header;