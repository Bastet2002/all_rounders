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
  FormControlLabel,
  ListItemIcon
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../utils/translations';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
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

  const handleInputChange = () => {
    toggleLanguage();
  };

  const menuItems = [
    { text: t.ourCompany, path: '/about', icon: <BusinessIcon /> },
    { text: t.team, path: '/team', icon: <GroupIcon /> },
    { text: t.ourService, path: '/service', icon: <MiscellaneousServicesIcon /> },
    { text: t.news, path: '/news', icon: <NewspaperIcon /> },
    { text: t.careers, path: '/careers', icon: <WorkIcon /> },
    { text: t.contactUs, path: 'https://tally.so/r/3EAWj4', external: true, icon: <ContactMailIcon /> },
  ];

  // Fix the drawer toggle implementation
  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          item.external ? (
            <ListItem 
              button 
              component="a" 
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              key={item.text}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ) : (
            <ListItem 
              button 
              component={RouterLink} 
              to={item.path} 
              key={item.text}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )
        ))}
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={language === 'th'}
                onChange={handleInputChange}
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
                item.external ? (
                  <Button
                    key={item.text}
                    component="a"
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mx: 1, color: 'white' }}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{ mx: 1, color: 'white' }}
                  >
                    {item.text}
                  </Button>
                )
              ))}
              <FormControlLabel
                control={
                  <Switch
                    checked={language === 'th'}
                    onChange={handleInputChange}
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