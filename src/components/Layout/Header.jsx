import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  // eslint-disable-next-line no-unused-vars
  const t = translations[language];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Our Company', path: '/about' },
    { text: 'Team', path: '/team' },
    { text: 'Our Service', path: '/service' },
    { text: 'News', path: '/news' },
    { text: 'Careers', path: '/careers' },
    { text: 'Contact', path: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            component={RouterLink} 
            to={item.path} 
            key={item.text}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={language === 'en'}
                onChange={toggleLanguage}
                name="languageToggle"
                color="primary"
              />
            }
            label={language === 'en' ? 'EN' : 'TH'}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="primary" elevation={1} sx={{ backgroundColor: '#000000' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img src="/images/logo.png" alt="ALLROUNDERS" style={{ height: '80px', width: 'auto' }} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{ mx: 1, color: 'white' }}
                >
                  {item.text}
                </Button>
              ))}
              <FormControlLabel
                control={
                  <Switch
                    checked={language === 'en'}
                    onChange={toggleLanguage}
                    name="languageToggle"
                    color="default"
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': { color: 'white' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'white' },
                      '& .MuiSwitch-switchBase': { color: 'gray' },
                      '& .MuiSwitch-track': { backgroundColor: 'gray' }
                    }}
                  />
                }
                label={language === 'en' ? 'EN' : 'TH'}
                sx={{ color: 'white', ml: 2 }}
              />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;