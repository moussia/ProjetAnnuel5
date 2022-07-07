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
import styles from '../../style/header.module.css';
import { pink } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { AuthContext } from '../contexts/AuthContext';
import request from '../../utils/request';

const pages = [
    { label: 'Mon compte', route: 'moncompte' },
    { label: 'Demande', route: 'pro/demande' },
    { label: 'Historique', route: 'pro/historique' },
    { label: 'Deconnexion', route: 'logout' },
];

const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const HeaderPro = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const { context, setContext } = React.useContext(AuthContext);
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

    const handleChange = (event) => {
        request.post(`${process.env.REACT_APP_SERVER}/pro/dispo/update`, { disponibility: !context.isDisponible })
            .then((data) => {
                setContext((prev) => ({ ...prev, isDisponible: data.data.isDisponible }));
                console.log("ok");
            })
            .catch((err) => {
                console.log("non");
            });
    };

    return (
        <AppBar sx={{ display: 'flex' }} className={styles.colorwhite} position="static">
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
                            color="primary"
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
                    <p className={styles.colorblack}>Disponibilité</p>
                    <GreenSwitch {...label} checked={context.isDisponible} onChange={handleChange} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default HeaderPro;