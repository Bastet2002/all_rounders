import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
// Add this import
import { db } from '../firebase/config';




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