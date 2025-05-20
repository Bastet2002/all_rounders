import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Avatar, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import teamData from '../data/teamData.json';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';



// Update the PageContainer
const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(-45deg,rgb(198, 217, 255), #e5e7eb,rgb(4, 12, 24), #e2e8f0)',
  backgroundSize: '400% 400%',
  backgroundColor: '#f8f9fa',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e9ecef' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
  minHeight: '100vh',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  fontFamily: 'Roboto, sans-serif',
  '& *': {
    fontFamily: 'Roboto, sans-serif',
  }
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: '4px solid #fff',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    width: 180,
    height: 180,
    marginRight: theme.spacing(4),
    marginBottom: 0,
  },
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
  
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  display: 'inline-block',
  alignItems: 'center',
  fontSize: '1.5rem',
  '& svg': {
    marginRight: theme.spacing(1),
  },
}));

const KeywordChip = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0.5),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(2),
  '& .emoji': {
    marginRight: theme.spacing(1),
  },
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
}));

const TimelineYear = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  minWidth: '60px',
  marginRight: theme.spacing(2),
  fontSize: '1.1rem',
}));

const TimelineContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const LikeItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& .emoji': {
    marginRight: theme.spacing(1),
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: '#000',
  color: '#fff',  
  '&:hover': {
    backgroundColor: 'rgba(135, 126, 126, 0.8)',
  },  
}));

const AboutMeDetail = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  // Add state for role hover
  const [isRoleHovered, setIsRoleHovered] = useState(false);
  const { language } = useLanguage();
  const t = key => translations[language][key] || key;
  const currentLanguage = language || 'en';
  useEffect(() => {
    // Find the team member with the matching ID
    const foundMember = teamData.team.find(m => m.id === id);
    
    if (foundMember) {
      setMember(foundMember);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!member) {
    return (
      <Container>
        <Typography variant="h5" color="error">Team member not found</Typography>
        <BackButton 
          component={Link} 
          to="/team" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          {t('backToTeam')}
        </BackButton>
      </Container>
    );
  }

  // Extract first name for display
  const firstName = member.name.split(' ')[0];
  const getTranslatedContent = (content) => {
    if (!content) return '';
    
    // If content is an object with language keys
    if (typeof content === 'object' && content[currentLanguage]) {
      return content[currentLanguage];
    }
    
    // If it's just a string
    return content;
  };

  // Get translated name or use default name
  const getTranslatedName = () => {
    if (member.translatedName && member.translatedName[currentLanguage]) {
      return member.translatedName[currentLanguage];
    }
    return member.name;
  };

  // Get first name based on current language
  const getTranslatedFirstName = () => {
    const fullName = getTranslatedName();
    return fullName.split(' ')[0];
  };

  const getYearFromAcademic = (academicEntry) => {
    // Handle both string and object formats
    const entry = typeof academicEntry === 'object' ? 
      academicEntry[currentLanguage] : academicEntry;
      
    const yearMatch = entry.match(/\d{4}/);
    return yearMatch ? yearMatch[0] : '';
  };
  
  // Format year display (show ALLROUNDERS entry as "Present")
  const formatYearDisplay = (entry) => {
    // Handle both string and object formats
    const entryText = typeof entry === 'object' ? 
      entry[currentLanguage] : entry;
      
    // Check if this is an ALLROUNDERS entry
    if (entryText.includes('ALLROUNDERS Inc.')) {
      return currentLanguage === 'th' ? 'ปัจจุบัน' : 'Present';
    }
    return getYearFromAcademic(entry);
  };
  
  // Get icon for academic entry
  const getAcademicIcon = (academicEntry) => {
    if (!member.icons || !member.icons.academic) return '';
    
    // Handle both string and object formats
    const entryText = typeof academicEntry === 'object' ? 
      academicEntry[currentLanguage] : academicEntry;
      
    // If it's an ALLROUNDERS entry, use the "Present" icon
    if (entryText.includes('ALLROUNDERS Inc.')) {
      return member.icons.academic['Present'] || '👑';
    }
    
    const year = getYearFromAcademic(academicEntry);
    return member.icons.academic[year] || '📚';
  };
  
  // Get icon for keyword
  const getKeywordIcon = (keyword) => {
    if (!member.icons || !member.icons.keywords) return '🔑';
    
    // Handle both string and object formats
    const keywordText = typeof keyword === 'object' ? 
      keyword.en : keyword; // Use English for icon lookup
      
    return member.icons.keywords[keywordText] || '🔑';
  };
  
  // Get icon for like
  const getLikeIcon = (like) => {
    if (!member.icons || !member.icons.likes) return '❤️';
    
    // Handle both string and object formats
    const likeText = typeof like === 'object' ? 
      like.en : like; // Use English for icon lookup
    
    // Try to match the like with the keys in the likes icons
    const matchingKey = Object.keys(member.icons.likes).find(key => 
      likeText.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchingKey ? member.icons.likes[matchingKey] : '❤️';
  };
  
  // Sort academic entries by year in descending order (most recent first)
  const sortedAcademic = [...(member.academic || [])].sort((a, b) => {
    // Always put ALLROUNDERS entries at the top
    const aText = typeof a === 'object' ? a[currentLanguage] : a;
    const bText = typeof b === 'object' ? b[currentLanguage] : b;
    
    if (aText.includes('ALLROUNDERS Inc.') && !bText.includes('ALLROUNDERS Inc.')) {
      return -1;
    }
    if (!aText.includes('ALLROUNDERS Inc.') && bText.includes('ALLROUNDERS Inc.')) {
      return 1;
    }
    
    // For other entries, sort by year in descending order
    const yearA = aText.match(/\d{4}/)?.[0] || '0000';
    const yearB = bText.match(/\d{4}/)?.[0] || '0000';
    return parseInt(yearB) - parseInt(yearA);
  });
  
  // Ensure 2024 entry exists if needed
  const has2024Entry = sortedAcademic.some(entry => {
    const entryText = typeof entry === 'object' ? 
      entry[currentLanguage] : entry;
    return entryText.includes('2024');
  });
  
  if (!has2024Entry && member.role) {
    const roleText = getTranslatedContent(member.role);
    const newEntry = {
      en: `ALLROUNDERS Inc. ${typeof member.role === 'object' ? member.role.en : member.role}, 2024 - Present`,
      th: `ALLROUNDERS Inc. ${typeof member.role === 'object' ? member.role.th : member.role}, 2024 - ปัจจุบัน`
    };
    sortedAcademic.unshift(newEntry);
  }
  

 

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
        <BackButton 
          component={Link} 
          to="/team" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ fontSize: '1rem' }}
        >
          {t('backToTeam')}
        </BackButton>

        <ProfileHeader>
          <ProfileAvatar src={member.image} alt={getTranslatedName()} />
          <ProfileInfo>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <Typography variant="h4" fontWeight={700} sx={{ 
                mr: { xs: 0, sm: 2 }, 
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: { xs: 1, sm: 0 }
              }}>
                {getTranslatedName()} 
              </Typography>
              {member.linkedin && (
                <Button
                  variant="contained"
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    minWidth: 'unset',
                    width: '40px',
                    height: '40px',
                    padding: '8px',
                    backgroundColor: '#0077B5',
                    color: 'white',
                    borderColor: '#0077B5',
                    '&:hover': {
                      backgroundColor: '#006699',
                      borderColor: '#006699',
                    }
                  }}
                >
                  <LinkedInIcon />
                </Button>
              )}
            </Box>
            
            {/* Update the role display with hover effect */}
            <Typography 
              variant="h6" 
              color="black" 
              sx={{ 
                mb: 2, 
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setIsRoleHovered(true)}
              onMouseLeave={() => setIsRoleHovered(false)}
            >
              {isRoleHovered && member.funnyRole ? 
                getTranslatedContent(member.funnyRole) : 
                getTranslatedContent(member.role)} {member.roleIcon}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
              mb: 3 
            }}>
              <Typography variant="body1" sx={{ 
                mr: { xs: 0, sm: 1 }, 
                fontSize: '1.1rem',
                mb: { xs: 0.5, sm: 0 }
              }}>
                {t("allIs")}
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ 
                fontStyle: 'italic', 
                fontSize: '1.1rem',
                mb: { xs: 0.5, sm: 0 }
              }}>
                "{getTranslatedContent(member.allroundersToYou)}"
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                &nbsp;to {getTranslatedFirstName()} ✨.
              </Typography>
            </Box>
          </ProfileInfo>
        </ProfileHeader>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h5">
              {getTranslatedFirstName()}'s {t('keywords')}
            </SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4 }}>
              {member.keywords.map((keyword, index) => (
                <KeywordChip key={index}>
                  <span className="emoji">{getKeywordIcon(keyword)}</span>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {getTranslatedContent(keyword)}
                  </Typography>
                </KeywordChip>
              ))}
            </Box>

            <SectionTitle variant="h5">
              {getTranslatedFirstName()}'s {t('background')}
            </SectionTitle>
            <Box sx={{ mb: 4 }}>
              {sortedAcademic.map((item, index) => {
                return (
                  <TimelineItem key={index}>
                    <TimelineYear variant="body1">{formatYearDisplay(item)}</TimelineYear>
                    <TimelineContent>
                      <Typography variant="body2" sx={{ mr: 1, fontSize: '1.2rem' }}>
                        {getAcademicIcon(item)}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                        {typeof item === 'object' ? 
                          item[currentLanguage].replace(/\d{4}(-\d{4})?/g, '').trim() : 
                          item.replace(/\d{4}(-\d{4})?/g, '').trim()}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <SectionTitle variant="h5">
              {getTranslatedFirstName()} {t('likes')} ❤️
            </SectionTitle>
            <Box sx={{ mb: 4 }}>
              {member.likes.map((like, index) => (
                <LikeItem key={index}>
                  <Typography variant="body2" sx={{ mr: 1, fontSize: '1.2rem' }}>
                    {getLikeIcon(like)}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                    {getTranslatedContent(like)}
                  </Typography>
                </LikeItem>
              ))}
            </Box>

            <SectionTitle variant="h5">
              {t('about')} {getTranslatedFirstName()} ✨
            </SectionTitle>
            <Typography variant="body1" paragraph sx={{ 
              fontSize: '1rem',
              textAlign: 'justify',
              maxWidth: '800px',     
              lineHeight: 1.6,       
              whiteSpace: 'pre-line' 
            }}>
              {getTranslatedContent(member.bio)}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default AboutMeDetail;