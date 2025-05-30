import React, { useState } from 'react';
import { Box, Typography, Grid, Container, Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import {motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// Import teamData
import teamData from '../data/teamData.json';
// Import useLanguage hook
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';


// Add this import at the top
import { keyframes } from '@mui/material/styles';

// Add these keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Update the PageContainer
const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(-45deg,rgb(255, 255, 255),rgb(255, 255, 255),rgb(255, 255, 255),rgb(255, 255, 255))',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 6s ease infinite`,
  minHeight: '100vh',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  fontFamily: 'Roboto, sans-serif',
  '& *': {
    fontFamily: 'Roboto, sans-serif',
  }
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
  
  
    // Animation variants
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };

const ShimmerText = styled(Typography)(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    color: 'black',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: '200% 100%',
      animation: 'shimmer 2s infinite',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '@keyframes shimmer': {
      '0%': {
        backgroundPosition: '100% 50%',
        opacity: 0,
      },
      '30%': {
        opacity: 0.8,
      },
      '100%': {
        backgroundPosition: '-100% 50%',
        opacity: 0,
      },
    },
  }));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(1),
}));

const TeamCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f9f9f9',
  position: 'relative',
  cursor: 'pointer',
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 140, // Increased from 120
  height: 140, // Increased from 120
  margin: '0 auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  border: '3px solid #fff',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
}));

const TeamInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  textAlign: 'left',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#000',
}));

const TeamNameRole = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(1),
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.5, 2),
  fontWeight: 600,
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: 'rgba(255, 251, 251, 0.59)',
  },
  alignSelf: 'center',
  marginTop: theme.spacing(1),
}));

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0)",
      transition: { duration: 0.3 }
    }
  };

const Team = () => {

  const navigate = useNavigate();
  // State to track hover state for each team member
  const [hoveredRoles, setHoveredRoles] = useState({});
  const { language } = useLanguage();
  const currentLanguage = language || 'en';
  const t = key => translations[language][key] || key;

  // Function to handle role hover
  const handleRoleHover = (memberId, isHovered) => {
    setHoveredRoles(prev => ({
      ...prev,
      [memberId]: isHovered
    }));
  };
  const handleTeamMemberClick = (memberId) => {
    navigate(`/team/${memberId}`);
  };

  // Get translated content
  const getTranslatedContent = (content) => {
    if (!content) return '';
    
    // If content is an object with language keys
    if (typeof content === 'object' && content[currentLanguage]) {
      return content[currentLanguage];
    }
    
    // If it's just a string
    return content;
  };

  // Get translated name
  const getTranslatedName = (member) => {
    if (member.translatedName && member.translatedName[currentLanguage]) {
      return member.translatedName[currentLanguage];
    }
    return member.name;
  };

  
  // Filter team members by role type
  const coreTeam = teamData.team.filter(member => !member.isPreRounder);
  const preRounders = teamData.team.filter(member => member.isPreRounder);
  
  
  return (
    <PageContainer>
      <Container 
        maxWidth="lg" 
        sx={{ 
          px: { xs: 7, sm: 9, md: 11 } // Added padding on both sides that increases with screen size
        }}
      >
        {/* ROUNDERS Section */}
        <SectionContainer>
          <SectionTitle>
          <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <Typography variant="h5" fontWeight={700} sx={{ fontSize: '1.5rem' }}>ROUNDERS</Typography>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PeopleIcon fontSize="small" />
                
              </Box>
            </motion.div>
          </SectionTitle>
          <Box sx={{ pt: 1 }}></Box>

          {/* Animated "meet our ceo" text */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.1 }}
          >
          <Box sx={{ mb: 2, height: { xs: '2rem', sm: '2rem' } }}>
            <motion.div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px',
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}>
              {[t('meet'), t('our'), t('ceo')].map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (i * 0.2),
                    ease: "easeOut" 
                  }}
                >
                  <ShimmerText  
                    fontWeight={400} 
                    component="span"
                    sx={{
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <Typography 
                      fontWeight={500} 
                      component="span"
                      sx={{ 
                        fontSize: { xs: '1.3rem', sm: '2rem' } 
                      }}
                    >
                      {word}
                    </Typography>
                  </ShimmerText>  
                </motion.div>
              ))}
            </motion.div>
          </Box>
          <Box sx={{ pt: 4 }}></Box>
          {/* Featured Team Member - Hyun Ji Kim */}
          <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.1 }}
        onClick={() => handleTeamMemberClick('hyunji-kim')}
      >
          <TeamCard elevation={1} sx={{ maxWidth: '100%', mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Box sx={{ 
                p: 3, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                width: { xs: '100%', sm: '30%' }
              }}>
                <Avatar 
                  src="/images/team/hyun.png" 
                  alt="Hyun Ji Kim"
                  sx={{ 
                    width: { xs: 140, sm: 180 }, // Increased from 120/150
                    height: { xs: 140, sm: 180 }, // Increased from 120/150
                    border: '4px solid #fff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
              </Box>
              
              <Box sx={{ 
                p: 3, 
                backgroundColor: '#000',
                color: '#fff',
                width: { xs: '100%', sm: '70%' }
              }}>
                <Box sx={{mb: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.25rem' }}>
                    {getTranslatedName(coreTeam[0])}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      color="white" 
                      fontWeight={500} 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem'
                      }}
                      onMouseEnter={() => handleRoleHover('hyunji-kim', true)}
                      onMouseLeave={() => handleRoleHover('hyunji-kim', false)}
                    >
                      {hoveredRoles['hyunji-kim'] 
                              ? getTranslatedContent(coreTeam[0].funnyRole) 
                              : getTranslatedContent(coreTeam[0].role)}
                    </Typography>
                    <Typography sx={{ ml: 0.5 }}>👩🏻‍💼</Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="white" paragraph sx={{ fontSize: '1rem' }}>
                  {getTranslatedContent(coreTeam[0].bio).substring(0, 282)}...
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ReadMoreButton 
                    component={Link} 
                    to="/team/hyunji-kim"  // Updated to match the new ID
                    variant="contained"
                    size="small"
                  >
                     {t('readMore')}
                  </ReadMoreButton>
                </Box>
              </Box>
            </Box>
          </TeamCard>
          </motion.div>
          </motion.div>
          <Box sx={{ pt: 4, pb: 1 }}></Box>
          {/* Team Interview Section */}
      <SectionContainer bgColor="#f5f5f5" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            {/* Animated "meet our team" text */}
          <Box sx={{ mb: 2, height: { xs: '2rem', sm: '2rem' } }}>
            <motion.div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px',
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}>
              {[t('team'), t('interview')].map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (i * 0.2),
                    ease: "easeOut" 
                  }}
                >
                  <ShimmerText  
                    fontWeight={400} 
                    component="span"
                    sx={{
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <Typography 
                      fontWeight={500} 
                      component="span"
                      sx={{ 
                        fontSize: { xs: '1.3rem', sm: '2rem' } 
                      }}
                    >
                      {word}
                    </Typography>
                  </ShimmerText>  
                </motion.div>
              ))}
            </motion.div>
          </Box>
          </motion.div>
        </Container>
        {/* Replace the video container with an iframe */}
        <Box sx={{ 
              width: { xs: '280px', sm: '100%' }, 
              height: { xs: '210px', sm: '500px' }, 
              maxWidth: '1200px', 
          
              mb: 4,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              position: 'relative',
              display: 'flex',
              mx: { xs: 'auto', sm: 'auto' }, 
            }}>
              <iframe
                src="https://www.youtube.com/embed/HcnscqB4edQ" // Replace with your video URL
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
      </SectionContainer>
          {/* Animated "meet our team" text */}
          <Box sx={{ mb: 2, height: { xs: '2rem', sm: '2rem' } }}>
            <motion.div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px',
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}>
              {[t('meet'), t('our'), t('team')].map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (i * 0.2),
                    ease: "easeOut" 
                  }}
                >
                  <ShimmerText  
                    fontWeight={400} 
                    component="span"
                    sx={{
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <Typography 
                      fontWeight={500} 
                      component="span"
                      sx={{ 
                        fontSize: { xs: '1.3rem', sm: '2rem' } 
                      }}
                    >
                      {word}
                    </Typography>
                  </ShimmerText>  
                </motion.div>
              ))}
            </motion.div>
          </Box>
          <Box sx={{ pt: 4 }}></Box>
          
          {/* Other Core Team Members */}
          <Grid container spacing={8}>
            {coreTeam.slice(1).map((member,index) => (
              <Grid item xs={12} sm={6} key={member.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTeamMemberClick(member.id)}
            
                >
                <TeamCard elevation={1}>
                  <Box sx={{ 
                    p: 3, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black'
                  }}>
                    <TeamAvatar src={member.image} alt={member.name} />
                  </Box>
                  
                  <TeamInfo>
                    <TeamNameRole>
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.25rem',color:'white' }}>
                        {getTranslatedName(member)}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center',color:'black' }}>
                        <Typography 
                          variant="body2" 
                          color="white" 
                          fontWeight={500}
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem',
                          }}
                          onMouseEnter={() => handleRoleHover(member.id, true)}
                          onMouseLeave={() => handleRoleHover(member.id, false)}
                        >
                          {hoveredRoles[member.id] 
                              ? getTranslatedContent(member.funnyRole) 
                              : getTranslatedContent(member.role)}
                        </Typography>
                        {member.roleIcon && (
                          <Typography sx={{ ml: 0.5 }}>{member.roleIcon}</Typography>
                        )}
                      </Box>
                    </TeamNameRole>
                    
                    <Typography 
                      variant="body2" 
                      color="white" 
                      sx={{ mb: 2, fontSize: '1rem' }}
                    >
                      {getTranslatedContent(member.bio).substring(0, 150)}...
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                      <ReadMoreButton 
                        component={Link} 
                        to={`/team/${member.id}`}
                        variant="contained"
                        size="small"
                      >
                        {t('readMore')}
                      </ReadMoreButton>
                    </Box>
                  </TeamInfo>
                </TeamCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>

        {/* Support Team Section 
        <SectionContainer>
          <Grid container spacing={3}>
            {supportTeam.map((member) => (
              <Grid item xs={12} sm={6} key={member.id}>
                <TeamCard elevation={1}>
                  <Box sx={{ 
                    p: 3, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9'
                  }}>
                    <TeamAvatar src={member.image} alt={member.name} />
                  </Box>
                  
                  <TeamInfo>
                    <TeamNameRole>
                      <Typography variant="h6" fontWeight={600}>
                        {member.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          color="primary" 
                          fontWeight={500}
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={() => handleRoleHover(member.id, true)}
                          onMouseLeave={() => handleRoleHover(member.id, false)}
                        >
                          {hoveredRoles[member.id] ? member.funnyRole : member.role}
                        </Typography>
                        {member.roleIcon && (
                          <Typography sx={{ ml: 0.5 }}>{member.roleIcon}</Typography>
                        )}
                      </Box>
                    </TeamNameRole>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2, fontSize: '0.85rem' }}
                    >
                      {member.bio}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                      <ReadMoreButton 
                        component={Link} 
                        to={`/team/${member.id}`}
                        variant="contained"
                        size="small"
                      >
                        Read More
                      </ReadMoreButton>
                    </Box>
                  </TeamInfo>
                </TeamCard>
              </Grid>
            ))}
          </Grid>
        </SectionContainer> */}

        {/* Pre-Rounders Section */}
        <Box sx={{ pt: 4, pb: 1 }}></Box>
        <SectionContainer>
          <SectionTitle>
          <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {/* <Typography variant="h5" fontWeight={700} sx={{ fontSize: {
                xs: '1.2rem',
                sm: '1.4rem',
                md: '1.5em'
              }}}>PRE-ROUNDERS</Typography> */}
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SchoolIcon fontSize="small"/>
              </Box> */}
            </motion.div>
          </SectionTitle>
          
          <Grid container spacing={8}>
            {preRounders.map((member, index) => (
              <Grid item xs={12} sm={6} key={member.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTeamMemberClick(member.id)}
                >
                <TeamCard elevation={1}>
                  <Box sx={{ 
                    p: 3, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000'
                  }}>
                    <TeamAvatar src={member.image} alt={member.name} />
                  </Box>
                
                  <TeamInfo>
                    <TeamNameRole>
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.25rem',color:'white' }}>
                        {getTranslatedName(member)}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' ,color:'#000'}}>
                        <Typography 
                          variant="body2" 
                          color="primary" 
                          fontWeight={500}
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem',
                            color:'white'
                          }}
                          onMouseEnter={() => handleRoleHover(member.id, true)}
                          onMouseLeave={() => handleRoleHover(member.id, false)}
                        >
                          {hoveredRoles[member.id] 
                              ? getTranslatedContent(member.funnyRole) 
                              : getTranslatedContent(member.role)}
                        </Typography>
                        {member.roleIcon && (
                          <Typography sx={{ ml: 0.5 }}>{member.roleIcon}</Typography>
                        )}
                      </Box>
                    </TeamNameRole>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2, fontSize: '1rem' ,color:'white'}}
                    >
                      {getTranslatedContent(member.bio).substring(0, 150)}...
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                      <ReadMoreButton 
                        component={Link} 
                        to={`/team/${member.id}`}
                        variant="contained"
                        size="small"
                      >
                       {t('readMore')}
                      </ReadMoreButton>
                    </Box>
                  </TeamInfo>
                </TeamCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </SectionContainer>
      </Container>
    </PageContainer>
  );
};

// Missing SectionContainer component
const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

export default Team;