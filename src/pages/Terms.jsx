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

const Terms = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Define the sections for the terms of service
  const sections = [
    {
      title: t.acceptanceOfTerms,
      content: [t.acceptanceContent]
    },
    {
      title: t.useLicense,
      content: [t.licenseContent]
    },
    {
      title: t.userAccounts,
      content: [t.accountsContent]
    },
    {
      title: t.buyingAndSelling,
      content: [t.transactionsContent]
    },
    {
      title: t.prohibitedActivities,
      content: [t.prohibitedContent]
    },
    {
      title: t.intellectualProperty,
      content: [t.ipContent]
    },
    {
      title: t.disclaimerOfWarranties,
      content: [t.disclaimerContent]
    },
    {
      title: t.limitationOfLiability,
      content: [t.liabilityContent]
    },
    {
      title: t.indemnification,
      content: [t.indemnificationContent]
    },
    {
      title: t.governingLaw,
      content: [t.lawContent]
    }
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            {t.termsOfService}
          </Typography>
          
          <Typography variant="body1" paragraph>
            {t.lastUpdated}: {new Date().toLocaleDateString()}
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
            {t.termsDisclaimer}
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default Terms;