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
import styles from "../style/menu.module.css";
import axios from 'axios';
import Loader from './Loader';

const pages = [
    { label: 'Qui sommes-nous ?', route: 'qui-sommes-nous' },
    // { label: 'Nos services', route: 'services' },
    // { label: 'Recrutement', route: 'recrutement' },
    // { label: 'FAQ', route: 'faq' },
    { label: 'Mon compte', route: 'moncompte', restricted: 'private' },
    { label: 'Contact', route: 'contact' },
    { label: 'Connexion', route: 'login', restricted: 'public' },
    { label: 'Deconnexion', route: 'logout', restricted: 'private' },

];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    React.useEffect(() => {
        axios({ url: 'http://localhost:3003/user/current', withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    });

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

    if (isAuthenticated === null) return <Loader />;
    console.log(isAuthenticated);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color="black"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        onClick={() => handleMenuClick('/')}
                    >
                        SOS PARENTS
                    </Typography>

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
                                <React.Fragment>
                                    {!((page.restricted === 'public' && isAuthenticated) || (page.restricted === 'private' && !isAuthenticated)) &&
                                        <MenuItem key={page.label} onClick={() => handleMenuClick(page.route)}>
                                            <Typography textAlign="center">{page.label}</Typography>
                                        </MenuItem>
                                    }
                                </React.Fragment>

                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <React.Fragment>
                                {!((page.restricted === 'public' && isAuthenticated) || (page.restricted === 'private' && !isAuthenticated)) &&
                                    <Button
                                        key={page.label}
                                        onClick={() => handleMenuClick(page.route)}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        {page.label}
                                    </Button>
                                }
                            </React.Fragment>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;