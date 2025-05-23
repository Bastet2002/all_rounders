import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

// Cookie utility functions
// Update the setCookie function to add secure flags when in production
const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  
  // Add secure and SameSite flags in production environment
  const secure = window.location.protocol === 'https:' ? '; Secure; SameSite=Lax' : '';
  document.cookie = name + '=' + (value || '') + expires + '; path=/' + secure;
};

const getCookie = (name) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const CookieBar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  color: '#fff',
  padding: theme.spacing(2, 3),
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(2),
  }
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    width: '100%',
    justifyContent: 'space-between',
  }
}));

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = getCookie('cookieConsent');
    if (!cookieConsent) {
      setOpen(true);
    }
  }, []);

  // Add this function to your component
  const displayConsentCookies = () => {
    const consentCookie = getCookie('cookieConsent');
    const analyticsCookie = getCookie('analyticsEnabled');
    
    console.log('Cookie Consent Status:', consentCookie || 'Not set');
    console.log('Analytics Enabled:', analyticsCookie || 'Not set');
  };
  
  // Then modify your handleAccept function
  const handleAccept = () => {
    // Set cookie for 365 days
    setCookie('cookieConsent', 'true', 365);
    setOpen(false);
    
    // You can set additional cookies or tracking here
    setCookie('analyticsEnabled', 'true', 365);
    
    // Display the cookies we just set
    displayConsentCookies();
    initializeAnalytics();
  };

  // Add this function to initialize analytics
const initializeAnalytics = () => {
    // Google Analytics
    if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
      // Initialize Google Analytics
      // This is a placeholder - you would add your actual GA initialization code here
      console.log('Analytics initialized');
      window.GA_INITIALIZED = true;
    }
    
    // Facebook Pixel
    if (typeof window !== 'undefined' && !window.FB_PIXEL_INITIALIZED) {
      // Initialize Facebook Pixel
      // This is a placeholder - you would add your actual FB Pixel initialization code here
      console.log('Facebook Pixel initialized');
      window.FB_PIXEL_INITIALIZED = true;
    }
  };
  
  // And your handleDecline function
  const handleDecline = () => {
    // Set cookie to remember the choice, but don't enable tracking
    setCookie('cookieConsent', 'false', 365);
    setOpen(false);
    
    // Display the cookies we just set
    displayConsentCookies();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ 
        width: '100%',
        maxWidth: '100%',
        bottom: { xs: 0, sm: 0 }
      }}
    >
      <CookieBar>
        <Box sx={{ maxWidth: { sm: '70%', md: '80%' } }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
            To learn more, please visit our <Link href="/privacy-policy" color="inherit" underline="always">Privacy Policy</Link>.
          </Typography>
        </Box>
        <ButtonGroup>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="small" 
            onClick={handleDecline}
            sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
          >
            Decline
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={handleAccept}
          >
            Accept
          </Button>
        </ButtonGroup>
      </CookieBar>
    </Snackbar>
  );
};

export default CookieConsent;