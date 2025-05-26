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
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0,0,0,0.4) 100%)',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(0,0,0,0) 100%)',
    zIndex: 1,
  },
   [theme.breakpoints.down('sm')]: {
    height: '40vh', // Slightly shorter on mobile
    marginTop: '0', 
    marginBottom: '1.5rem',
    
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
  background: 'linear-gradient(135deg, #f0fbff 0%, #e6f7fb 100%)',
  padding: theme.spacing(8, 0),
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-circle(circle, rgba(0, 190, 230, 0.03) 0%, transparent 70%)',
    animation: 'rotate 20s linear infinite',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0),
    minHeight: '80vh',
  },
}));


const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  position: 'relative',
  zIndex: 1,
  '& .MuiTabs-root': {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  '& .MuiTabs-indicator': {
    background: 'linear-gradient(90deg, #00BEE6, #0097B2)',
    height: 4,
   
    boxShadow: '0 2px 10px rgba(0, 190, 230, 0.3)',
  },
  '& .MuiTabs-flexContainer': {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
  
    padding: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#64748b',
   
    margin: '0 4px',
    minHeight: '60px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover': {
      background: 'rgba(0, 190, 230, 0.1)',
      color: '#00BEE6',
      transform: 'translateY(-2px)',
      '&::before': {
        left: '100%',
      },
    },
    '&.Mui-selected': {
      background: 'linear-gradient(135deg, #00BEE6, #0097B2)',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 190, 230, 0.4)',
      '&:hover': {
        background: 'linear-gradient(135deg, #00A8CC, #007A9A)',
        color: 'white',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiTab-root': {
      fontSize: '1rem',
      minHeight: '50px',
    },
  },
}));

const TabContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(8),
  flex: 1,
  height: '100%',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
    
    background: 'linear-gradient(135deg, rgba(0, 190, 230, 0.3), rgba(0, 151, 178, 0.3))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'exclude',
    maskComposite: 'exclude',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
    padding: theme.spacing(3),
  },
}));

// Update TabImage to have a fixed height
const TabImage = styled(Box)(({ theme }) => ({
  flex: 2.3,
  borderRadius: '16px',
  overflow: 'hidden',
  height: '60vh',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0), rgba(91, 44, 138, 0.1))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
    
  },
  '&:hover': {
    transform: 'scale(1.02) translateY(-4px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0)',
    '&::before': {
      opacity: 1,
    },
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
    
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    height: '40vh',
  },
}));

const TabTextContent = styled(Box)(({ theme }) => ({
  flex: 0.8,
  '& .tab-title': {
    background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 800,
    fontSize: '2.8rem',
    lineHeight: 1.2,
    marginBottom: '1.5rem',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      width: '50px',
      height: '3px',
      background: 'linear-gradient(90deg,rgb(102, 175, 234),rgb(75, 113, 162))',
      
    },
  },
  '& .tab-description': {
    fontSize: '1.3rem',
    color: '#64748b',
    lineHeight: 1.8,
    marginBottom: '2rem',
    fontWeight: 400,
  },
  '& .learn-more-btn': {
    background: 'linear-gradient(135deg,rgb(232, 234, 102) 0%,rgb(204, 113, 64) 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
      '&::before': {
        left: '100%',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    '& .tab-title': {
      fontSize: '2.2rem',
      '&::after': {
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    '& .tab-description': {
      fontSize: '1.1rem',
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  fontWeight: 800,
  background: 'linear-gradient(135deg,rgb(27, 31, 32) 0%,rgb(11, 12, 12) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '3.5rem',
  letterSpacing: '-0.02em',
  
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
      title: 'Thailand & SEA expansion',
      description: t('expansionDescription'),
      image: '/images/home/banner4.png',
      link: '/about', // Link to about page
    },
    {
      id: 4,
      title: 'Partnership & Collaboration',
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

     
      
      {/* Tab Section for other banners */}
      <TabSection>
      <SectionTitle variant="h3" component="h2" sx={{fontSize : { xs: '2rem', md: '3rem' }}}>
        {t('whatWeDo')}
      </SectionTitle>
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
                          <img src={bannerData[index].image} alt={bannerData[index].title} />
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
                          borderColor: '#00BEE6',
                          backgroundColor :"#000",
                          color: '#00BEE6',
                          borderRadius: '8px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#0097B2',
                            backgroundColor: 'rgba(0, 190, 230, 0.08)',
                            color: '#0097B2',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        Learn More
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

      {/* Rest of the content remains the same */}
      {/* ALLROUNDERS Journey Section */}
      <Box sx={{ py: { xs: 3, sm: 8 }, backgroundColor: '#fff' }}>
        <Container>
          <SectionTitle variant="h3" component="h2"  sx={{fontSize: { xs: '1.7rem', sm: '3.5rem', md: '3rem' },}}>
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