import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import newsData from '../data/newsData.json';
import '../styles/News.css';

const RecentNewsSection = () => {
  const { language } = useLanguage();
  const t = key => translations[language][key] || key;
  const [articles, setArticles] = useState([]);
  const currentLanguage = language || 'en';

  useEffect(() => {
    // Sort articles by date (newest first)
    const sortedArticles = [...newsData.articles].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    // Get only the 3 most recent articles
    setArticles(sortedArticles.slice(0, 3));
  }, []);

  return (
    <div className="recent-news-section">
      <h2>{t('recentNews')}</h2>
      <div className="recent-news-grid">
        {articles.map((article) => (
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
      <div className="view-more-container">
        <Link to="/news" className="view-more-button">
          {t('viewAllNews')}
        </Link>
      </div>
    </div>
  );
};

export default RecentNewsSection;