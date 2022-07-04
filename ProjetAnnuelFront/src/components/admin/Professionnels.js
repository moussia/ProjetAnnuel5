import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MainListItems } from './drawer/ListItems';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

import { Professionnel } from './Professionnel';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

const mdTheme = createTheme();

export const Professionnels = () => {
  const [pros, setPros] = useState([]);
  const [page, setPage] = useState(1); //curent page sur laquel on est 
  const [count, setCount] = useState(1); // nombre de pages quil y a 
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.log(pros);
  }, [pros]);

  useEffect(() => {
    axios({ url: `${process.env.REACT_APP_SERVER}/admin/pro`, method: 'GET', withCredentials: true })
      .then((data) => setPros(data.data))
  }, []);

  //on calcul le count des demandes dans le front, on va avoir combien il va y avoir de pages
  useEffect(() => {
    if (setCount && pros)
      setCount(Math.ceil(pros.length / process.env.REACT_APP_NB_ITEMS_BY_PAGE));
  }, [setCount, pros]);

  return (
    <div>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <Drawer variant="permanent" open={open}>
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
              <MainListItems />
            </List>
          </Drawer>
          <Box
            component="main"
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
                          <TableCell>Disponible</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pros
                          .slice((page - 1) * process.env.REACT_APP_NB_ITEMS_BY_PAGE, (page * process.env.REACT_APP_NB_ITEMS_BY_PAGE))
                          .map((pro) => (
                            <Professionnel pro={pro} setPros={setPros} />
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
      </ThemeProvider>
    </div >
  );
}