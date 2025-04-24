import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const GoogleFormContact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Replace with your actual Google Form URL
  const googleFormUrl = "https://forms.gle/vtZQHQ3TsUE9yReT7";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {t.contactUs}
        </Typography>
        
        <Typography paragraph>
          Please fill out our contact form. You can also upload files through the form.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary"
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          Open Contact Form
        </Button>
        
        {/* Alternatively, embed the form directly */}
        <Box sx={{ mt: 4, width: '100%' }}>
          <iframe
            src={googleFormUrl + "?embedded=true"}
            width="100%"
            height="700px"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Contact Form"
          >
            Loading…
          </iframe>
        </Box>
      </Box>
    </motion.div>
  );
};

export default GoogleFormContact;