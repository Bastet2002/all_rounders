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
import ApartmentIcon from '@mui/icons-material/Apartment';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../utils/translations';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';


// Add this styled component for the logo container
const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  backgroundColor: 'black',
}));
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
    { text: t.ourCompany, path: '/about', icon: <ApartmentIcon /> },
    { text: t.team, path: '/team', icon: <Diversity3Icon /> },
    { text: t.ourService, path: '/service', icon: <img src="/images/banner2.png" alt="Round8" style={{ width: 26, height: 22 }} /> },
    { text: t.news, path: '/news', icon: <ArticleIcon/> },
    { text: t.careers, path: '/careers', icon: <BusinessCenterIcon /> },
    { text: t.contactUs, path: 'https://tally.so/r/3EAWj4', external: true, icon: <ContactMailIcon /> },
  ];

  // Animation variants for drawer items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Fix the drawer toggle implementation
  const drawer = (
    <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <DrawerHeader>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/images/logo.png" 
          alt="ALLROUNDERS Logo" 
          style={{ 
            width: 85, 
            height: 65,
            marginBottom: 0 
          }} 
        />
      </motion.div>
    </DrawerHeader>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <List>
        {menuItems.map((item, index) => (
          <motion.div 
            key={item.text}
            variants={itemVariants}
            custom={index}
          >
            {item.external ? (
              <ListItem 
                button 
                component="a" 
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main' }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ) : (
              <ListItem 
                button 
                component={RouterLink} 
                to={item.path}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )}
          </motion.div>
        ))}
        <motion.div
          variants={itemVariants}
          custom={menuItems.length}
        >
          <ListItem sx={{ color: 'primary.main' }}>
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
        </motion.div>
      </List>
    </motion.div>
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