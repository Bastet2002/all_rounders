import React, { useState } from 'react';
import { Box, Typography, Grid, Container, Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
// import { motion } from 'framer-motion';

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
  background: 'linear-gradient(-45deg,rgb(187, 214, 255),rgb(138, 170, 199),rgb(225, 225, 225),rgb(226, 226, 226))',
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
  backgroundColor: '#fff',
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
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
  alignSelf: 'center',
  marginTop: theme.spacing(1),
}));

const MeetTeamButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.8, 3),
  fontWeight: 600,
  backgroundColor: '#000',
  color: '#fff',
  margin: '0 auto',
  display: 'block',
  marginBottom: theme.spacing(5),
  '&:hover': {
    backgroundColor: '#333',
  },
}));


const Team = () => {
  // State to track hover state for each team member
  const [hoveredRoles, setHoveredRoles] = useState({});

  // Function to handle role hover
  const handleRoleHover = (memberId, isHovered) => {
    setHoveredRoles(prev => ({
      ...prev,
      [memberId]: isHovered
    }));
  };

  // Updated team members data with more detailed bios and funny roles
  const coreTeam = [
    {
      id: 'hyunji-kim',  // Changed from 'hyun-kim' to match the actual ID used in the component
      name: 'Hyunji Kim (Hayley)',
      role: 'CEO',
      funnyRole: 'Mom',
      roleIcon: '👩🏻‍💼',
      image: '/images/team/hyun.png',
      bio: "Hayley's background is mainly in academia, but after realizing that her work in renewable energy research wasn't having the environmental impact she hoped for, she made a big change and transitioned from academia to business. To quickly learn about the business world, she joined a strategy consulting firm, gaining experience with different companies for a year. At the same time, she founded an e-commerce distributor company ....",
    },
    {
      id: 'kyungsuk-yang',
      name: 'Kyungsuk Yang (Ben)',
      role: 'COO',
      funnyRole: 'AI',
      roleIcon: '👨‍💼',
      image: '/images/team/yang.png',
      bio: "Ben started his entrepreneurial journey in 2006, founding businesses in education, trade, e-commerce, social media, IT security, promotion, and the metaverse. He has extensive experience ....",
    },
    {
      id: 'jet',
      name: 'Apichet Charlermwutinan (Jet)',
      role: 'Business Team',
      funnyRole: 'Developer',
      roleIcon: '🧑🏻‍💼',
      image: '/images/team/jet.png',
      bio: "Apichet began his career in business development. As part of his role, he conducted feasibility analyses, contributing to successful investment projects in logistics and F&B, including the construction....",
    },
    {
        id: 'p',
        name: 'Pichaya Saidoung (P)',
        role: 'Marketing Team',
        funnyRole: 'Mandatory Designer',
        roleIcon: '🧑🏻‍💼',
        image: '/images/team/p.png',
        bio: "Pichaya's background is in Applied Chemistry. However, after realizing his passion for business and problem-solving, he decided to step away from the traditional science career path. Driven by adaptability and resourcefulness....",
      },
      {
        id: 'big',
        name: 'Anucha Radinghin (Big)',
        role: 'Rider',
        funnyRole: 'Body Language Expert',
        roleIcon: '🛵',
        image: '/images/team/big.png',
        bio: "Despite Anucha’s modest academic background, his professional career speaks for itself. He began as a junior featherweight boxer, representing his home district and winning 4 out of....",
      },
  ];


  const preRounders = [
    {
      id: 'emily',
      name: 'Emily Impens (Mimi)',
      role: 'Marketing Intern',
      funnyRole: 'The newbie',
      roleIcon: '🙋🏻‍♀️',
      image: '/images/team/emily.png',
      bio: "Emily's background is in Biomedical Science, but she is currently exploring digital marketing, a field beyond her expertise. She enjoys stepping out of her comfort zone, embracing new opportunities, and continuously learning and developing.... ",
    },
    {
      id: 'nichole',
      name: 'Nann Wutt Yee Win (Nichole)',
      role: 'IT Intern',
      funnyRole: 'Web Designer',
      roleIcon: '💻',
      image: '/images/team/nichole.png',
      bio: "Nann Wutt Yee Win, or Nichole, is a curious tech explorer who’s always open to new ideas, both in and out of the tech world. She loves learning, whether it’s picking up a new coding....",
    },
  ];

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
            <Typography variant="h5" fontWeight={700} sx={{ fontSize: '1.5rem' }}>ROUNDERS</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: {
        xs: '0.75rem',
        sm: '0.85rem',
        md: 'o.95em'
      } }}>
                (5 team members)
              </Typography>
            </Box>
          </SectionTitle>
          <Box sx={{ pt: 2 }}></Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          {/* <motion.div
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.05, 1],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            > */}
              <MeetTeamButton variant="contained">
                Meet Our CEO
              </MeetTeamButton>
           {/* </motion.div> */}
          </Box>
          
          {/* Featured Team Member - Hyun Ji Kim */}
          <TeamCard elevation={1} sx={{ maxWidth: '100%', mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Box sx={{ 
                p: 3, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
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
                backgroundColor: '#fff',
                width: { xs: '100%', sm: '70%' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.25rem' }}>
                    Hyunji Kim (Hayley)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Typography 
                      variant="body2" 
                      color="primary" 
                      fontWeight={500} 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem'
                      }}
                      onMouseEnter={() => handleRoleHover('hyunji-kim', true)}
                      onMouseLeave={() => handleRoleHover('hyunji-kim', false)}
                    >
                      {hoveredRoles['hyunji-kim'] ? coreTeam[0].funnyRole : coreTeam[0].role}
                    </Typography>
                    <Typography sx={{ ml: 0.5 }}>👩🏻‍💼</Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '1rem' }}>
                  {coreTeam[0].bio}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ReadMoreButton 
                    component={Link} 
                    to="/team/hyunji-kim"  // Updated to match the new ID
                    variant="contained"
                    size="small"
                  >
                    Read More
                  </ReadMoreButton>
                </Box>
              </Box>
            </Box>
          </TeamCard>
          <Box sx={{ pt: 4, pb: 1 }}></Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            
              <MeetTeamButton variant="contained">
                Meet Our Team
              </MeetTeamButton>
            
          </Box>
          
          {/* Other Core Team Members */}
          <Grid container spacing={8}>
            {coreTeam.slice(1).map((member) => (
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
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.25rem' }}>
                        {member.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          color="primary" 
                          fontWeight={500}
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem'
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
                      sx={{ mb: 2, fontSize: '1rem' }}
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
            <Typography variant="h5" fontWeight={700} sx={{ fontSize: {
        xs: '1.2rem',
        sm: '1.4rem',
        md: '1.5em'
      }}}>PRE-ROUNDERS</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SchoolIcon fontSize="small"/>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: {
        xs: '0.75rem',
        sm: '0.85rem',
        md: 'o.95em'
      } }}>
                (2 team members)
              </Typography>
            </Box>
          </SectionTitle>
          
          <Grid container spacing={8}>
            {preRounders.map((member) => (
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
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.25rem' }}>
                        {member.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          color="primary" 
                          fontWeight={500}
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem'
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
                      sx={{ mb: 2, fontSize: '1rem' }}
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