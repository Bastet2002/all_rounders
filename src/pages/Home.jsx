import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Button, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentNewsSection from '../components/RecentNewsSection';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import '@fontsource/knewave';
import { Divider } from '@mui/material';

const HandwrittenOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '7%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 3,
  textAlign: 'center',
  width: '100%',
  display: 'none', // Hidden by default
  [theme.breakpoints.down('sm')]: {
    display: 'block', // Only show on mobile
  },
}));

// Add this after your existing styled components
const AnimatedText = styled(motion.div)(({ theme }) => ({
  fontFamily: "'Knewave', cursive",
  color: '#FFD700', // Yellow color
  textShadow: '3px 3px 6px rgba(0,0,0,0.6)',
  fontSize: '2.8rem',
  lineHeight: '1.1',
  marginBottom: '0.2em',
}));


// Styled components
const BannerSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '91vh',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '40vh',

  },
}));

// Welcome Banner specific styling
const WelcomeBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.5s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    zIndex: 1,
  },
   [theme.breakpoints.down('sm')]: {
    height: '40vh', // Slightly shorter on mobile
    marginTop: '0', 
    
    
  },
  
}));

const WelcomeContent = styled(Box)(({ theme }) => ({
  zIndex: 2,
  textAlign: 'center',
  color: 'white',
  maxWidth: '1200px',
  width: '100%',
  padding: theme.spacing(4),
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  
}));

// Tab section styling
const TabSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(6, 0),
  minHeight: '90vh', // Make it almost full screen
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
    minHeight: 'auto',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiTabs-indicator': {
    backgroundColor: '#000',
    height: 3,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#666',
    '&.Mui-selected': {
      color: '#000',
    },
  },
}));

// Update TabContent to take more vertical space
const TabContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(6),
  flex: 1, // Take available space
  height: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

// Update TabImage to have a fixed height
const TabImage = styled(Box)(({ theme }) => ({
  flex: 2.3,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  height: '60vh', // Fixed height for the image
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  [theme.breakpoints.down('md')]: {
    height: '40vh',
  },
}));

const TabTextContent = styled(Box)(({ theme }) => ({
  flex: 0.8,
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
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

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(255, 215, 0, 0.2)', // Semi-transparent gold
  zIndex: 2,
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
}));



const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { language } = useLanguage();
  const t = key => translations[language][key] || key;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % 3); // Cycle through 0, 1, 2
    }, 10000); // 20 seconds

    return () => clearInterval(tabInterval); // Cleanup on unmount
  }, []);


  const bannerData = [
    {
      id: 1,
      //title: 'Welcome to ALLROUNDERS Inc',
      //description: t('description'),
      image: '/images/home/banner1.png',
      mobileImage: '/images/home/banner1_mobile2.jpg',
      link: '/about', // Link to about page
    },
    {
      id: 2,
      title: 'ROUND8',
      description: t('round8Description'),
      //image: '/images/home/banner2.png',
      video: '/images/home/ui4.mp4', 
      link: '/service', // Link to services page
      //isRound8: true, 
    },
    {
      id: 3,
      title: t('thailandExpansion'),
      description: t('expansionDescription'),
      image: '/images/home/banner4.png',
      link: '/about', // Link to about page
      imageStyle: { // Custom style for banner 3
        objectFit: 'cover',
        maxHeight: '100%',
        width: 'auto',
        margin: '0 auto'
      }
    },
    {
      id: 4,
      title: t('partnership'),
      description: t('partnershipDescription'),
      image: '/images/home/banner3.png',
      link: "https://tally.so/r/3EAWj4" , // Link to contact page
    },
  ];


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.4,
        ease: "easeOut"
      }
    },
  };

  return (
    <Box>
      {/* Welcome Banner Section */}
      <BannerSection>
        <RouterLink to="/about" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          <WelcomeBanner style={{ 
            backgroundImage: `url(${isMobile && bannerData[0].mobileImage ? bannerData[0].mobileImage : bannerData[0].image})` 
          }}>
            {/* Add floating elements for visual interest */}
            <FloatingElement
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.7, 
                scale: 1,
                x: [0, 10, 0, -10, 0],
                y: [0, -10, 0, 10, 0],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              sx={{ 
                width: '100px', 
                height: '100px', 
                top: '15%', 
                left: '15%',
                display: { xs: 'none', md: 'block' }
              }}
            />
            <FloatingElement
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.5, 
                scale: 1,
                x: [0, -15, 0, 15, 0],
                y: [0, 15, 0, -15, 0],
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
              sx={{ 
                width: '150px', 
                height: '150px', 
                bottom: '20%', 
                right: '20%',
                display: { xs: 'none', md: 'block' }
              }}
            />
            {/* <HandwrittenOverlay>
            <AnimatedText
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              sx={{ fontSize: '3.6rem', color: '#FFD700' }}
            >
              We
            </AnimatedText>
            <AnimatedText
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              sx={{ fontSize: '3.6rem', color: '#FFD700' }}
            >
              are
            </AnimatedText>
            <AnimatedText
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              sx={{ fontSize: '3.6rem', color: '#FFD700' }}
            >
              ALLROUNDERS
            </AnimatedText>
          </HandwrittenOverlay> */}
            <WelcomeContent>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={titleVariants}
              >
                <Typography 
                  variant="h2" 
                  component="h1"
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                    fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem' }, // Smaller on mobile
                    mb: 2
                  }}
                >
                  {bannerData[0].title}
                </Typography>
              </motion.div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={descriptionVariants}
              >
                <Typography 
                  variant="h5"
                  sx={{ 
                    maxWidth: '1000px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    fontSize: { xs: '1rem', sm: '1.4rem', md: '1.9rem' }, // Smaller on mobile
                    fontWeight: { xs: 600, sm: 800 }, // Less bold on mobile
                    textAlign: 'center',
                    margin: '0 auto',
                    mb: 4
                  }}
                >
                  {bannerData[0].description}
                </Typography>
              </motion.div>

              {/* ... existing button code ... */}
            </WelcomeContent>
          </WelcomeBanner>
        </RouterLink>
      </BannerSection>

      <Box sx={{ pt: 2, pb: 1 }}></Box>
      <SectionTitle variant="h3" component="h2">
            {t('whatWeDo')}?
          </SectionTitle>
      {/* Tab Section for other banners */}
      <TabSection>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
          <StyledTabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered
            variant="fullWidth"
            sx={{fontSize: { xs: '1rem', sm: '3.5rem', md: '4rem' },}}
            
          >
            <Tab label={bannerData[1].title} />
            <Tab label={bannerData[2].title} />
            <Tab label={bannerData[3].title} />
          </StyledTabs>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            {[1, 2, 3].map((index) => (
              activeTab === index - 1 && (
                <motion.div
                  key={bannerData[index].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <TabContent>
                  <TabImage>
                        {bannerData[index].video && index === 1 ? (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                          >
                            <source src={bannerData[index].video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img src={bannerData[index].image} alt={bannerData[index].title} style={bannerData[index].imageStyle || {}} />
                        )}
                      </TabImage>
                    <TabTextContent>
                      <Typography 
                        variant="h3" 
                        component="h2"
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '1.5rem', sm: '2.2rem', md: '2.5rem' },
                          mb: 3
                        }}
                      >
                        {bannerData[index].title}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                          color: '#555',
                          mb: 4,
                          lineHeight: 1.6
                        }}
                      >
                        {bannerData[index].description}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        component={RouterLink}
                        to={bannerData[index].link}
                        size="large"
                        sx={{
                          
                          backgroundColor: 'rgb(0, 0, 0)',
                          color: '#fff',
                          borderRadius: '50px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          '&:hover': {
                            
                            backgroundColor: 'rgba(0,0,0,0.04)',
                          }
                        }}
                      >
                        {t('exploreMore')}
                      </Button>
                    </TabTextContent>
                  </TabContent>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          </Box>
        </Container>
      </TabSection>
      <Divider sx={{ 
        my: { xs: 0.1, sm: 1 } // Less margin on mobile, normal on desktop
      }} /> 
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
      <Divider sx={{ my: 4 }} /> 

      {/* Recent News Section */}
      <RecentNewsSection />
    </Box>
  );
};

export default Home;