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
        t.introductionContent4
      ]
    },
    {
      title: t.personalDataWeCollect,
      content: [t.personalDataContent]
    },
    {
      title: t.howWeUseData,
      content: [t.howWeUseDataContent]
    },
    {
      title: t.disclosureOfData,
      content: [t.disclosureContent]
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
    {
      title: t.cookiesAndTracking,
      content: [t.cookiesContent]
    },
    {
      title: t.contactUsT,
      content: [t.contactUsContent]
    }
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
          
          <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
            {t.pleaseReadCarefully}
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