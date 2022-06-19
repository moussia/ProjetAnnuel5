import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles'; // TODO replace
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
// import { MainListItems } from '../../views/admin/ListItems';

const useStyles = makeStyles((theme) => ({
    tailleeye: {
        width: '25px',
        cursor: 'pointer',
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
        axios({ url: 'http://localhost:3003/admin/parents', method: 'GET', withCredentials: true })
            .then((data) => setParent(data.data))
    }, []);

    const deleteParent = async (id) => {
        const res = await axios({ url: `http://localhost:3003/admin/parent/${id}`, method: 'DELETE', withCredentials: true }
        );
        if (res.status === 204)
            setParent((prev) => [...prev.filter((item) => item._id !== id)]);
    };

    return (
        <div>
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
                                <Link onClick={() => deleteParent(parent._id)}>
                                    <img src={require('../../images/poubelle-de-recyclage.png')} alt="traitement" className={classes.tailleeye} />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}