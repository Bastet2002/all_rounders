import React from 'react';
import {Typography, Container } from '@mui/material';

const Careers = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Careers
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Join our team and help shape the future of second-hand trading.
      </Typography>
      {/* Careers content will go here */}
    </Container>
  );
};

export default Careers;