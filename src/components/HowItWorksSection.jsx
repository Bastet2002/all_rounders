import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Box, Typography, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Styled components
const SectionContainer = styled(Box)(({ theme, bgcolor }) => ({
  height: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: bgcolor || '#f8f9fa',
  position: 'relative',
  overflow: 'hidden',
}));

const PhoneContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '300px',
  zIndex: 2,
  transform: 'perspective(1000px) rotateY(5deg)',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'perspective(1000px) rotateY(0deg)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4),
  },
}));

const PhoneImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '500px',
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(4),
  paddingTop: theme.spacing(7),
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transform: 'translateY(0)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const AnimationTopOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-60px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '110px',
  height: '110px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 4,
  background: 'white',
  borderRadius: '50%',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-20px',
  right: '-20px',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  zIndex: 3,
}));

const CurvedBackground = styled(Box)(({ theme, color }) => ({
  position: 'absolute',
  top: '10%',
  right: '5%',
  width: '40%',
  height: '80%',
  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
  background: color || 'rgba(0, 188, 212, 0.1)',
  zIndex: 1,
}));

const HowItWorksSection = ({ sections, title }) => {
  // Background colors for sections
  const bgColors = [
    'rgba(236, 242, 248, 0.8)',
    'rgba(242, 236, 248, 0.8)',
    'rgba(248, 242, 236, 0.8)',
    'rgba(236, 248, 242, 0.8)',
    'rgba(248, 236, 242, 0.8)',
  ];

  // Accent colors for curved backgrounds
  const accentColors = [
    'rgba(0, 188, 212, 0.1)',
    'rgba(156, 39, 176, 0.1)',
    'rgba(255, 152, 0, 0.1)',
    'rgba(76, 175, 80, 0.1)',
    'rgba(233, 30, 99, 0.1)',
  ];

  return (
    <Box id="howItWorks">
      {title && (
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            my: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: 'primary.main',
            }
          }}
        >
          {title}
        </Typography>
      )}
      
      <ReactFullpage
        //fullpage options
        licenseKey={'YOUR_KEY_HERE'} // You can use a FOSS license for non-commercial use
        scrollingSpeed={1000} // Adjust for smoother transitions
        navigation={true}
        navigationPosition={'right'}
        navigationTooltips={sections.map(section => section.title)}
        showActiveTooltip={true}
        anchors={sections.map((_, index) => `section${index + 1}`)}
        sectionsColor={bgColors}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              {sections.map((section, index) => (
                <div key={index} className="section">
                  <SectionContainer bgcolor={bgColors[index % bgColors.length]}>
                    <CurvedBackground color={accentColors[index % accentColors.length]} />
                    
                    <Container maxWidth="lg">
                      <Grid 
                        container 
                        spacing={6} 
                        alignItems="center" 
                        justifyContent="center"
                        sx={{ position: 'relative', zIndex: 2 }}
                      >
                        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <PhoneContainer className="phone-container">
                            <PhoneImage 
                              src={section.image} 
                              alt={section.title} 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/services/placeholder.png';
                              }}
                            />
                          </PhoneContainer>
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <ContentContainer className="section-content">
                            {section.animation && (
                              <AnimationTopOverlay className="animation-top-overlay">
                                <motion.img 
                                  src={section.animation} 
                                  alt="Animation"
                                  style={{ maxWidth: '80%', maxHeight: '80%' }}
                                  animate={{ 
                                    scale: [1, 1.05, 1],
                                    y: [0, -5, 0]
                                  }}
                                  transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                />
                              </AnimationTopOverlay>
                            )}
                            <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                              {section.title}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                              {section.description}
                            </Typography>
                            
                            {section.icon && (
                              <IconContainer className="icon-container">
                                <motion.img 
                                  src={section.icon} 
                                  alt="Icon" 
                                  style={{ width: '50px', height: '50px' }}
                                  animate={{ 
                                    rotate: [0, 10, 0, -10, 0],
                                  }}
                                  transition={{ 
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                />
                              </IconContainer>
                            )}
                          </ContentContainer>
                        </Grid>
                      </Grid>
                    </Container>
                  </SectionContainer>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </Box>
  );
};

export default HowItWorksSection;