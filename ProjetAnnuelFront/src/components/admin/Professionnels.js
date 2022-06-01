import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  //   cursorpointer: {
  //     pointer- events: auto,
  // },
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
  tailleeye: {
    width: '25px',
    cursor: 'pointer',
  },
}));

export const Professionnels = () => {
  const classes = useStyles();
  const [pros, setPros] = useState([]);
  const navigate = useNavigate();
  const [open] = React.useState(true);

  // if (context?.token === null) history.push('/login');
  // if (context?.isAdmin !== true) history.push('/');

  useEffect(() => {
    axios({ url: `http://localhost:3003/admin/pro`, method: 'GET', withCredentials: true })
      .then((data) => setPros(data.data))
  }, []);

  const activate = async (id) => {
    const res = await axios({ url: `http://localhost:3003/admin/pro/${id}/activate`, method: 'PUT', withCredentials: true }
    );
    const data = res.data;
    setPros((prev) => {
      const i = prev.findIndex(elem => {
        return elem._id === data._id;
      });
      prev.splice(i, 1, data);
      return [...prev];
    });
  };


  const deletePro = async (id) => {
    const res = await axios({ url: `http://localhost:3003/admin/pro/${id}`, method: 'DELETE', withCredentials: true }
    );
    if (res.status === 204)
      setPros((prev) => [...prev.filter((item) => item._id !== id)]);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <h1>Compte Pro</h1>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Activé</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pros.map((pro) => (
              <TableRow key={pro._id} className={classes.cursorpointer}>

                <TableCell>{pro.lastname}</TableCell>
                <TableCell>{pro.firstname}</TableCell>
                <TableCell>{pro.email}</TableCell>
                <TableCell>{pro.phone}</TableCell>
                <TableCell>
                  {
                    !pro.activatedByAdmin ? <Button onClick={() => activate(pro._id)} variant="contained" color="primary">Activate </Button>
                      : <div>Activated</div>
                  }
                </TableCell>
                <TableCell>
                  <Link onClick={() => navigate(`/pro/${pro._id}`)}>
                    <img src={require('../../images/eye.png')} alt="traitement" className={classes.tailleeye} />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link onClick={() => deletePro(pro._id)}>
                    <img src={require('../../images/poubelle-de-recyclage.png')} alt="traitement" className={classes.tailleeye} />
                  </Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack spacing={2}>
          <Pagination count={10} size="large" />
        </Stack>


      </main >
    </div >
  );
}