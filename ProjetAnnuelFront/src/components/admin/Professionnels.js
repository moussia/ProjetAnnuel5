import React, { useState, useContext } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { MainListItems } from '../../views/admin/ListItems.js';
import axios from 'axios';

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

export const Professionnels = () => {
  const classes = useStyles();
  const [pros, setPros] = useState([]);
  const history = useNavigate();
  const [open] = React.useState(true);

  // if (context?.token === null) history.push('/login');
  // if (context?.isAdmin !== true) history.push('/');

  useEffect(() => {
    axios({ url: 'http://localhost:3003/admin/pro', method: 'GET', withCredentials: true })
      .then((data) => setPros(data.data))
  }, []);

  console.log(pros);

  const activate = async (id) => {
    const res = await axios({ url: `http://localhost:3003/admin/pro/${id}/activate`, method: 'PUT', withCredentials: true }
    );
    const data = await res.data;
    setPros((prev) => {
      const i = prev.findIndex(elem => {
        return elem._id === data._id;
      });
      console.log(i);
      const deleted = prev.splice(i, 1, data);
      console.log('test', deleted, data);
      return [...prev];
    });
  };

  useEffect(() => {
    console.log('pros', pros);
  }, [pros]);

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
          <h1>Compte Pro</h1>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Ville</TableCell>
                <TableCell align="right">Activé</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pros.map((pro) => (
                <TableRow key={pro._id}>
                  <TableCell>
                    <Link onClick={() => history.push(`/pro/${pro._id}`)}> {pro.lastname}</Link>
                  </TableCell>
                  <TableCell>{pro.firstname}</TableCell>
                  <TableCell>{pro.email}</TableCell>
                  <TableCell>{pro.phone}</TableCell>
                  <TableCell>{pro.address}</TableCell>
                  <TableCell>{pro.city}</TableCell>
                  <TableCell align="right">
                    {
                      !pro.activatedByAdmin ? <Button onClick={() => activate(pro._id)} variant="contained" color="primary">Activate </Button>
                        : <div>Activated</div>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            <Link color="primary" href="#" onClick={preventDefault}>
              See more sellers
            </Link>
          </div>


        </main>
      </div>


    </React.Fragment>
  );
}