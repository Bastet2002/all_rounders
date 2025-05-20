import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  useMediaQuery,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

// Styled components
// Add this import at the top


const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  backgroundColor: '#fff',
  fontFamily: 'Roboto, sans-serif',
  '& *': {
    fontFamily: 'Roboto, sans-serif',
  }
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#000',
  color: 'white',
  padding: theme.spacing(8, 2),
  position: 'relative',
  textAlign: 'center',
  borderRadius: '16px',
  margin: theme.spacing(3),
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 4),
    margin: theme.spacing(4),
  },
}));

const SectionContainer = styled(Box)(({ theme, bgcolor = '#fff' }) => ({
  padding: theme.spacing(6, 2),
  backgroundColor: bgcolor,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 4),
  },
}));

const RoleCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const BenefitCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const BenefitHeader = styled(Box)(({ theme }) => ({
    backgroundColor: '#000',
    color: 'white',
    padding: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  }));
  
  const BenefitItem = styled(Box)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: theme.spacing(3, 4),
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
  }));
  

const IconBox = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFF9C4',
  borderRadius: '50%',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 4),
  fontWeight: 600,
  backgroundColor: '#fff',
  color: '#000',
  '&:hover': {
    backgroundColor: '#333',
  },
  marginTop: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme, centered = false }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: centered ? 'center' : 'left',
}));

const RounderHeader = styled(Box)(({ theme }) => ({
    
    color: 'black',
    padding: theme.spacing(1.5, 4),
    borderRadius: '50px',
    display: 'inline-block',
    marginBottom: theme.spacing(3),
  }));

const Careers = () => {
  const { language } = useLanguage();
  const t = key => translations[language]?.[key] || key;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Roles we're looking for
  const roles = [
    {
      title: t('creativeDesigner'),
      icon: '/images/careers/role1.png',
      description: t('creativeDesignerDesc')
    },
    {
      title: t('webDeveloper'),
      icon: '/images/careers/role2.png',
      description: t('webDeveloperDesc')
    },
    {
      title: t('digitalMarketer'),
      icon: '/images/careers/role3.png',
      description: t('digitalMarketerDesc')
    },
    {
      title: t('contentCreator'),
      icon: '/images/careers/role4.png',
      description: t('contentCreatorDesc')
    },
    {
      title: t('businessDeveloper'),
      icon: '/images/careers/role5.png',
      description: t('businessDeveloperDesc')
    }
  ];

  // Team benefits
  const teamBenefits = [
    {
        title: t('valueAction'),
        icon: '/images/careers/risk.png',
        description: t('valueActionDesc')
      },
      {
        title: t('pushLimits'),
        icon: '/images/careers/push-limits.png',
        description: t('pushLimitsDesc')
      },
      {
        title: t('noExcuses'),
        icon: '/images/careers/no-excuses.png',
        description: t('noExcusesDesc')
      },
      {
        title: t('harshFeedback'),
        icon: '/images/careers/feedback.png',
        description: t('harshFeedbackDesc')
      },
      {
        title: t('responsibilities'),
        icon: '/images/careers/responsibilities.png',
        description: t('responsibilitiesDesc')
      },
      {
        title: t('heavyWorkload'),
        icon: '/images/careers/workload.png',
        description: t('heavyWorkloadDesc')
      }
  ];

  // Career benefits
  const careerBenefits = [
    {
        title: t('competitiveSalary'),
        icon: '/images/careers/salary.png',
      },
      {
        title: t('globalConnections'),
        icon: '/images/careers/network.png',
      },
      {
        title: t('leadershipOpportunities'),
        icon: '/images/careers/leadership.png',
      },
      {
        title: t('skillDevelopment'),
        icon: '/images/careers/skill.png',
      }
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <HeroSection>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Add logo above the title */}
            <Box 
              component="img"
              src="/images/logo.png" 
              alt="ALLROUNDERS Logo"
              sx={{ 
                width: '120px', 
                height: 'auto', 
                mb: 3,
                margin: '0 auto', 
                display: 'block',
                paddingTop:'0px'
              }}
            />
            
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              {t('workWithUs')}
            </Typography>
            <Typography 
              variant="h6" 
              paragraph
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                opacity: 0.9
              }}
            >
              {t('workWithUsDesc')}
            </Typography>
            <Typography 
              variant="h6" 
              paragraph
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                opacity: 0.9
              }}
            >
              {t('workWithUsDesc2')}
            </Typography>
            <ActionButton 
              variant="contained" 
              size="large"
              href="#join-us"
            >
              {t('learnMore')}
            </ActionButton>
          </motion.div>
        </HeroSection>
      </Container>

      {/* We are looking for People Section */}
      <SectionContainer>
        <Container maxWidth="lg">
          <SectionTitle 
            variant="h4" 
            component="h2"
            centered
            sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}
            >
          
            {t('lookingForPeople')}
          </SectionTitle>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <RoleCard>
                    <IconBox>
                      <Box 
                        component="img" 
                        src="/images/careers/role1.png" 
                        alt={t('whoHasUnderstanding')}
                        sx={{ width: '55px', height: '55px', objectFit: 'contain' }}
                      />
                    </IconBox>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={450} 
                    sx={{ fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' } }}>
                      {t('whoHasUnderstanding')}
                    </Typography>
                  </RoleCard>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <RoleCard>
                    <IconBox>
                      <Box 
                        component="img" 
                        src="/images/careers/role2.png" 
                        alt={t('whoHasCourage')}
                        sx={{ width: '55px', height: '55px', objectFit: 'contain' }}
                      />
                    </IconBox>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={450} sx={{ fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' } }}>
                      {t('whoHasCourage')}
                    </Typography>
                  </RoleCard>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <RoleCard>
                    <IconBox>
                      <Box 
                        component="img" 
                        src="/images/careers/role3.png" 
                        alt={t('whoCanConnect')}
                        sx={{ width: '55px', height: '55px', objectFit: 'contain' }}
                      />
                    </IconBox>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={450} sx={{ fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' } }}>
                      {t('whoCanConnect')}
                    </Typography>
                  </RoleCard>
                </motion.div>
              </Grid>
              
              <Grid container item spacing={4} justifyContent="center" sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div variants={itemVariants}>
                    <RoleCard>
                      <IconBox>
                        <Box 
                          component="img" 
                          src="/images/careers/role4.png" 
                          alt={t('whoCanShare')}
                          sx={{ width: '55px', height: '55px', objectFit: 'contain' }}
                        />
                      </IconBox>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={450} sx={{ fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' } }}>
                        {t('whoCanShare')}
                      </Typography>
                    </RoleCard>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div variants={itemVariants}>
                    <RoleCard>
                      <IconBox>
                        <Box 
                          component="img" 
                          src="/images/careers/role5.png" 
                          alt={t('whoAreIntelligent')}
                          sx={{ width: '55px', height: '55px', objectFit: 'contain' }}
                        />
                      </IconBox>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={450} sx={{ fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' }, }}>
                        {t('whoAreIntelligent')}
                      </Typography>
                    </RoleCard>
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionContainer>

      {/* How ALLROUNDERS Team works */}
      <SectionContainer bgcolor="#f9f9f9">
        <Container maxWidth="lg">
          <TeamWorkHeader>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ fontWeight: 700, fontFamily: 'Roboto',fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}
            >
              {t('howTeamWorks')}
            </Typography>
          </TeamWorkHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={4}>
              {teamBenefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <TeamWorkCard>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom 
                        fontWeight={600}
                        sx={{ fontFamily: 'Roboto' }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ mb: 3, fontFamily: 'Roboto' }}
                      >
                        {benefit.description}
                      </Typography>
                      <Box 
                        component="img" 
                        src={benefit.icon} 
                        alt={benefit.title}
                        sx={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                    </TeamWorkCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </SectionContainer>

      {/* But you will receive */}
    <SectionContainer>
    <Container maxWidth="lg">
        <BenefitHeader>
        <Typography 
            variant="h4" 
            component="h2"
            sx={{ fontWeight: 700, fontFamily: 'Roboto',fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }  }}
        >
            {t('butYouWillReceive')}
        </Typography>
        </BenefitHeader>

        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        >
        {careerBenefits.map((benefit, index) => (
            <motion.div variants={itemVariants} key={index}>
            <BenefitItem>
                <Box 
                component="img" 
                src={benefit.icon} 
                alt={benefit.title}
                sx={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'contain',
                    mr: 4
                }}
                />
                <Typography 
                variant="h6" 
                component="h3" 
                fontWeight={600}
                sx={{ fontFamily: 'Roboto',fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' }  }}
                >
                {benefit.title}
                </Typography>
            </BenefitItem>
            </motion.div>
        ))}
        </motion.div>
    </Container>
    </SectionContainer>

      {/* Become a Rounder */}
    <SectionContainer id="join-us">
    <Container maxWidth="md">
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        >
        <Box sx={{ textAlign: 'center' }}>
            <RounderHeader>
            <Typography 
                variant="h4" 
                component="h2" 
                sx={{ fontWeight: 700 ,fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem',fontFamily: 'Roboto', } }}
            >
                {t('becomeRounder')}
            </Typography>
            </RounderHeader>
            
            <Typography 
            variant="h6" 
            paragraph
            sx={{ 
                maxWidth: '900px', 
                mx: 'auto', 
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.8rem', md: '1.4rem' } ,
                fontFamily: 'Roboto',
            }}
            >
            {t('becomeRounderDesc')}
            </Typography>
            
            <ActionButton 
            variant="contained" 
            size="large"
            href="https://tally.so/r/mOrZ8K"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                borderRadius: '50px',
                padding: '12px 40px',
                color:'white',
                backgroundColor: '#000000',
                fontFamily: 'Roboto',
                
            }}
            >
            {t('joinUsNow')}
            </ActionButton>

            <Box sx={{ my: 4 }}>
            <Box 
                component="img" 
                src="/images/careers/ourPic.png" 
                alt="Our Team"
                sx={{ 
                width: '100%', 
                maxWidth: '800px', 
                borderRadius: 2,
                mb: 3
                }}
            />
            </Box>
            
            <Typography 
            variant="h6" 
            paragraph
            sx={{ 
                maxWidth: '900px', 
                mx: 'auto', 
                mb: 2,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' } 
            
            }}
            
            >
            {t('excitedToMeet')}
            </Typography>
            
            <Typography 
            variant="h6" 
            paragraph
            sx={{ 
                maxWidth: '900px', 
                mx: 'auto', 
                mb: 4,
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.8rem', md: '1.3rem' } ,
                fontFamily: 'Roboto',
            
            }}
            >
            {t('whenSendingCV')}
            </Typography>
            
            <Typography 
            variant="h6" 
            paragraph
            sx={{ 
                maxWidth: '700px', 
                mx: 'auto', 
                mb: 4,
                fontWeight: 600,
                fontSize: { xs: '1.2rem', sm: '1.8rem', md: '1.3rem' } ,
                fontFamily: 'Roboto',
            
            }}
            >
            {t('cannotWait')}
            </Typography>
            
        </Box>
        </motion.div>
    </Container>
    </SectionContainer>
    </PageContainer>
  );
};

export default Careers;

// Add these new styled components
const TeamWorkHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#000',
  color: 'white',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const TeamWorkCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  padding: theme.spacing(3),
  height: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.47)',
  overflow:"hidden",
}));

