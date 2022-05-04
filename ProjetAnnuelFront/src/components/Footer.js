import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Réalisé par Moussia M - Copyright © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Mentions légales
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}