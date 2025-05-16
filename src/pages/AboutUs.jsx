import React from 'react';
import { Box, Typography, Grid, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';

// Styled components
const ExpandableTimelineContent = ({ content }) => {
    const [expanded, setExpanded] = useState(false);
    
    // Split content by line breaks to get individual bullet points
    const bulletPoints = content.split('\n').filter(point => point.trim() !== '');
    
    // If there are only 2 or fewer bullet points, just display them all
    if (bulletPoints.length <= 2) {
      return (
        <Box component="ul" sx={{ pl: 2, m: 0, flex:1, pb:0 }}>
          {bulletPoints.map((point, index) => (
            <Typography component="li" variant="body1" key={index} sx={{ fontWeight: 500, mb: 1 }}>
              {point.trim()}
            </Typography>
          ))}
        </Box>
      );
    }
    
    // Otherwise, show only first 2 by default with expand option
    return (
      <>
        <Box component="ul" sx={{ pl: 2, m: 0, mb: 0.5, flex:1, pb:0 }}>
          {(expanded ? bulletPoints : bulletPoints.slice(0, 2)).map((point, index) => (
            <Typography component="li" variant="body1" key={index} sx={{ fontWeight: 500, mb: 0 }}>
              {point.trim()}
            </Typography>
          ))}
        </Box>
        <Button 
          onClick={() => setExpanded(!expanded)} 
          sx={{ 
            minWidth: 'auto', 
            p: 0.5, 
            mt: 0, 
            ml: 1,
            mb: 0,
            color: 'inherit',
            textTransform: 'none',
            fontSize: '0.8rem'
          }}
        >
          {expanded ? (
            <>
              <ExpandLessIcon fontSize="small" sx={{ mr: 0.5 }} /> Show less
            </>
          ) : (
            <>
              <ExpandMoreIcon fontSize="small" sx={{ mr: 0.5 }} /> Show more ({bulletPoints.length - 2} more)
            </>
          )}
        </Button>
      </>
    ); 
  };

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: ({ bgColor }) => bgColor || 'transparent',
  fontFamily: 'Roboto, sans-serif', 
}));

const HeroSection = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/images/building.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: 'Roboto, sans-serif',
    padding: theme.spacing(12, 0), // Reduce for mobile
    minHeight: '70vh',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(22, 0),
      minHeight: '70vh',
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
    justifyContent: 'center',
    color: 'black',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(5px)',
    fontFamily: 'Roboto, sans-serif', 
    maxWidth: '1200px',
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
  maxWidth: '900px',
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
  fontFamily: 'Roboto, sans-serif',
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
  const t = key => translations[language][key] || key;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

    // Add global typography style
    const typographyStyle = {
      fontFamily: 'Roboto, sans-serif'
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
                    xs: '1.6rem', // small screens
                    sm: '2.2rem', // medium screens and up
                    md: '2.5rem'  // large screens
                  }
                }}
              >
                 {t('aboutUsTitle')}
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
                {t('aboutUsDescription1')}
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
                {t('aboutUsDescription2')}
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
                        fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2.2rem' } ,
                      }
                    }}
                  >
                    {t('ourMissions')}
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
                      fontSize: { xs: '1rem', sm: '1.8rem', md: '1.5rem' } ,
            
                      fontWeight: 300,
                      letterSpacing: '0.5px',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      px: 3
                    }}
                  >
                    {t('missionStatement')}
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
                      <motion.div
                        animate={{ 
                            y: [0, -10, 0] 
                        }}
                        transition={{ 
                            duration: 1.2, 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            ease: "easeInOut" 
                        }}
                        >
                        <img src="/images/tech.png" alt="Market" width="90" height="90" />
                        <Box sx={{ mt: 3 }}></Box>
                        </motion.div>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                            {t('missionCard1Title')}
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
                      <motion.div
                        animate={{ 
                            y: [0, -10, 0] 
                        }}
                        transition={{ 
                            duration: 1.2, 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            ease: "easeInOut" 
                        }}
                        >
                        <img src="/images/market.png" alt="Market" width="95" height="95" />
                        <Box sx={{ mt: 3 }}></Box>
                        </motion.div>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                            {t('missionCard2Title')}
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
                      <motion.div
                        animate={{ 
                            y: [0, -10, 0] 
                        }}
                        transition={{ 
                            duration: 1.2, 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            ease: "easeInOut" 
                        }}
                        >
                        <img src="/images/asia.png" alt="Market" width="80" height="80" />
                        <Box sx={{ mt: 3 }}></Box>
                        </motion.div>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
                            {t('missionCard3Title')}
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
        {/* Mobile View - Stack 2024 and 2025 completely separate */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {/* 2024 Section */}
          <Box>
            <Box sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444'
            }}>
              <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                2024
              </Typography>
            </Box>
            
            {/* Q1 2024 */}
            <Box sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q1</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content= {t('timeline2024Q1')} />
                </Box>
              </Box>
            </Box>
            
            {/* Q2 2024 */}
            <Box sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q2</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content={t('timeline2024Q2')} />
                </Box>
              </Box>
            </Box>
            
            {/* Q3 2024 */}
            <Box sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q3</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Accumulated 500+ pre-registers 
- Expanded local partnerships in Thailand (20+ partners) 
- MVP version 1 development (Shopify, in-house)" />
                </Box>
              </Box>
            </Box>
            
            {/* Q4 2024 */}
            <Box sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q4</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- MVP version 2 development (wordpress, outsource)
- Setup of Bangkok office
- Selected as an incubation company by Jeju creative economy innovation center
- Appointed as a representative of the Korean business delegation by the Thai Embassy
- Mobile UI/UX design completion" />
                </Box>
              </Box>
            </Box>
          </Box>
          
          {/* 2025 Section */}
          <Box>
            <Box sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd'
            }}>
              <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                2025
              </Typography>
            </Box>
            
            {/* Q1 2025 */}
            <Box sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q1</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- MVP version 2 operations
- Secured 40+ influencers for promotional support
- Secured and trained local riders (1 full-time, 40+ part-timers)
- Partnerships with K-beauty companies (3)
- Selected as a KOSME global business centere Bangkok tenanat company
- Negotiating partnerships with major Thai companies/universities
- MVP version 3 development (Bubble, in-house)" />
                </Box>
              </Box>
            </Box>
            
            {/* Q2 2025 */}
            <Box sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q2</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Beta service launch (Targeting 3,000 Users)" />
                </Box>
              </Box>
            </Box>
            
            {/* Q3 2025 */}
            <Box sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q3</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Secure VC investment hello" />
                </Box>
              </Box>
            </Box>
            
            {/* Q4 2025 */}
            <Box sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q4</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Official service launch (Targeting 20,000 Users) 
- Preparition for international expansion" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        
        {/* Desktop View - Side by side layout */}
        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* Headers */}
          <Grid item xs={6} sx={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            p: 2,
            pb:1,
            borderBottom: '1px solid #444'
          }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              2024
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ 
            backgroundColor: '#fff', 
            color: '#000', 
            p: 3,
            borderBottom: '1px solid #ddd'
          }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              2025
            </Typography>
          </Grid>
          
          {/* Q1 Row */}
          <Grid container>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444',
              height: '300px',
              overflow: 'auto',
            height: '140px', // Fixed height for desktop view
            transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
            '&.expanded': {
                height: 'auto', // Will expand when content expands
                minHeight: '180px'
            }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q1</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Establishment of ALLROUNDERS Inc
- Product planning
- Start social media management" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd',
              height: '300px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q1</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- MVP version 2 operations
- Secured 40+ influencers for promotional support
- Secured and trained local riders (1 full-time, 40+ part-timers)
- Partnerships with K-beauty companies (3)
- Selected as a KOSME global business centere Bangkok tenanat company
- Negotiating partnerships with major Thai companies/universities
- MVP version 3 development (Bubble, in-house)" />
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          {/* Q2 Row */}
          <Grid container>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444',
              height: '250px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q2</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Operated ROUND8 pre-registration page 
- Selected as an incubation company by Jeju startup bay
- Start operating local interns (10+ interns)" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd',
              height: '250px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q2</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Beta service launch (Targeting 3,000 Users)" />
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          {/* Q3 Row */}
          <Grid container>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #444',
              height: '250px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q3</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Accumulated 500+ pre-registers 
- Expanded local partnerships in Thailand (20+ partners) 
- MVP version 1 development (Shopify, in-house)" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              borderBottom: '1px solid #ddd',
              height: '250px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q3</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Secure VC investment" />
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          {/* Q4 Row */}
          <Grid container>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#000', 
              color: '#fff', 
              p: 2,
              pb:1,
              height: '300px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#fff" 
                  textColor="#000"
                  sx={{ 
                    border: '2px solid #333',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}
                >Q4</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- MVP version 2 development (wordpress, outsource)
- Setup of Bangkok office
- Selected as an incubation company by Jeju creative economy innovation center
- Appointed as a representative of the Korean business delegation by the Thai Embassy
- Mobile UI/UX design completion" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ 
              backgroundColor: '#fff', 
              color: '#000', 
              p: 2,
              pb:1,
              height: '300px',
              overflow: 'auto',
              height: '140px', // Fixed height for desktop view
              transition: 'height 0.3s ease-in-out', // Smooth transition for height changes
              '&.expanded': {
                  height: 'auto', // Will expand when content expands
                  minHeight: '180px'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TimelineMarker 
                  bgColor="#000" 
                  textColor="#fff"
                  sx={{ flexShrink: 0 }}
                >Q4</TimelineMarker>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <ExpandableTimelineContent content="- Official service launch (Targeting 20,000 Users) 
- Preparition for international expansion" />
                </Box>
              </Box>
            </Grid>
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