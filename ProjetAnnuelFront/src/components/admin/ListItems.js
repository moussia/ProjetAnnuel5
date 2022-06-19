// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// <ListItemText primary="Dashboard" onClick={() => navigate(`/dashboard`)} />
// <ListItemText primary="Professionnel" onClick={() => navigate(`/pro`)} />
// <ListItemText primary="Parents" onClick={() => navigate(`/parent`)} />

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

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <EscalatorWarningIcon />
            </ListItemIcon>
            <ListItemText primary="Parents" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Professionnels" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary="À vérifié" />
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
            <ListItemText primary="Don" />
        </ListItemButton>

    </React.Fragment>
);