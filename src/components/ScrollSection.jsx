import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    height: '100vh', // Maintain full height on mobile
  }
}));

const HandwrittenTitle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '0',
  width: '100%',
  textAlign: 'center',
  zIndex: 10,
  '& h2': {
    fontFamily: "Roboto",
    fontSize: '3.5rem',
    color: '#00BCD4',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      marginTop: '-5px',
    }
  }
}));

const HorizontalWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: 'fit-content',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row', // Keep horizontal layout for mobile swipe
    width: 'fit-content', // Let it expand based on content
    height: '100vh',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
}));

const Section = styled(Box)(({ theme, bgcolor }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  backgroundColor: bgcolor || '#f8f9fa',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '40%',
    height: '70%',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '30%',
    height: '60%',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.03)',
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100vw', // Each section takes full width of viewport
    padding: theme.spacing(2, 2),
    height: '85vh',
    minHeight: '100vh',
    felxShrink: 0,
    justifyContent: 'flex-start', // Align content to top on mobile
    paddingTop: '80px',
  },
}));

const PhoneContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '300px',
  height: '500px',
  zIndex: 2,
  transform: 'perspective(1000px) rotateY(5deg)',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'perspective(1000px) rotateY(0deg)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '200px',
    height: '350px' // Smaller phone image on mobile
  },
}));

const PhoneImage = styled('img')(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain', // This ensures the image maintains its aspect ratio
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0)',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '500px',
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(4),
  paddingTop: theme.spacing(7),
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transform: 'translateY(0)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(6),
    maxWidth: '100%',
    margin: '0 auto', // Center the box
    marginTop: theme.spacing(2),
    '& h4': {
      fontSize: '1.3rem', // Smaller heading for mobile
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    '& p': {
      fontSize: '0.85rem', // Smaller paragraph text for mobile
      marginBottom: '0.5rem',
      textAlign: 'center',
    }
  
  },
}));

const AnimationTopOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100px',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 4,
  background: 'white',
  borderRadius: '50%',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    width: '80px',
    height: '80px',
    top: '-30px',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-20px',
  right: '-20px',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  zIndex: 3,
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    bottom: '-15px',
    right: '-15px',
  },
}));

const AnimationOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  zIndex: 3,
}));

const CurvedBackground = styled(Box)(({ theme, color }) => ({
  position: 'absolute',
  top: '10%',
  right: '5%',
  width: '40%',
  height: '80%',
  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
  background: color || 'rgba(0, 188, 212, 0.1)',
  zIndex: 1,
}));

// Mobile navigation controls
const NavigationControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '30px',
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  backdropFilter: 'blur(4px)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const PaginationDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const PaginationDot = styled(Box)(({ active, theme }) => ({
  width: active ? '12px' : '8px',
  height: active ? '12px' : '8px',
  borderRadius: '50%',
  backgroundColor: active ? '#00BCD4' : 'rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
}));

// New component for the auto-scroll timer indicator
const AutoScrollIndicator = styled(Box)(({ theme, progress }) => ({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80%',
  height: '4px',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '2px',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#00BCD4',
    transition: 'width 0.3s linear',
  }
}));

const ScrollSection = ({ sections, title }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [autoScrollProgress, setAutoScrollProgress] = useState(0);
  const autoScrollRef = useRef(null);
  const autoScrollIntervalRef = useRef(null); // For the progress bar

  // Function to navigate to previous section
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetAutoScroll();
    }
  };

  // Function to navigate to next section
  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetAutoScroll();
    } else {
      // Loop back to the first slide when reaching the end
      setCurrentIndex(0);
      resetAutoScroll();
    }
  };

  // Reset auto-scroll timer
  const resetAutoScroll = () => {
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
    }
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    setAutoScrollProgress(0);
    
    if (autoScrollEnabled && isMobile) {
      startAutoScroll();
    }
  };

  // Start auto-scroll timer
  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
    }
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    // Set up progress bar
    setAutoScrollProgress(0);
    const updateFrequency = 100; // Update progress every 100ms
    const totalUpdates = 10000 / updateFrequency; // 10 seconds total
    let progress = 0;
    
    autoScrollIntervalRef.current = setInterval(() => {
      progress += (100 / totalUpdates);
      setAutoScrollProgress(Math.min(progress, 100));
    }, updateFrequency);
    
    // Set up next slide timer
    autoScrollRef.current = setTimeout(() => {
      goToNext();
    }, 5000); // 10 seconds
  };

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
    if (!autoScrollEnabled) {
      // Turning on auto-scroll
      startAutoScroll();
    } else {
      // Turning off auto-scroll
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      setAutoScrollProgress(0);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    
    // Pause auto-scroll during manual interaction
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
    }
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      goToNext();
    }

    if (touchEnd - touchStart > 75) {
      // Swipe right
      goToPrev();
    }
    
    // Resume auto-scroll after manual interaction if enabled
    if (autoScrollEnabled) {
      startAutoScroll();
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 600px)");
      setIsMobile(mediaQuery.matches);
    };

    // Initial check
    checkMobile();

    // Set up the horizontal scroll effect
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    // Only apply horizontal scroll on desktop
    const mediaQuery = window.matchMedia("(min-width: 600px)");
    
    if (mediaQuery.matches) {
      // Desktop version: GSAP horizontal scroll
      gsap.set(container, {
        height: '100vh',
      });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          end: () => "+=" + (sections.length * 100) + "%",
          scrub: 0.8,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.3 },
            delay: 0.1,
            ease: "power1.inOut"
          },
        }
      });
      
      tl.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
      });
      
      gsap.set('.section-content', { opacity: 0, y: 30 });
      gsap.set('.phone-container', { opacity: 0, x: -30 });
      gsap.set('.icon-container', { opacity: 0, scale: 0.5 });
      
      sectionRefs.current.forEach((section, i) => {
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            containerAnimation: tl,
            start: "left center",
            end: "right center",
            toggleActions: "play none none reverse",
          }
        });
        
        sectionTl.to(section.querySelector('.phone-container'), {
          opacity: 1, 
          x: 0, 
          duration: 0.6,
          ease: "power2.out"
        });
        
        sectionTl.to(section.querySelector('.section-content'), {
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");
        
        sectionTl.to(section.querySelector('.icon-container'), {
          opacity: 1, 
          scale: 1, 
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.3");
      });
    } else {
      // Mobile version: Set up for swipe behavior
      gsap.set(container, {
        height: '100vh',
      });
      
      // Make all sections visible initially on mobile
      gsap.set('.section-content', { opacity: 1, y: 0 });
      gsap.set('.phone-container', { opacity: 1, x: 0 });
      gsap.set('.icon-container', { opacity: 1, scale: 1 });
      
      // Start auto-scroll for mobile
      if (autoScrollEnabled) {
        startAutoScroll();
      }
    }

    // Event listener for resize
    window.addEventListener('resize', () => {
      const wasMobile = isMobile;
      checkMobile();
      
      // If switching between desktop and mobile, handle auto-scroll
      if (wasMobile !== isMobile) {
        if (isMobile && autoScrollEnabled) {
          startAutoScroll();
        } else {
          if (autoScrollRef.current) {
            clearTimeout(autoScrollRef.current);
          }
          if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
          }
        }
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', checkMobile);
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [sections.length, autoScrollEnabled]);

  // Effect to handle the swiping animation on mobile
  useEffect(() => {
    if (isMobile && wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        x: -currentIndex * window.innerWidth,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  }, [currentIndex, isMobile]);

  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Background colors for sections
  const bgColors = [
    'rgba(236, 242, 248, 0.8)',
    'rgba(242, 236, 248, 0.8)',
    'rgba(248, 242, 236, 0.8)',
    'rgba(236, 248, 242, 0.8)',
    'rgba(248, 236, 242, 0.8)',
    'rgba(242, 248, 236, 0.8)',
  ];

  // Accent colors for curved backgrounds
  const accentColors = [
    'rgba(0, 188, 212, 0.1)',
    'rgba(156, 39, 176, 0.1)',
    'rgba(255, 152, 0, 0.1)',
    'rgba(76, 175, 80, 0.1)',
    'rgba(233, 30, 99, 0.1)',
    'rgba(63, 81, 181, 0.1)',
  ];

  return (
    <Box>
      {title && (
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            my: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: 'primary.main',
            }
          }}
        >
          {title}
        </Typography>
      )}
      
      <SectionContainer ref={containerRef}>
        <HandwrittenTitle>
          <Typography variant="h2" fontWeight={800}>How ROUND8 Works?</Typography>
        </HandwrittenTitle>
        
        <HorizontalWrapper 
          ref={wrapperRef}
          onTouchStart={isMobile ? handleTouchStart : null}
          onTouchMove={isMobile ? handleTouchMove : null}
          onTouchEnd={isMobile ? handleTouchEnd : null}
        >
          {sections.map((section, index) => (
            <Section 
              key={index} 
              ref={addSectionRef}
              bgcolor={bgColors[index % bgColors.length]}
            >
              <CurvedBackground color={accentColors[index % accentColors.length]} />
              
              <Grid 
                container 
                spacing={3} 
                alignItems="center" 
                justifyContent="center"
                sx={{ maxWidth: '1200px', position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 }}}
              >
                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' , mb: { xs: 1, md: 0 }}}>
                  <PhoneContainer className="phone-container">
                    <PhoneImage 
                      src={section.image} 
                      alt={section.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/services/placeholder.png';
                      }}
                    />
                  </PhoneContainer>
                </Grid>
                <Grid item xs={12} md={7} sx={{ 
                  display: 'flex', 
                  justifyContent: 'center'}}>
                  <ContentContainer className="section-content">
                    {section.animation && (
                      <AnimationTopOverlay>
                        <motion.img 
                          src={section.animation} 
                          alt="Animation"
                          style={{ maxWidth: '80%', maxHeight: '80%' }}
                          animate={{ 
                            scale: [1, 1.05, 1],
                            y: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      </AnimationTopOverlay>
                    )}
                    <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {section.description}
                    </Typography>
                  </ContentContainer>
                </Grid>
              </Grid>
            </Section>
          ))}
        </HorizontalWrapper>
        
        {/* Mobile navigation controls - only show on mobile */}
        {isMobile && (
          <>
            <NavigationControls>
              <NavButton 
                onClick={goToPrev} 
                disabled={currentIndex === 0}
                aria-label="Previous section"
                size="small"
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </NavButton>
              
              <PaginationDots>
                {sections.map((_, index) => (
                  <PaginationDot 
                    key={index} 
                    active={index === currentIndex}
                    onClick={() => {
                      setCurrentIndex(index);
                      resetAutoScroll();
                    }}
                  />
                ))}
              </PaginationDots>
              
              <NavButton 
                onClick={goToNext} 
                disabled={currentIndex === sections.length - 1}
                aria-label="Next section"
                size="small"
              >
                <ArrowForwardIosIcon fontSize="small" />
              </NavButton>
              
           
            </NavigationControls>
            
            {/* Auto-scroll progress indicator */}
            {autoScrollEnabled && (
              <AutoScrollIndicator progress={autoScrollProgress} />
            )}
          </>
        )}
      </SectionContainer>
    </Box>
  );
};

export default ScrollSection;