import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Popup from 'reactjs-popup';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 240,
    },
}));

function preventDefault(event) {
    event.preventDefault();
}

export const Parents = () => {
    const classes = useStyles();
    const [parent, setParent] = useState([]);
    const navigate = useNavigate();
    const [open] = React.useState(true);

    useEffect(() => {
        axios({ url: 'http://localhost:3003/admin/parent', method: 'GET', withCredentials: true })
            .then((data) => setParent(data.data))
    }, []);

    console.log(parent);

    useEffect(() => {
        console.log('parent', parent);
    }, [parent]);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <Divider />
                    {/* <MainListItems /> */}
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <h1>Compte Parent</h1>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Prénom</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Téléphone</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parent.map((parent) => (
                                <TableRow key={parent._id}>

                                    <TableCell>
                                        {parent.lastname}
                                    </TableCell>
                                    <TableCell>{parent.firstname}</TableCell>
                                    <TableCell>{parent.email}</TableCell>
                                    <TableCell>{parent.phone}</TableCell>
                                    <TableCell>
                                        <Link onClick={() => navigate(`/parent/${parent._id}`)}>
                                            <img src={require('../../images/eye.png')} alt="traitement" className={classes.tailleeye} />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link onClick={() => navigate(`/parent/${parent._id}`)}>















                                            <img src={require('../../images/poubelle-de-recyclage.png')} alt="traitement" className={classes.tailleeye} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className={classes.seeMore}>
                        <Link color="primary" href="#" onClick={preventDefault}>
                            Voir plus de parents
                        </Link>
                    </div>


                </main>
            </div>


        </React.Fragment >
    );
}