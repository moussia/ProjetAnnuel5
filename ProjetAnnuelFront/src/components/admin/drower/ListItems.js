import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const pages = [
    { label: 'Pro', route: 'pro' },
    { label: 'Dons', route: 'donation' },
    { label: 'parents', route: 'parents' },
];

const drawerWidth = 240;

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


export const ListItems = () => {

    const navigate = useNavigate();
    return (
        <>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" onClick={() => navigate(`/dashboard`)} />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <EscalatorWarningIcon />
                </ListItemIcon>
                <ListItemText primary="Parents" onClick={() => navigate(`/parents`)} />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Professionnels" onClick={() => navigate(`/pro`)} />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <ChatBubbleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Demandes" onClick={() => navigate(`/demandes`)} />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PaidIcon />
                </ListItemIcon>
                <ListItemText primary="Don" onClick={() => navigate(`/donation`)} />
            </ListItemButton>
        </>
    );
}