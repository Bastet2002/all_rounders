import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');

  // Load saved content on initial render
  useEffect(() => {
    const storedWelcomeMessage = localStorage.getItem('adminWelcomeMessage');
    const storedHeroImageUrl = localStorage.getItem('adminHeroImageUrl');
    
    if (storedWelcomeMessage) setWelcomeMessage(storedWelcomeMessage);
    if (storedHeroImageUrl) setHeroImageUrl(storedHeroImageUrl);
  }, []);

  const value = {
    welcomeMessage,
    heroImageUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};