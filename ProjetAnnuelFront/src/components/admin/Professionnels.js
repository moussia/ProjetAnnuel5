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
import { mainListItems } from '../../views/admin/ListItems';
// import { MainListItems } from '../../views/admin/ListItems';

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
    <div>


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


    </div >
  );
}