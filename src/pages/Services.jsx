import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ScrollSection from '../components/ScrollSection';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@mui/material/styles';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  fontFamily: 'Roboto, sans-serif',
  overflow: 'hidden',
  '& *': {
    fontFamily: 'Roboto, sans-serif',
  }
}));

const gradientAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;
const MotorcycleAnimation = styled(motion.div)(({ theme }) => ({
    position: 'absolute',
    zIndex: 1, // This ensures it stays behind the card
    width: '120px',
    [theme.breakpoints.down('sm')]: {
      width: '80px',
    },
  }));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '90.5vh',
  display: 'flex',
  background: 'linear-gradient(-45deg,rgb(255, 255, 255),rgb(255, 255, 255),rgba(144, 194, 229, 0.61),rgb(218, 223, 228))',
  animation: `${gradientAnimation} 6s ease infinite`,
  backgroundSize: '400% 400%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#00BCD4',
  padding: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1),
    minHeight: '90vh', // Shorter on mobile
  },
}));
const HeroCard = styled(Box)(({ theme }) => ({
    backgroundColor: 'rgb(255, 255, 255)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(5, 4),
    boxShadow: '0 8px 32px rgba(0, 187, 212, 0.81)',
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    border: '1px solid rgba(0, 188, 212, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0, 187, 212, 0.72)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2),
      borderRadius: theme.spacing(2),
    },
  }));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 4),
  fontWeight: 600,
  backgroundColor: '#00BCD4',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#00BCD4',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
  marginTop: theme.spacing(3),
  transition: 'all 0.3s ease',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 3),
    fontSize: '0.9rem',
  },
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '110px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    width: '90px',
    height: '80px',
    marginBottom: theme.spacing(2),
  },
}));

const ConnectSection = styled(Box)(({ theme }) => ({
  minHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  backgroundImage: 'url("/images/services/connection.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '70vh',
    padding: theme.spacing(2),
  },
}));

const ConnectCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  position:'relative',
  justifyContent: 'center',
  margin: '0 auto',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(5),
  backdropFilter: 'blur(10px)',
  alignItems: 'center',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  width: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
    width: '90%',
  },
}));

const ShimmerText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  color: '#00BCD4',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite',
    zIndex: 1,
    pointerEvents: 'none',
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '100% 50%',
      opacity: 0,
    },
    '30%': {
      opacity: 0.8,
    },
    '100%': {
      backgroundPosition: '-100% 50%',
      opacity: 0,
    },
  },
}));
  

const Services = () => {
  // Service panel data with animations and icons
  const servicePanels = [
    {
      title: "Marketplace",
      description: "See something you like or have something to sell? Connect with users and trade directly, hassle-free! Our marketplace brings buyers and sellers together in a secure environment.",
      image: "/images/services/maketPlace.png",
      animation: "/images/services/marketplace-animation.gif",
      //icon: "/images/services/marketplace-icon.png"
    },
    {
      title: "Payment (ESCROW)",
      description: "Protected payments with escrow system. Holding funds for buyers and sellers until transaction is complete. This ensures both parties are protected throughout the entire process.",
      image: "/images/services/payment.png",
      animation: "/images/services/payment-animation.gif",
      //icon: "/images/services/payment-icon.png"
    },
    {
      title: "Delivery",
      description: "Choose when and where you want to pick up or drop off your items with our scheduled deliveries. Our flexible delivery system ensures your items arrive safely and on time.",
      image: "/images/services/delivery.png",
      animation: "/images/services/cycle3.gif",
      //icon: "/images/services/delivery-icon.png"
    },
    {
      title: "Inspection",
      description: "Secure transactions with exterior inspection. Protecting buyers and ensuring quality, fraud-free products. Our inspection process verifies that what you see is what you get.",
      image: "/images/services/inception.png",
      animation: "/images/services/inception-animation.gif",
      //icon: "/images/services/inception-icon.png"
    },
    {
      title: "Product Review",
      description: "Drop a review to support fellow Rounders and keep it real! Help others make informed decisions. Our review system builds trust and transparency in our community.",
      image: "/images/services/review.png",
      animation: "/images/services/review-animation.gif",
      //icon: "/images/services/review-icon.png"
    },
    {
      title: "Our Community",
      description: "Come join us and be a part of our community! Connect with like-minded individuals and grow together. Our community is built on trust, respect, and shared interests.",
      image: "/images/services/community.png",
      animation: "/images/services/community-animation.gif",
      //icon: "/images/services/community-icon.png"
    }
  ];

  
// Add this new styled component for the scroll indicator
const ScrollIndicator = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '20px',
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Center horizontally
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    backgroundColor: 'rgba(0, 188, 212, 0.8)',
    borderRadius: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      bottom: '10px',
      padding: theme.spacing(0.5, 1.5),
    },
    [theme.breakpoints.down('md')]: {
        display: 'none', // Hide on mobile and tablet
      },

  }));
  
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
      {/* Add the motorcycle animation */}
      <MotorcycleAnimation
          initial={{ x: -900, y: 50 }}
          animate={{ 
            x: window.innerWidth,
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        >
          <Box 
            component="img" 
            src="/images/services/cycle3.gif" // You'll need to add this image
            alt="Motorcycle" 
            sx={{ 
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.3))',
            }} 
          />
        </MotorcycleAnimation>
      <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '800px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        <HeroCard>
        <AnimationContainer>
              <Box 
                component="img" 
                src="/images/services/image.png" 
                alt="Delivery Animation" 
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </AnimationContainer>
          <Box sx={{ mb: 2, height: { xs: '2.5rem', sm: '3.5rem' } }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5,
                ease: "easeOut" 
              }}
            >
              <ShimmerText 
                variant="h3" 
                fontWeight={700} 
                component="span"
                sx={{
                  animationDelay: `${0.5}s`,
                }}
              >
                <Typography 
                  variant="h2" 
                  fontWeight={700}
                  sx={{ 
                    fontSize: { xs: '2.5rem', sm: '3.75rem' } 
                  }}
                >
                  ROUND8
                </Typography>
              </ShimmerText> 
            </motion.div>
          </Box>
          
          {/* Animated "One Round to Another" text */}
          <Box sx={{ mb: 2, height: { xs: '2rem', sm: '3rem' } }}>
            <motion.div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px',
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}>
              {["One", "Round", "to", "Another"].map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + (i * 0.2),
                    ease: "easeOut" 
                  }}
                >
                  <ShimmerText 
                    variant="h3" 
                    fontWeight={700} 
                    component="span"
                    sx={{
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      fontWeight={700} 
                      component="span"
                      sx={{ 
                        fontSize: { xs: '1.8rem', sm: '3rem' } 
                      }}
                    >
                      {word}
                    </Typography>
                  </ShimmerText>  
                </motion.div>
              ))}
            </motion.div>
          </Box>
         
          {/* Animated tagline */}
          <Box sx={{ mb: 2, height: { xs: '2.5rem', sm: '3rem' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.7,
                ease: "easeOut" 
              }}
            >
              <Typography 
                variant="h4" 
                color="#00BCD4" 
                sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto',
                  fontSize: { xs: '1.2rem', sm: '2.125rem' }
                }}
              >
                Delivering real value to those who need it most.
              </Typography>
            </motion.div>
          </Box>
          
          {/* Animated button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 2.0,
              ease: "easeOut" 
            }}
          >
            <ActionButton variant="contained" size="large" component="a"
              href="https://round8-th.com/"
              target="_blank"
              rel="noopener noreferrer">
              <Box component="img" src="/images/services/round8.png" alt="Round8 Logo" sx={{ width: 24, height: 24, mr: 1 }} />
              Explore
            </ActionButton>
          </motion.div>
        </HeroCard>
        </motion.div>
        </Box>
      </HeroSection>

      {/* How It Works Section - Using the new ScrollSection component */}
      <Box sx={{ position: 'relative' }}>
        <ScrollSection 
          sections={servicePanels} 
          
        />
        
        {/* Add the scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 1, 0], y: [-20, 0, -20] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <ScrollIndicator>
            <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>
              Scroll
            </Typography>
            <KeyboardArrowDownIcon />
          </ScrollIndicator>
        </motion.div>
      </Box>

      {/* Connect With Us Section */}
      <ConnectSection>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ width: '100%' }}
        >
          <ConnectCard>
            <Typography variant="h3" fontWeight={700} sx={{ mb: 2, color: '#00BCD4' ,fontSize: { xs: '1.8rem', sm: '2.8rem' }}} >
              Let's Collaborate!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 , fontSize: { xs: '1.2rem', sm: '1.4rem' }}}>
              If you have any inquiry, feel free to contact us!
            </Typography>
            <ActionButton 
              variant="contained" 
              size="large"
              component="a"
              href="https://tally.so/r/3EAWj4" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box component="img" src="/images/services/round8.png" alt="Round8 Logo" sx={{ width: 24, height: 24, mr: 1 }} />
              Connect With Us
            </ActionButton>
          </ConnectCard>
        </motion.div>
      </ConnectSection>
    </PageContainer>
  );
};

export default Services;
