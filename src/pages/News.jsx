import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import newsData from '../data/newsData.json';
import '../styles/News.css';

const News = () => {
  const { language } = useLanguage();
  const t = key => translations[language][key] || key;
  
  const [articles, setArticles] = useState([]);
  const [yearFilters, setYearFilters] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const currentLanguage = language || 'en';

  useEffect(() => {
    // Sort articles by date (newest first)
    const sortedArticles = [...newsData.articles].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    setArticles(sortedArticles);
    
    // Extract unique years from article dates
    const years = [...new Set(sortedArticles.map(article => {
      const date = new Date(article.date);
      return date.getFullYear();
    }))].sort((a, b) => b - a); // Sort years in descending order
    
    setYearFilters(years);
    // Set the most recent year as default selected
    if (years.length > 0) {
      setSelectedYear(years[0]);
    }
  }, []);

  // Format date based on language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (currentLanguage === 'th') {
      // Thai date format
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('th-TH', options);
    } else {
      // English date format
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };

  // Format date for the news list (MMM DD,YYYY)
  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    if (currentLanguage === 'th') {
      return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Get recent articles for the top section
  const recentArticles = articles.slice(0, 3);
  
  // Get articles for the selected year
  const filteredArticles = selectedYear 
    ? articles.filter(article => {
        const date = new Date(article.date);
        return date.getFullYear() === selectedYear;
      })
    : [];

  return (
    <div className="news-container">
      {/* Hero Banner */}
     
      <div className="news-hero">
        <img src="/images/news/banner.png" alt="Technology" className="news-hero-image" />
        <div className="news-hero-content">
            <h1>{t('newsroom')}</h1>
        </div>
    </div>

      {/* Most Recently News Section */}
      <div className="recent-news-section">
        <h2>{t('recentNews')}</h2>
        <div className="recent-news-grid">
          {recentArticles.map((article) => (
            <div className="recent-news-card" key={article.id}>
              <Link to={`/news/${article.id}`} className="news-link">
                <div className="recent-news-image">
                  <img 
                    src={article.images[0]} 
                    alt={article.title[currentLanguage]} 
                  />
                  <div className="recent-news-overlay">
                    <p>{Array.isArray(article.content[currentLanguage]) 
                      ? article.content[currentLanguage][0].substring(0, 100) + '...'
                      : article.content[currentLanguage].substring(0, 100) + '...'
                    }</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Years and News List Section */}
      <div className="news-by-year-section">
        <div className="news-years-container">
          <div className="years-sidebar">
            <h2>{t('years')}</h2>
            <ul className="years-list">
              {yearFilters.map(year => (
                <li 
                  key={year} 
                  className={selectedYear === year ? 'active' : ''}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="news-list-container">
            {filteredArticles.map((article) => (
              <div className="news-list-item" key={article.id}>
                <Link to={`/news/${article.id}`} className="news-list-link">
                  <div className="news-list-date">
                    {formatShortDate(article.date)}
                  </div>
                  <div className="news-list-image">
                    <img 
                      src={article.images[0]} 
                      alt={article.title[currentLanguage]} 
                    />
                  </div>
                  <div className="news-list-content">
                    <h3>{article.title[currentLanguage]}</h3>
                    <p>{Array.isArray(article.content[currentLanguage]) 
                      ? article.content[currentLanguage][0].substring(0, 120) + '...'
                      : article.content[currentLanguage].substring(0, 120) + '...'
                    }</p>
                    {/* <div className="news-list-tags">
                      {article.id % 2 === 0 ? (
                        <span className="news-tag news-tag-dark">News</span>
                      ) : (
                        <span className="news-tag news-tag-light">Update</span>
                      )}
                    </div> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;