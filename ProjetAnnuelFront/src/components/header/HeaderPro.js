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
import { Radio } from '@mui/material';
import styles from '../../style/header.module.css';
import { pink } from '@mui/material/colors';

const pages = [
    { label: 'Mon compte', route: 'moncompte' },
    { label: 'Disponibilité', route: 'pro/disponible' },
    { label: 'Deconnexion', route: 'logout' },
];

const HeaderPro = () => {
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

    // pour la disponibilite à droite
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });


    return (
        <AppBar className={styles.colorwhite} position="static">
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
                                    <MenuItem key={page.label} onClick={() => handleMenuClick(page.route)}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                </React.Fragment>

                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <React.Fragment>
                                <Button
                                    key={page.label}
                                    onClick={() => handleMenuClick(page.route)}
                                    sx={{ my: 2, color: 'black', display: 'block' }}
                                >
                                    {page.label}
                                </Button>
                            </React.Fragment>
                        ))}
                    </Box>
                    <p className={styles.colorblack}>Disponibilité</p>
                    <Radio {...controlProps('indisponible')} color="error" />
                    <Radio {...controlProps('disponible')} color="success" />
                    <Radio
                        {...controlProps('e')}
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default HeaderPro;