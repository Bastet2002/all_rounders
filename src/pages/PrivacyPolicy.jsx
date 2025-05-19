import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: '#fff',
  minHeight: '100vh',
  fontFamily: 'Roboto, sans-serif',
  '& *': {
    fontFamily: 'Roboto, sans-serif',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: 0,
    width: '60px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Define the sections for the privacy policy
  const sections = [
    {
      title: t.introduction,
      content: [
        t.introductionContent1,
        t.introductionContent2,
        t.introductionContent3,
        t.introductionContent4,
        t.introductionContent5,
        t.introductionContent6,
        t.introductionContent7,
        t.introductionContent8
      ]
    },
    {
      title: t.personalDataWeCollect,
      content: [
        t.personalDataContent1,
        t.personalDataContent2,
        t.personalDataContent3,
        t.personalDataContent4,
        t.personalDataContent5,
        t.personalDataContent6,
        t.personalDataContent7,
        t.personalDataContent8,
        t.personalDataContent9,
        t.personalDataContent10,
        t.personalDataContent11,
        t.personalDataContent12,
        t.personalDataContent13,
        t.personalDataContent14,
        t.personalDataContent15,
        t.personalDataContent16,
        t.personalDataContent17,
        t.personalDataContent18,
        t.personalDataContent19,
        t.personalDataContent20,
        t.personalDataContent21,

      ]
    },
    {
      title: t.howWeUseData,
      content: [
        t.howWeUseDataContent1,
        t.howWeUseDataContent2,
        t.howWeUseDataContent3,
        t.howWeUseDataContent4,
        t.howWeUseDataContent5,
        t.howWeUseDataContent6,
        t.howWeUseDataContent7,
        t.howWeUseDataContent8,
        t.howWeUseDataContent9,
        t.howWeUseDataContent10,
        t.howWeUseDataContent11,
        t.howWeUseDataContent12,
        t.howWeUseDataContent13,
        t.howWeUseDataContent14,
        t.howWeUseDataContent15,
        t.howWeUseDataContent16,
      ]
    },
    {
      title: t.disclosureOfData,
      content: [
        t.disclosureContent1,
        t.disclosureContent2,
        t.disclosureContent3,
        t.disclosureContent4,
        t.disclosureContent5,
        t.disclosureContent6,
        t.disclosureContent7,

      ]
    },
    {
      title: t.retentionOfData,
      content: [t.retentionContent]
    },
    {
      title: t.securityOfData,
      content: [t.securityContent]
    },
    {
      title: t.internationalTransfers,
      content: [t.transfersContent]
    },
    {
      title: t.yourRights,
      content: [t.rightsContent]
    },
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            {t.privacyPolicy}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {t.lastUpdated}: {new Date().toLocaleDateString()}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {t.pleaseReadCarefully}
          </Typography>
          <Typography variant="body1" paragraph sx={{ stroke: 'black',  fontStyle: 'italic',}}>
            {t.accessing}
          </Typography>
        </Box>

        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <SectionTitle variant="h5">{section.title}</SectionTitle>
            {section.content.map((paragraph, pIndex) => (
              <Typography key={pIndex} variant="body1" paragraph>
                {paragraph}
              </Typography>
            ))}
            {index < sections.length - 1 && <Divider sx={{ my: 3 }} />}
          </Box>
        ))}
        
        <Box sx={{ mt: 6, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t.privacyPolicyDisclaimer}
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default PrivacyPolicy;