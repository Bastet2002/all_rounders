import React from 'react';
import { Typography, Container } from '@mui/material';

const News = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        News & Updates
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Stay up to date with the latest from ALLROUNDERS.
      </Typography>
      {/* News content will go here */}
    </Container>
  );
};

export default News;