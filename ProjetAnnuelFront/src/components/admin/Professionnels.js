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
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../../style/Payment.module.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Drawer, ListItems } from './drower/ListItems';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles((theme) => ({
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
  const [page, setPage] = useState(1); //curent page sur laquel on est 
  const [count, setCount] = useState(1); // nombre de pages quil y a 
  // const [open, setOpen] = React.useState(true);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };


  useEffect(() => {
    axios({ url: `http://localhost:3003/admin/pro`, method: 'GET', withCredentials: true })
      .then((data) => setPros(data.data))
  }, []);

  //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
  useEffect(() => {
    if (setCount && pros)
      setCount(Math.ceil(pros.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
  }, [setCount, pros]);

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
    <div>
      <Box sx={{ display: 'flex' }}>
        {/* <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems />
          </List>
        </Drawer> */}
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >





                  <h3>Professionnels</h3>
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
                      {pros
                        .slice((page - 1) * process.env.REACT_APP_NB_ITEMS_BY_PAGE, (page * process.env.REACT_APP_NB_ITEMS_BY_PAGE))
                        .map((pro) => (
                          <TableRow key={pro._id} className={classes.cursorpointer}>
                            <TableCell>
                              {pro.lastname}
                            </TableCell>
                            <TableCell>
                              {pro.firstname}
                            </TableCell>
                            <TableCell>
                              {pro.email}
                            </TableCell>
                            <TableCell>
                              {pro.phone}
                            </TableCell>
                            <TableCell>
                              {
                                !pro.activatedByAdmin ? <Button onClick={() => activate(pro._id)} variant="contained" color="success">Activer </Button>
                                  : <p className={styles.colorgreen} >✓</p>
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
                    <Pagination page={page} onChange={(e, value) => setPage(value)} count={count} size="large" />
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div >
  );
}