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
                <ListItemText primary="Demandes" />
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