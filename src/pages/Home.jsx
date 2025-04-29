import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentNewsSection from '../components/RecentNewsSection';
import { useLanguage } from '../contexts/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const BannerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '90vh',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '80vh', // Slightly shorter on mobile
  },
}));

// New styled components for navigation arrows
const NavArrow = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 10,
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',

  },
  [theme.breakpoints.down('sm')]: {
    width: '45px',
    height: '45px',
  },
}));

// Add a swipe indicator animation
const SwipeIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '8px 16px',
  borderRadius: '20px',
  opacity: 0.8,
  animation: 'fadeInOut 1s infinite',
  '@keyframes fadeInOut': {
    '0%': { opacity: 0 },
    '50%': { opacity: 0.8 },
    '100%': { opacity: 0 },
  },
  [theme.breakpoints.down('sm')]: {
    bottom: '60px',
    padding: '6px 12px',
  },
}));

const BannerSlide = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1,
  },
}));

const BannerContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: 'black',
  maxWidth: '800px',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.69)',
  borderRadius: theme.spacing(2),
  border: '2px solid #333',
  margin: '0 auto', // Add this to ensure horizontal centering
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    width: '85%',
    maxWidth: '100%',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  fontWeight: 700,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
    marginBottom: theme.spacing(4),
  },
}));

const NewsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
  },
}));

const NewsCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
}));

const NewsCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

// Placeholder news data
const newsData = [
  {
    id: 1,
    title: 'ALLROUNDERS Expands Global Reach',
    date: 'June 15, 2023',
    description: 'Our company is proud to announce expansion into three new international markets, bringing our innovative solutions to more clients worldwide.',
    image: '/images/home/news1.png',
  },
  {
    id: 2,
    title: 'New Partnership Announcement',
    date: 'May 28, 2023',
    description: "We've partnered with industry leader TechGlobal to enhance our service offerings and provide cutting-edge solutions to our clients.",
    image: '/images/home/news1.png',
    },
  {
    id: 3,
    title: 'ALLROUNDERS Wins Innovation Award',
    date: 'April 10, 2023',
    description: 'Our team is honored to receive the 2023 Innovation Excellence Award for our groundbreaking approach to digital transformation.',
    image: '/images/home/news1.png',
  },
];

// Banner data - Let's update the image paths to ensure they're correct
const bannerData = [
  {
    id: 1,
    title: 'Welcome to ALLROUNDERS Inc',
    description: 'We bring together all-rounded talents, creating a team where strengths shine and weaknesses are supported.',
    image: '/images/home/banner1.png',
    buttonText: 'Explore More',
  },
  {
    id: 2,
    title: 'ROUND8',
    description: 'We offer the safest, and most convenient secondhand trading platform in SEA.',
    image: '/images/home/banner2.png',
    buttonText: 'Our Services',
  },
  {
    id: 3,
    title: 'Thailand & SEA expansion',
    description: 'Expanding from Thailand to Southeast Asia, we aim to unlock potential and elevate our global presence.',
    image: '/images/home/banner3.png',
    buttonText: 'Explore More',
  },
  {
    id: 4,
    title: 'Partnership & Collaboration ',
    description: 'At ALLROUNDERS, we create meaningful change through collaboration and partnerships.',
    image: '/images/home/banner4.png',
    buttonText: 'Contact Us',
  },
];

const Home = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);

  // Hide swipe indicator after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeIndicator(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Navigation functions remain the same
  const goToPrevSlide = () => {
    setActiveBanner((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setActiveBanner((prev) => (prev + 1) % bannerData.length);
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "backOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.2,
        ease: "backIn"
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <Box>
      {/* Banner Section */}
      <BannerSection>
        <AnimatePresence mode="wait">
          {bannerData.map((banner, index) => (
            activeBanner === index && (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <BannerSlide style={{ 
                    backgroundImage: `url(${banner.image})`,
                    backgroundColor: '#1976d2'
                  }}>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <BannerContent>
                        <motion.div
                          variants={titleVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                              fontSize: { xs: '1.6rem', sm: '2.5rem', md: '2.5rem' },
                              fontWeight: 700
                            }}
                          >
                            {banner.title}
                          </Typography>
                        </motion.div>
                        
                        <motion.div
                          variants={descriptionVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Typography 
                            variant="h6" 
                            paragraph
                            sx={{ 
                              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                              mb: { xs: 1.5, sm: 2 }
                            }}
                          >
                            {banner.description}
                          </Typography>
                        </motion.div>
                        
                        <motion.div
                          variants={buttonVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          exit="exit"
                        >
                          <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            sx={{ 
                              mt: { xs: 1, sm: 2 },
                              px: { xs: 2, sm: 3 },
                              py: { xs: 0.8, sm: 1 },
                              borderRadius: '30px',
                              fontWeight: 'bold',
                              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' }
                            }}
                          >
                            {banner.buttonText}
                          </Button>
                        </motion.div>
                      </BannerContent>
                    </motion.div>
                  </BannerSlide>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Enhanced navigation arrows with icons */}
        <NavArrow 
          onClick={goToPrevSlide} 
          sx={{ left: { xs: '15px', md: '40px' } }}
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
        </NavArrow>
        
        <NavArrow 
          onClick={goToNextSlide} 
          sx={{ right: { xs: '15px', md: '40px' } }}
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <KeyboardArrowRightIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
        </NavArrow>
        
        {/* Swipe indicator */}
        {showSwipeIndicator && (
          <SwipeIndicator component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}>
            <KeyboardArrowLeftIcon sx={{ mr: 1 }} />
            <Typography variant="body2">Swipe to explore</Typography>
            <KeyboardArrowRightIcon sx={{ ml: 1 }} />
          </SwipeIndicator>
        )}
        
        {/* Banner Navigation Dots with enhanced animation */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 10
          }}
        >
          {bannerData.map((_, index) => (
            <Box 
              key={index}
              onClick={() => setActiveBanner(index)}
              component={motion.div}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                width: activeBanner === index ? '12px' : '8px',
                height: activeBanner === index ? '12px' : '8px',
                borderRadius: '50%',
                backgroundColor: activeBanner === index ? 'primary.main' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeBanner === index ? '0 0 8px rgba(25, 118, 210, 0.8)' : 'none',
              }}
            />
          ))}
        </Box>
      </BannerSection>

      {/* ALLROUNDERS Journey Section */}
      <Box sx={{ py: { xs: 5, sm: 8 }, backgroundColor: '#f8f9fa' }}>
        <Container>
          <SectionTitle variant="h3" component="h2">
            ALLROUNDERS JOURNEY
          </SectionTitle>
          
          <Box 
            sx={{ 
              position: 'relative',
              width: '100%',
              height: { xs: '250px', sm: '350px', md: '400px' },
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Video placeholder */}
            <Box 
              sx={{
                width: { xs: '60px', sm: '80px' },
                height: { xs: '60px', sm: '80px' },
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  width: 0,
                  height: 0,
                  borderTop: { xs: '8px solid transparent', sm: '10px solid transparent' },
                  borderBottom: { xs: '8px solid transparent', sm: '10px solid transparent' },
                  borderLeft: { xs: '14px solid white', sm: '18px solid white' },
                  marginLeft: '5px',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Recent News Section */}
      <RecentNewsSection />
      </Box>
  );
};

export default Home;
