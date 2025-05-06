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
              <img src="/images/logo.png" alt="ALLROUNDERS" style={{ height: '170px', width: 'auto' }} />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              MENU
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.home}
            </Link>
            <Link component={RouterLink} to="/team" color="inherit" display="block" sx={{ mb: 1 }}>
              {t.team}
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
  
  {/* ALLROUNDERS Inc section */}
  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
    ALLROUNDERS Inc
  </Typography>
  <Box sx={{ display: 'flex', mb: 3 }}>
    <Button
      variant="contained"
      href="https://www.linkedin.com/company/allrounders-inc/posts/"
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
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          borderColor: '#006699',
        }
      }}
    >
      <Box 
        component="img" 
        src="/images/linkedin.png" 
        alt="Instagram" 
        sx={{ width: '24px', height: '24px' }} 
      />
    </Button>
  </Box>
  
  {/* ROUND8 section */}
  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
    ROUND8
  </Typography>
  <Box sx={{ display: 'flex' }}>
    {/* Instagram */}
    <Button
      variant="contained"
      href="https://www.instagram.com/round8_official/"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ 
        minWidth: 'unset',
        width: '40px',
        height: '40px',
        padding: '8px',
        backgroundColor: 'black',
        color: '#E1306C',
        borderColor: '#E1306C',
        mr: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          color: 'white',
        }
      }}
    >
      <Box 
        component="img" 
        src="/images/instagram.png" 
        alt="Instagram" 
        sx={{ width: '24px', height: '24px' }} 
      />
    </Button>
    
    {/* Facebook */}
    <Button
      variant="contained"
      href="https://www.facebook.com/profile.php?id=61556947506273"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ 
        minWidth: 'unset',
        width: '40px',
        height: '40px',
        padding: '8px',
        backgroundColor: 'black',
        color: '#1877F2',
        borderColor: '#1877F2',
        mr: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          color: 'white',
        }
      }}
    >
      <Box 
        component="img" 
        src="/images/facebook.png" 
        alt="Facebook" 
        sx={{ width: '23px', height: '23px' }} 
      />
    </Button>
    
    {/* Line */}
    <Button
      variant="contained"
      href="https://line.me/R/ti/p/@010kmkxs?from=page&liff.referrer=https%3A%2F%2Fround8-th.com%2F&accountId=010kmkxs"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ 
        minWidth: 'unset',
        width: '40px',
        height: '40px',
        padding: '8px',
        backgroundColor: 'black',
        color: '#06C755',
        borderColor: '#06C755',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.78)',
          color: 'white',
        }
      }}
    >
      <Box 
        component="img" 
        src="/images/line-icon.png" 
        alt="Line" 
        sx={{ width: '24px', height: '24px' }} 
      />
    </Button>
  </Box>
</Grid>


          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              CONTACT US
            </Typography>
            <Typography variant="body2" paragraph>
              Mon-Fri: 9am - 6pm 
            </Typography>
            <Typography variant="body2" paragraph>
              Email: round8@allrounders.io 
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