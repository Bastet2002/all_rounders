import React, { createContext, useState, useContext } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  const toggleLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'en' ? 'th' : 'en');
  };

  // Get translation function
  const t = (key) => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;