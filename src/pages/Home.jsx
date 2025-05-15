import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentNewsSection from '../components/RecentNewsSection';
//import { useLanguage } from '../contexts/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const BannerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '91vh', // Reduced height for more compact look
  overflow: 'hidden',
  
  [theme.breakpoints.down('sm')]: {
    height: '40vh', // Slightly shorter on mobile
    marginTop: '0', 
    
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
    alignItems: 'center',
    justifyContent: 'center',
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

// Update BannerSlide to make the entire slide clickable
// Modify BannerSlide to remove the text overlay
// Update BannerSlide to include text overlay
const BannerSlide = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#000',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center', // Align content to bottom
  justifyContent: 'center',
}));

// Text overlay for the banner
const BannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0rem',
  width: '100%',
  height: '105px',
  padding: theme.spacing(2),
  color: 'white',
  textAlign: 'center',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0.54)',
  [theme.breakpoints.down('sm')]: {
    bottom: '0rem',
    
  },
}));

// Create a new component for the text section below the banner
const BannerCaption = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'white',
  padding: theme.spacing(4, 2),
  textAlign: 'center',
}));

// Update BannerContent to be at the bottom of the image
const BannerContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: 'white',
  width: '100%',
  padding: theme.spacing(3),
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
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

// Add a new styled component for the hover overlay
const HoverOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
  zIndex: 3,
}));

// const NewsCard = styled(Card)(({ theme }) => ({
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
//   },
// }));




// Banner data with links
const bannerData = [
  {
    id: 1,
    //title: 'Welcome to ALLROUNDERS Inc',
    description: 'We bring together all-rounded talents, creating a team where strengths shine and weaknesses are supported.',
    image: '/images/home/banner1.png',
    link: '/about', // Link to about page
  },
  {
    id: 2,
    //title: 'ROUND8',
    description: 'We offer the safest, and most convenient secondhand trading platform in SEA.',
    image: '/images/home/banner2.png',
    video: '/images/home/ui2.mp4', 
    link: '/service', // Link to services page
    isRound8: true, 
  },
  {
    id: 3,
    //title: 'Thailand & SEA expansion',
    description: 'Expanding from Thailand to Southeast Asia, we aim to unlock potential and elevate our global presence.',
    image: '/images/home/banner4.png',
    link: '/about', // Link to about page
  },
  {
    id: 4,
    //title: 'Partnership & Collaboration',
    description: 'At ALLROUNDERS, we create meaningful change through collaboration and partnerships.',
    image: '/images/home/banner3.png',
    link: '/services', // Link to contact page
  },
];

const Home = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);

  // Hide swipe indicator after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeIndicator(false);
    }, 100000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % bannerData.length);
    }, 50000); 

    return () => clearInterval(interval);
  }, []);

  // Navigation functions remain the same
  const goToPrevSlide = (e) => {
    e.stopPropagation(); // Prevent triggering the link when clicking navigation
    setActiveBanner((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  const goToNextSlide = (e) => {
    e.stopPropagation(); // Prevent triggering the link when clicking navigation
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

  return (
    <Box>
      {/* Banner Section */}
      <Box>
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
                <RouterLink to={banner.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <BannerSlide style={{ 
                      backgroundImage: banner.video ? 'none' : `url(${banner.image})`,
                      backgroundColor: '#000', 
                      backgroundPosition: 'center 20%',
                     
                    }}>
                      {banner.video && banner.isRound8 && (
                      <Box sx={{ 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        position: 'relative',
                        pl: { xs: 1, sm: 4, md: 12 } 
                      }}>
                        {/* Left side - Logo */}
                        <Box sx={{
                          width: { xs: '35%', sm: '30%' }, // Full width on mobile, 30% on desktop
                          height: { xs: '100%', sm: '100%' }, // 30%
                          backgroundColor: '#white', // The cyan color from the image
                          display: 'flex', // Show on all devices
                          justifyContent: 'center',
                          alignItems: { xs: 'flex-start', sm: 'center' }, // Align to top on mobile
                          position: 'relative', // Keep as relative on all devices
                          pl: { xs: 2, sm: 0 },
                          pt: { xs: 5, sm: 0 }, // Add top padding instead of margin
                          mt: { xs: 0, sm: 0 }, // 
                          
                        }}>
                          <img 
                            src="/images/home/banner2.png" 
                            alt="ROUND8 Logo" 
                            style={{
                              maxWidth: '120%',
                              maxHeight: '120%',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>

          {/* Right side - Video */}      
    
    {/* Right side - Video */}
    <Box sx={{
      width: { xs: '80%', sm: '65%' }, // Full width on mobile, 65% on desktop
      height: { xs: '60%', sm: '90%' }, // 70% height on mobile, 90% on desktop
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      mx: { xs: '0', sm: '10%' },
      paddingTop: { xs: '0', sm: '0' }, // Increased padding top on mobile for log 
    }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '120%',
          height: '120%',
          maxHeight: '120%',
          objectFit: 'contain'
        }}
      >
        <source src={banner.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  </Box>
)}

{/* Regular video rendering for non-ROUND8 banners */}
{banner.video && !banner.isRound8 && (
  <Box sx={{ 
    width: { xs: '100%', sm: '65%' },
    height: { xs: '100%', sm: '90%' }, // Full height on mobile 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    pl: { xs: 2, sm: 4, md: 6 }
  }}>
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: '120%',
        height: 'auto',
        maxHeight: '80%',
        objectFit: 'contain'
      }}
    >
      <source src={banner.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </Box>
)}
                        
                        <BannerOverlay>
                          <motion.div
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Typography 
                              variant="h4" 
                              component="h2"
                              gutterBottom
                              sx={{ 
                                fontWeight: 600,
                                textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
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
                              variant="body1"
                              sx={{ 
                                maxWidth: '800px',
                                margin: '0 auto',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Added font size
                                fontWeight: 500, // Added font weight
                                
                              }}
                            >
                              {banner.description}
                            </Typography>
                          </motion.div>
                        </BannerOverlay>
                      </BannerSlide>
                    </motion.div>
                  </RouterLink>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Navigation arrows and dots remain the same */}
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
          
          {/* Swipe indicator
          {showSwipeIndicator && (
            <SwipeIndicator component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}>
              <KeyboardArrowLeftIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Swipe to explore</Typography>
              <KeyboardArrowRightIcon sx={{ ml: 1 }} />
            </SwipeIndicator>
          )} */}
          
          
        </BannerSection>
        
        {/* Caption section below the banner */}
        <BannerCaption>
          <Container maxWidth="md">
            <motion.div
              key={bannerData[activeBanner].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h6" 
                component="p"
                sx={{ 
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  fontWeight: 400,
                  color: 'text.primary',
                  lineHeight: 1.6
                }}
              >
                {bannerData[activeBanner].caption}
              </Typography>
            </motion.div>
          </Container>
        </BannerCaption>
      </Box>

      {/* Rest of the content remains the same */}
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
