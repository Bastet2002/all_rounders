import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
// Add this import
import { db } from '../firebase/config';

const ContactContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const InfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (db) {
      console.log('Firebase Firestore is connected!');
    } else {
      console.error('Firebase Firestore connection failed!');
    }
  }, []);


  return (

      <Typography variant="h3" component="h1" gutterBottom>
        {t.contactUs}
      </Typography>

  );
};

export default Contact;