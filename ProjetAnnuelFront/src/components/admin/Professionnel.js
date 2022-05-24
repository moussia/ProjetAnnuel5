// import React, { useState, useEffect, useContext } from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
// import { MainListItems } from '../../views/admin/ListItems';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import { CredentialContext } from '../../contexts/CredentialContext';
// import { useHistory } from 'react-router';
// import axios from 'axios';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   pos: {
//     marginBottom: 12,
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },
//   toolbarIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...theme.mixins.toolbar,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   menuButtonHidden: {
//     display: 'none',
//   },
//   title: {
//     flexGrow: 1,
//   },
//   drawerPaper: {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerPaperClose: {
//     overflowX: 'hidden',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: theme.spacing(7),
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9),
//     },
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'auto',
//     flexDirection: 'column',
//   },
//   fixedHeight: {
//     height: 240,
//   },
// }));

// export default function Professionnel(props) {
//   const classes = useStyles();

//   const [context, setContext] = useContext(CredentialContext);
//   const history = useHistory();

//   const [pro, setPro] = useState({});
//   const [open] = useState(true);



//   if (context?.token === null) history.push('/login');
//   if (context?.isAdmin !== true) history.push('/');

//   useEffect(() => {
//     axios({ url: 'http://localhost:8000/admin/pro/:getId', method: 'GET' })
//       .then((res) => res.json())
//       .then((data) => setPro(data))
//   }, [])

//   useEffect(() => {
//     console.log(pro)
//   }, [pro])

//   return (
//     <React.Fragment>
//       <div className={classes.root}>
//         <CssBaseline />
//         <Drawer
//           variant="permanent"
//           classes={{
//             paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
//           }}
//           open={open}
//         >
//           <Divider />
//           <MainListItems />
//           <Divider />
//         </Drawer>
//         <main className={classes.content}>
//           <Card className={classes.root} variant="outlined">
//             <CardContent>
//               <Typography className={classes.title} color="textSecondary" gutterBottom>
//                 <h1>Professionnel :  {pro.firstname} </h1>
//               </Typography>
//               <Typography className={classes.pos} color="textSecondary">
//                 Lastname
//               </Typography>
//               <Typography variant="h5" component="h2">
//                 {pro.lastname}
//               </Typography>
//               <Typography className={classes.pos} color="textSecondary">
//                 Email
//               </Typography>
//               <Typography variant="h5" component="h2">
//                 {pro.email}
//               </Typography>
//               <Typography className={classes.pos} color="textSecondary">
//                 Téléphone
//               </Typography>
//               <Typography variant="h5" component="h2">
//                 {pro.phone}
//               </Typography>
//               <Typography className={classes.pos} color="textSecondary">
//                 Adresse
//               </Typography>
//               <Typography variant="h5" component="h2">
//                 {pro.address}
//               </Typography>
//             </CardContent>
//           </Card>
//         </main>
//       </div>


//     </React.Fragment>
//   );
// }