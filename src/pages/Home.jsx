import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentNewsSection from '../components/RecentNewsSection';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Link as RouterLink } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';



// Styled components
const BannerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '91vh', // Reduced height for more compact look
  overflow: 'hidden',
  marginBottom: '2rem',
  
  [theme.breakpoints.down('sm')]: {
    height: '50vh', // Slightly shorter on mobile
    marginTop: '0', 
    marginBottom: '1.5rem',
    
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
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 40%',
  backgroundColor: '#000',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center', // Align content to bottom
  justifyContent: 'center',
}));

// Text overlay for the banner
const BannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '2rem',
  width: '100%',
  height: 'auto',
  padding: theme.spacing(2),
  color: 'white',
  font:'Roboto',
  textAlign: 'center',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0)',
  [theme.breakpoints.down('sm')]: {
    bottom: '0.6rem',
    
  },
}));

// Create a new component for the text section below the banner
const BannerCaption = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'white',
  padding: theme.spacing(0, 2),
  textAlign: 'center',
  borderBottom: '1px solidrgb(0, 0, 0)', 
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


const Home = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);

  const { language } = useLanguage();
  const t = key => translations[language][key] || key;


  const bannerData = [
    {
      id: 1,
      //title: 'Welcome to ALLROUNDERS Inc',
      description: t('description'),
      image: '/images/home/banner1.png',
      link: '/about', // Link to about page
    },
    {
      id: 2,
      //title: 'ROUND8',
      description: t('round8Description'),
      //image: '/images/home/banner2.png',
      video: '/images/home/ui4.mp4', 
      link: '/service', // Link to services page
      //isRound8: true, 
    },
    {
      id: 3,
      //title: 'Thailand & SEA expansion',
      description: t('expansionDescription'),
      image: '/images/home/banner4.png',
      link: '/about', // Link to about page
    },
    {
      id: 4,
      //title: 'Partnership & Collaboration',
      description: t('partnershipDescription'),
      image: '/images/home/banner3.png',
      link: "https://tally.so/r/3EAWj4" , // Link to contact page
    },
  ];

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
                      backgroundPosition: 'center center%',
                      backgroundSize: '70%',
                     
                    }}>
                      {banner.video && banner.isRound8 && (
                      <Box sx={{ 
                        width: { xs: '90%', sm: '70%' }, // Increased width
                        height: { xs: '80%', sm: '70%' }, // Increased height
                        display: 'flex',
                        flexDirection: 'row',
                        
                        backgroundColor: '#fff',
                        position: 'relative',
                        pl: { xs: 0, sm: 4, md: 12 } ,
                        mt: { xs: 0, sm: 12 },
                        mx: 'auto', // Center horizontally
                        my: 'auto', // Center vertically
                      }}>
                        {/* Left side - Logo */}
                        <Box sx={{
                          width: { xs: '35%', sm: '40%' }, // Full width on mobile, 30% on desktop
                          height: { xs: '100%', sm: '100%' }, // 30%
                          backgroundColor: '#white', // The cyan color from the image
                          display: 'flex', // Show on all devices
                          
                          justifyContent: 'center',
                          alignItems: { xs: 'center', sm: 'center' }, // Align to top on mobile
                          position: 'relative', // Keep as relative on all devices
                          pl: { xs: 0, sm: 5 }, // Remove left padding
                          pr: { xs: 0, sm: 0 }, // Remove right padding
                          pt: { xs: 0, sm: 0 },
                          mt: { xs: 0, sm: 0 },
                          
                        }}>
                          <img 
                            src="/images/home/banner2.png" 
                            alt="ROUND8 Logo" 
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>

          {/* Right side - Video */}      
    
    {/* Right side - Video */}
    <Box sx={{
      width: { xs: '80%', sm: '60%' }, // Full width on mobile, 65% on desktop
      height: { xs: '60%', sm: '90%' }, // 70% height on mobile, 90% on desktop
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      mx: { xs: '0', sm: '0' },
      paddingTop: { xs: '0', sm: '0' }, 
      pl: { xs: 0, sm: 0 },
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
    width: { xs: '90%', sm: '80%' }, // Full width to match image banners
    height: { xs: '90%', sm: '85%' }, // Full height to match image banners
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative',
    // Remove duplicate properties
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    
  }}>
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: '100%',
        height: '80%',
        objectFit: 'contain',
        
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
                  lineHeight: 1.6,
                  py: 1 // Add vertical padding
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
      <Box sx={{ py: { xs: 3, sm: 8 }, backgroundColor: '#fff' }}>
        <Container>
          <SectionTitle variant="h3" component="h2">
           {t('story')}
          </SectionTitle>
          
          {/* Replace the video container with an iframe */}
          <Box sx={{ 
            width: '100%', 
            maxWidth: '1200px', 
            margin: '0 auto',
            mb: 4,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative',
            paddingTop: '56.25%', // 16:9 aspect ratio
          }}>
            <iframe
              src="https://www.youtube.com/embed/PtvD49qNAkk" // Replace with your video URL
              title="ALLROUNDERS Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
          
      
        </Container>
      </Box>

      {/* Recent News Section */}
      <RecentNewsSection />
      </Box>
  );
};

export default Home;
