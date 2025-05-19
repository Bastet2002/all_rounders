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
      content: [
        t.licenseContent1,
        t.licenseContent2,
        t.licenseContent3,
        t.licenseContent4,
        t.licenseContent5,
        t.licenseContent6,
        t.licenseContent7,
        t.licenseContent8,
        t.licenseContent9,
        t.licenseContent10
      ]
    },
    {
      title: t.userAccounts,
      content: [
        t.accountsContent1,
        t.accountsContent2,
        t.accountsContent3,
        t.accountsContent4,
        t.accountsContent5,
      ]
    },
    {
      title: t.buyingAndSelling,
      content: [
        t.transactionsContent1,
        t.transactionsContent2,
        t.transactionsContent3,
      ]
    },
    {
      title: t.prohibitedActivities,
      content: [
        t.prohibitedContent1,
        t.prohibitedContent2
      ]
    },
    {
      title: t.intellectualProperty,
      content: [
        t.ipContent1,
        t.ipContent2,
        t.ipContent3,
        t.ipContent4,
        t.ipContent5,
      ]
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
      content: [
        t.indemnificationContent1,
        t.indemnificationContent2,
        t.indemnificationContent3,
        t.indemnificationContent4,
      ]
    },
    {
      title: t.governingLaw,
      content: [t.lawContent]
    },
    {
      title: t.changes,
      content: [t.changesContent1, t.changesContent2]
    },
    {
      title: t.miscellaneous,
      content: [t.miscellaneousContent]
    },
    {
      title: t.Tcontact,
      content: [t.TcontactContent]
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

        <Typography variant="body1" paragraph sx={{ stroke: 'black',  fontStyle: 'italic',}}>
            {t.terms}
          </Typography>

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