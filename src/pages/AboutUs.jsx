import React from 'react';
import { Box, Typography, Grid, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: ({ bgColor }) => bgColor || 'transparent',
}));

const HeroSection = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/images/building.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: theme.spacing(12, 0), // Reduce for mobile
    minHeight: '70vh',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(22, 0),
      minHeight: '80vh',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
  }));
  
  const HeroContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    color: 'black',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(5px)',
    maxWidth: '800px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  }));
// Update the MissionCard styled component
const MissionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  minHeight: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderRadius: theme.spacing(1),
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
  transition: 'all 0.4s ease',
  // Remove the hover styles from here as they'll be handled by motion.div
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
}));

const TimelineMarker = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: ({ bgColor }) => bgColor || theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: ({ textColor }) => textColor || '#fff',
  fontWeight: 'bold',
  marginRight: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

const TimelineContent = styled(Box)(({ theme }) => ({
  flex: 1,
  borderLeft: ({ borderColor }) => `1px solid ${borderColor || theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1150, // Reduced from 1000 to make it look better
  height: 450, // Increased height for better proportions
  backgroundColor: '#111',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  margin: '0 auto', // Center the container
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
    zIndex: 1,
  },
}));

const PlayButton = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
  },
}));

const AboutUs = () => {
  const { language } = useLanguage();
  // eslint-disable-next-line no-unused-vars
  const t = translations[language];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
          >
            <HeroContent>
              <Typography 
                variant="h3" 
                component="h1" 
                align="center" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  fontSize: {
                    xs: '1.8rem', // small screens
                    sm: '2.2rem', // medium screens and up
                    md: '2.5rem'  // large screens
                  }
                }}
              >
                About ALLROUNDERS Inc
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                paragraph
                sx={{ fontSize: {
                    xs: '1rem',
                    sm: '1.1rem',
                    md: '1.2rem'
                  } }}
              >
                ALLROUNDERS Inc. developed ROUND8, a global second-hand trading
                platform that ensures a safe and alternative experience with both its
                delivery and inspection systems.
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                paragraph
                sx={{ fontSize: {
                    xs: '1rem',
                    sm: '1.1rem',
                    md: '1.2rem'
                  } }}
              >
                By fostering a community that values economic consumption and
                resource recycling, ROUND8 introduces a new approach to second-hand
                trading. Starting in Thailand, the platform is set to expand across ASEAN,
                aiming to become a leading force in the region.
              </Typography>
            </HeroContent>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Our Missions Section */}
      <SectionContainer sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3 }} // Increased duration
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionContainer 
                sx={{ 
                  backgroundColor: "black",
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden',
                  position: 'relative',
                  py: 6,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(50,50,50,0.4) 0%, rgba(0,0,0,0.9) 100%)',
                    zIndex: 0,
                  }
                }}
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }} // Increased y offset
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }} // Increased duration and delay
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    align="center" 
                    gutterBottom
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 600, 
                      mb: 2,
                      position: 'relative',
                      zIndex: 2,
                      textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                      '&::after': {
                        content: '""',
                        display: 'block',
                        width: '80px',
                        height: '2px',
                        backgroundColor: '#fff',
                        margin: '15px auto 0',
                      }
                    }}
                  >
                    Our Missions
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ y: 50, opacity: 0 }} // Increased y offset
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }} // Increased duration and delay
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Typography 
                    variant="body1" 
                    align="center" 
                    paragraph 
                    sx={{ 
                      mb: 6, 
                      color: '#fff',
                      maxWidth: '700px', 
                      mx: 'auto',
                      position: 'relative',
                      zIndex: 2,
                      fontSize: '1.2rem',
                      fontWeight: 300,
                      letterSpacing: '0.5px',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      px: 3
                    }}
                  >
                    To provide a secure and innovative platform that brings new value to people in need
                  </Typography>
                </motion.div>
              </SectionContainer>
            </motion.div>
            
            {/* Added padding before the cards */}
            <Box sx={{ pt: 6, pb: 3 }}>
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.4, // Increased stagger delay between children
                      delayChildren: 0.3, // Added delay before starting children animations
                    }
                  }
                }}
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 80 }, // Increased y offset
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.8 } // Increased duration
                        }
                      }}
                      style={{ height: '100%' }}
                      whileHover={{ 
                        y: -15,
                        boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.5 } // Added transition duration for hover
                      }}
                    >
                      <MissionCard elevation={4}>
                        <Box sx={{ mb: 3, mt: 1 }}>
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 1 }}
                          >
                            <img src="/images/technology.png" alt="Technology" width="90" height="90" />
                          </motion.div>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                          Integrate advanced technology while prioritizing Thai markets
                        </Typography>
                      </MissionCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <motion.div  
                      variants={{
                        hidden: { opacity: 0, y: 80 }, // Increased y offset
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.8 } // Increased duration
                        }
                      }}
                      style={{ height: '100%' }}
                      whileHover={{ 
                        y: -15,
                        boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.5 } // Added transition duration for hover
                      }}
                    >
                      <MissionCard elevation={4}>
                        <Box sx={{ mb: 3, mt: 1 }}>
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 1 }}
                          >
                            <img src="/images/market.png" alt="Market" width="90" height="90" />
                          </motion.div>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                          Scale based on market needs, starting with Thailand while expanding into different businesses
                        </Typography>
                      </MissionCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <motion.div  
                      variants={{
                        hidden: { opacity: 0, y: 80 }, // Increased y offset
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.8 } // Increased duration
                        }
                      }}
                      style={{ height: '100%' }}
                      whileHover={{ 
                        y: -15,
                        boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
                        transition: { duration: 0.5 } // Added transition duration for hover
                      }}
                    >
                      <MissionCard elevation={4}>
                        <Box sx={{ mb: 3, mt: 1 }}>
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 1 }}
                          >
                            <img src="/images/global.png" alt="Global" width="90" height="90" />
                          </motion.div>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                          Expand operations across Southeast Asia
                        </Typography>
                      </MissionCard>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </SectionContainer>

      {/* Team Interview Section */}
      <SectionContainer bgColor="#f5f5f5" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 600, mb: 5 }}
            >
              Team Interview
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <VideoContainer>
                  <PlayButton>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box sx={{ width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '25px solid #333', ml: 1 }} />
                    </motion.div>
                  </PlayButton>
                </VideoContainer>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </SectionContainer>

 {/* Our Journey Section */}
 <SectionContainer sx={{ py: 0 }}>
        <Container maxWidth="lg">
        <Typography 
                variant="h4" 
                component="h2" 
                align="center" 
                gutterBottom 
                sx={{ py: 5, fontWeight: 600 }}
              >
                Our Journey
              </Typography>
          <Box 
            sx={{ 
              border: '2px solid #000', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              mb: 6
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              
              <Grid container>
                <Grid item xs={12} md={6} sx={{ 
                  backgroundColor: '#000', 
                  color: '#fff', 
                  p: { xs: 3, md: 5 }, 
                  px: { xs: 4, md: 8 } // Increased horizontal padding
                }}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                      2024
                    </Typography>
                    
                    <TimelineItem>
                      <TimelineMarker 
                        bgColor="#fff" 
                        textColor="#000"
                        sx={{ 
                          border: '2px solid #333',
                          boxShadow: '0 4px 12px rgba(255,255,255,0.2)' 
                        }}
                      >Q1</TimelineMarker>
                      <TimelineContent borderColor="#444">
                      <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                      - Establishment of ALLROUNDERS Inc <br />
                      - Product planning<br />
                      - Start social media management
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#fff" textColor="#000" sx={{ 
                          border: '2px solid #333',
                          boxShadow: '0 4px 12px rgba(255,255,255,0.2)' 
                        }}>Q2</TimelineMarker>
                  <TimelineContent borderColor="#444">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                    - Operated ROUND8 pre-registration page <br />
                    - Selected as an incubation company by Jeju startup bay<br />
                    - Start operating local interns (10+ interns)
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#fff" textColor="#000" sx={{ 
                          border: '2px solid #333',
                          boxShadow: '0 4px 12px rgba(255,255,255,0.2)' 
                        }}>Q3</TimelineMarker>
                  <TimelineContent borderColor="#444">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                    - Accumulated 500+ pre-registers <br />
                    - Expanded local partnerships in Thailand (20+ partners) <br />
                    - MVP version 1 development (Shopify, in-house)
                    </Typography>
                
                  </TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#fff" textColor="#000" sx={{ 
                          border: '2px solid #333',
                          boxShadow: '0 4px 12px rgba(255,255,255,0.2)' 
                        }}>Q4</TimelineMarker>
                  <TimelineContent borderColor="#444">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                      - MVP version 2 development (wordpress, outsource)<br />
                      - Setup of Bangkok office<br />
                      - Selected as an incubation company by Jeju creative economy innovation center<br />
                      - Appointed as a representative of the Korean business delegation by the Thai Embassy<br />
                      - Mobile UI/UX design completion
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ backgroundColor: '#fff', color: '#000', p: 5 }}>
                <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                  2025
                </Typography>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#000" textColor="#fff">Q1</TimelineMarker>
                  <TimelineContent borderColor="#ddd">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                    - MVP version 2 operation <br />
                    - Secured and trained local riders (1 full-time, 40+ part-timers)<br />
                    - Secured 40+ influencers for promotional support<br />
                    - Partnerships with K-beauty companies (3)<br />
                    - Selected as a KOSME global business centere Bangkok tenanat company<br />
                    - Negotiating partnerships with major Thai companies/universities<br />
                    - MVP version 3 development (Bubble, in-house)
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#000" textColor="#fff">Q2</TimelineMarker>
                  <TimelineContent borderColor="#ddd">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                        - Beta service launch (Targeting 3,000 Users)
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#000" textColor="#fff">Q3</TimelineMarker>
                  <TimelineContent borderColor="#ddd">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                        - Secure VC investment
                    </Typography>
                    
                  </TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineMarker bgColor="#000" textColor="#fff">Q4</TimelineMarker>
                  <TimelineContent borderColor="#ddd">
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                    - Official service launch (Targeting 20,000 Users) <br />
                    - Preparition for international expansion 
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Box>
        </Container>
      </SectionContainer>
      <Box sx={{ pt: 6, pb: 3 }}></Box>
    </>
  );
};

export default AboutUs;