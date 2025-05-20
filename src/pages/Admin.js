import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Paper, Tabs, Tab, Alert } from '@mui/material';


const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();
 

  // Check if there's any stored content on component mount
  useEffect(() => {
    const storedWelcomeMessage = localStorage.getItem('adminWelcomeMessage');
    const storedHeroImageUrl = localStorage.getItem('adminHeroImageUrl');
    
    if (storedWelcomeMessage) setWelcomeMessage(storedWelcomeMessage);
    if (storedHeroImageUrl) setHeroImageUrl(storedHeroImageUrl);
  }, []);

  const handleLogin = () => {
    // Simple password check - in a real app, this would be handled securely on a server
    if (password === 'allrounders2023') { // Change this to your desired password
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [homeHeroTitle, setHomeHeroTitle] = useState('');
const [homeHeroSubtitle, setHomeHeroSubtitle] = useState('');
const [homeAboutText, setHomeAboutText] = useState('');





// Add a new function to save home page content
const handleSaveHomeContent = () => {
  localStorage.setItem('homeHeroTitle', homeHeroTitle);
  localStorage.setItem('homeHeroSubtitle', homeHeroSubtitle);
  localStorage.setItem('homeAboutText', homeAboutText);
  
  // Show success message
  setSaveSuccess(true);
  setTimeout(() => setSaveSuccess(false), 3000);
};

  if (!authenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Admin Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            ALLROUNDERS Admin Panel
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Back to Site
          </Button>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="admin tabs">
            <Tab label="Careers Form" />
            <Tab label="Contact Form" />
            <Tab label="Analytics" />
            
          </Tabs>
        </Box>
        
        {/* Careers Form Tab */}
        {activeTab === 0 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Careers Form Responses
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              <Typography variant="body1" gutterBottom>
                Click the button below to manage all career form submissions
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                href="https://tally.so/forms/mOrZ8K/submissions" 
                target="_blank"
                sx={{ mt: 2 }}
              >
                Manage Career Form Responses
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Contact Form Tab */}
        {activeTab === 1 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Form Responses
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              <Typography variant="body1" gutterBottom>
                Click the button below to manage all contact form submissions
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                href="https://tally.so/forms/3EAWj4/submissions" 
                target="_blank"
                sx={{ mt: 2 }}
              >
                Manage Contact Form Responses
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Analytics Tab */}
        {activeTab === 2 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Website Analytics
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              <Typography variant="body1" gutterBottom>
                View detailed website analytics on Vercel dashboard
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                href="https://vercel.com/nicholes-projects-f7918f39/allroundersinc/analytics" 
                target="_blank"
                sx={{ mt: 2 }}
              >
                Open Analytics
              </Button>
            </Box>
          </Box>
        )}
        
      </Paper>
    </Container>
  );
};

export default Admin;
