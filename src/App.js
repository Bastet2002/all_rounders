import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Team from './pages/Team';
import Services from './pages/Services';
import News from './pages/News';
import Careers from './pages/Careers';
import AboutMeDetail from './pages/AboutMeDetail';
import NewsDetail from './pages/NewsDetail';
import Admin from './pages/Admin';
import { Analytics } from "@vercel/analytics/react";
import DataMigration from './components/admin/DataMigration';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#666666',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
});

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:id" element={<AboutMeDetail />} />
              <Route path="/service" element={<Services />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/admin/data-migration" element={<DataMigration />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
      <CookieConsent />
      <Analytics />
    </LanguageProvider>
    
  );
}

export default App;