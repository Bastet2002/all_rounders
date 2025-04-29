import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../utils/translations';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Box sx={{ bgcolor: '#000000', color: 'white', pt: 5, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ mb: 2 }}>
              <img src="/images/logo.png" alt="ALLROUNDERS" style={{ height: '80px', width: 'auto' }} />
            </Box>
            <Typography variant="body2" paragraph>
                AllROUNDERS Inc
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              MENU
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.home}
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.ourCompany}
            </Link>
            <Link component={RouterLink} to="/service" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.ourService}
            </Link>
            <Link component={RouterLink} to="/news" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.news}
            </Link>
            <Link component={RouterLink} to="/careers" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.careers}
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block">
              {t.contactUs}
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us 
            </Typography>
            <Typography variant="body2">
            <Button
                  variant="contained"
                  href= "https://www.linkedin.com/company/allrounders-inc/posts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    minWidth: 'unset',
                    width: '40px',
                    height: '40px',
                    padding: '8px',
                    backgroundColor: 'black',
                    color: 'white',
                    borderColor: '#0077B5',
                    '&:hover': {
                      backgroundColor: '#006699',
                      borderColor: '#006699',
                    }
                  }}
                >
                  <LinkedInIcon />
                </Button>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              CONTACT US
            </Typography>
            <Typography variant="body2" paragraph>
              Mon-Fri: 9am - 5pm 
            </Typography>
            <Typography variant="body2" paragraph>
              Email: info@allrounders.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +66 0123456789
            </Typography>
            <Typography variant="body2">
            Address: BHIRAJ TOWER, 689 Sukhumvit Rd, Khlong Tan Nuea, Watthana, Bangkok
            10110
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} ALLROUNDERS Inc.All Rights Resevered.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;