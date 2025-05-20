import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Button, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../utils/translations';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for accordion expanded panels
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Render content based on device size
  const renderContent = () => {
    if (isMobile) {
      return (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <img src="/images/logo.png" alt="ALLROUNDERS" style={{ height: '120px', width: 'auto' }} />
          </Box>
          
          <Accordion 
            expanded={expanded === 'menu'} 
            onChange={handleChange('menu')}
            sx={{ 
              backgroundColor: 'transparent', 
              color: 'white',
              boxShadow: 'none',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              sx={{ px: 1 }}
            >
              <Typography variant="h6">{t.menu}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1, pt: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link component={RouterLink} to="/" color="inherit">{t.home}</Link>
                <Link component={RouterLink} to="/team" color="inherit">{t.team}</Link>
                <Link component={RouterLink} to="/about" color="inherit">{t.ourCompany}</Link>
                <Link component={RouterLink} to="/service" color="inherit">{t.ourService}</Link>
                <Link component={RouterLink} to="/news" color="inherit">{t.news}</Link>
                <Link component={RouterLink} to="/careers" color="inherit">{t.careers}</Link>
                <Link component={RouterLink} to="/contact" color="inherit">{t.contactUs}</Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'follow'} 
            onChange={handleChange('follow')}
            sx={{ 
              backgroundColor: 'transparent', 
              color: 'white',
              boxShadow: 'none',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              sx={{ px: 1 }}
            >
              <Typography variant="h6">{t.followUs}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1, pt: 0 }}>
              <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                ALLROUNDERS Inc
              </Typography>
              <Box sx={{ display: 'flex', mb: 2 }}>
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
                    alt="LinkedIn" 
                    sx={{ width: '24px', height: '24px' }} 
                  />
                </Button>
                {/* You Tube */}
                <Button
                  variant="contained"
                  href="https://www.youtube.com/@ALLROUNDERSINC"
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
                    src="/images/youtube.png" 
                    alt="LinkedIn" 
                    sx={{ width: '24px', height: '24px' }} 
                  />
                </Button>
              </Box>
              
              <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                ROUND8
              </Typography>
              <Box sx={{ display: 'flex' }}>
                {/* Social media buttons */}
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
                  }}
                >
                  <Box 
                    component="img" 
                    src="/images/facebook.png" 
                    alt="Facebook" 
                    sx={{ width: '23px', height: '23px' }} 
                  />
                </Button>
                
                {/* Tiktok */}
                <Button
                  variant="contained"
                  href="https://www.tiktok.com/@round8_official"
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
                  }}
                >
                  <Box 
                    component="img" 
                    src="/images/tiktok.png" 
                    alt="Tiktok" 
                    sx={{ width: '24px', height: '24px' }} 
                  />
                </Button>
                
                {/* Line */}
                <Button
                  variant="contained"
                  href="https://line.me/R/ti/p/@010kmkxs"
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
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'contact'} 
            onChange={handleChange('contact')}
            sx={{ 
              backgroundColor: 'transparent', 
              color: 'white',
              boxShadow: 'none',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              sx={{ px: 1 }}
            >
              <Typography variant="h6">{t.contactUs}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1, pt: 0 }}>
              <Typography variant="body2" paragraph>
                Mon-Fri: 9am - 6pm 
              </Typography>
              <Typography variant="body2" paragraph>
                Email: round8@allrounders.io 
              </Typography>
              <Typography variant="body2">
                {t.address}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else {
      // Fixed desktop version with complete content
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ mb: 2 }}>
              <img src="/images/logo.png" alt="ALLROUNDERS" style={{ height: '170px', width: 'auto' }} />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              {t.menu}
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
              {t.followUs} 
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
                  alt="LinkedIn" 
                  sx={{ width: '24px', height: '24px' }} 
                />
              </Button>

              <Button
                variant="contained"
                href="https://www.youtube.com/@ALLROUNDERSINC"
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
                  src="/images/youtube.png" 
                  alt="LinkedIn" 
                  sx={{ width: '27px', height: '29px' }} 
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

              {/* Tiktok */}
              <Button
                variant="contained"
                href="https://www.tiktok.com/@round8_official"
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
                  src="/images/tiktok.png" 
                  alt="Tiktok" 
                  sx={{ width: '24px', height: '24px' }} 
                />
              </Button>
              
              {/* Line */}
              <Button
                variant="contained"
                href="https://line.me/R/ti/p/@010kmkxs"
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
              {t.contactUs}
            </Typography>
            <Typography variant="body2" paragraph>
              Mon-Fri: 9am - 6pm 
            </Typography>
            <Typography variant="body2" paragraph>
              Email: round8@allrounders.io 
            </Typography>
            <Typography variant="body2">
              {t.address}
            </Typography>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box sx={{ bgcolor: '#000000', color: 'white', pt: 5, pb: 2 }}>
      <Container maxWidth="lg">
        {renderContent()}
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Link component={RouterLink} to="/privacy-policy" color="inherit">
            {t.privacyPolicyF}
          </Link>
          <Link component={RouterLink} to="/terms" color="inherit">
            {t.termsAndConditions}
          </Link>
          <Link 
            href="#" 
            color="inherit" 
            onClick={() => {
              // Clear cookies and reload page to show consent banner again
              document.cookie = "cookieConsent=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              document.cookie = "analyticsEnabled=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              document.cookie = "languagePreference=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              window.location.reload();
            }}
          >
            {t.cookiePreferences}
          </Link>
        </Box>
        
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} ALLROUNDERS Inc. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;