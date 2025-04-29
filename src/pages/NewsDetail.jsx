import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import newsData from '../data/newsData.json';
import { Box, Container, Typography, Breadcrumbs, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../styles/NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const t = key => translations[language][key] || key;
  const currentLanguage = language || 'en';
  
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = newsData.articles.find(article => article.id === parseInt(id));
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Get 3 related articles (excluding the current one)
      const related = newsData.articles
        .filter(a => a.id !== parseInt(id))
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 3); // Get first 3 items
      
      setRelatedArticles(related);
    }
    
    setLoading(false);
  }, [id]);

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

  // Get content based on language
  const getContent = (article) => {
    const content = article.content[currentLanguage];
    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <Typography 
          variant="body1" 
          paragraph 
          key={index}
          sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}
        >
          {paragraph}
        </Typography>
      ));
    }
    return (
      <Typography 
        variant="body1" 
        paragraph
        sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}
      >
        {content}
      </Typography>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          {t('news.loading') || 'Loading...'}
        </Typography>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          {t('news.notFound') || 'Article not found'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            component={Link} 
            to="/news" 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
          >
            {t('news.backToNews') || 'Back to News'}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <div className="news-detail-container">
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ my: 3 }}
        >
          <Link to="/" className="breadcrumb-link">
            {t('home') || 'Home'}
          </Link>
          <Link to="/news" className="breadcrumb-link">
            {t('news') || 'News'}
          </Link>
          <Typography color="text.primary">{article.title[currentLanguage]}</Typography>
        </Breadcrumbs>

        {/* Back button */}
        <Button 
          component={Link} 
          to="/news" 
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
          className="back-button"
        >
          {t('backToNews') || 'Back to News'}
        </Button>

        {/* Article header */}
        <div className="article-header">
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
            }}
          >
            {article.title[currentLanguage]}
          </Typography>
          <Typography 
            variant="subtitle1" 
            className="article-date"
            sx={{ mb: 4, color: 'text.secondary', fontStyle: 'italic' }}
          >
            {formatDate(article.date)}
          </Typography>
        </div>

        {/* Main image */}
        <div className="article-main-image">
          <img 
            src={article.images[0]} 
            alt={article.title[currentLanguage]} 
          />
        </div>

        {/* Article content */}
        <div className="article-content">
          {getContent(article)}
        </div>

        {/* Image gallery (if more than one image) */}
        {article.images.length > 1 && (
          <div className="article-gallery">
            
            <Grid container spacing={2}>
              {article.images.slice(1).map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div className="gallery-image">
                    <img src={image} alt={`${article.title[currentLanguage]} - ${index + 2}`} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="related-articles">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 600, mt: 8, mb: 4 }}
            >
              {t('relatedArticles') || 'Related Articles'}
            </Typography>
            <Grid container spacing={3}>
              {relatedArticles.map((relatedArticle) => (
                <Grid item xs={12} sm={6} md={4} key={relatedArticle.id}>
                  <Link to={`/news/${relatedArticle.id}`} className="related-article-link">
                    <div className="related-article-card">
                      <div className="related-article-image">
                        <img 
                          src={relatedArticle.images[0]} 
                          alt={relatedArticle.title[currentLanguage]} 
                        />
                      </div>
                      <div className="related-article-content">
                        <Typography variant="h6" gutterBottom>
                          {relatedArticle.title[currentLanguage]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(relatedArticle.date)}
                        </Typography>
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewsDetail;