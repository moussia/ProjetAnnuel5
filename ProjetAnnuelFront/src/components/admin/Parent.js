import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { useNavigate } from 'react-router';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export const Parent = () => {
  const classes = useStyles();
  const [parent, setParent] = useState({});
  const { id } = useParams();

  // if (context?.token === null) history.push('/login');
  // if (context?.isAdmin !== true) history.push('/');

  useEffect(() => {
    console.log('test')
    axios({ url: `http://localhost:3003/admin/parent/${id}`, method: 'GET', withCredentials: true })
      .then((res) => setParent(res.data))
  }, [id])

  useEffect(() => {
    console.log(parent)
  }, [parent])


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <h1>Parent :  {parent.firstname} </h1>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Lastname
            </Typography>
            <Typography variant="h5" component="h2">
              {parent.lastname}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Email
            </Typography>
            <Typography variant="h5" component="h2">
              {parent.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Téléphone
            </Typography>
            <Typography variant="h5" component="h2">
              {parent.phone}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Adresse
            </Typography>
            <Typography variant="h5" component="h2">
              {parent.address}
            </Typography>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}