import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from './components/Drawer';
import About from './components/about';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectSDM from './components/ProjectSDM';
import Contact from './components/Contact';
import MobileNavigation from './components/MobileNavigation';

function App() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile drawer after navigation
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(`[data-section="${sections[i]}"]`);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" style={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ p: 1, color: '#ffffff' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Mobile Backdrop */}
      {isMobile && mobileOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1100,
          }}
          onClick={handleDrawerToggle}
        />
      )}

      {/* Drawer */}
      <Drawer
        onSelect={(id) => scrollToSection(id)}
        activeSection={activeSection}
        profile={{ name: 'Shreyas hs', role: 'Frontend Developer', avatarUrl: '/hs.jpg' }}
        width={320}
        mobileOpen={mobileOpen}
        onClose={handleDrawerToggle}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : '320px',
        paddingTop: isMobile ? 10 : 0,
        paddingBottom: isMobile ? 14 : 0,
        px: { xs: 0, sm: 0 },
        bgcolor: 'background.default',
        minHeight: '100vh',
        width: '100%'
      }}>
        {/* Home Section */}
        <div data-section="home">
          <Home />
        </div>

        {/* About Section */}
        <div data-section="about">
          <About
            name="Shreyas hs"
            role="Frontend Developer"
            onContact={() => scrollToSection('contact')}
            onDownloadResume={() => console.log('Download resume clicked')}
          />
        </div>

        {/* Projects Section */}
        <div data-section="projects">
          <Projects />
          <ProjectSDM />
        </div>

        {/* Contact Section */}
        <div data-section="contact">
          <Contact
            onPhone={() => (window.location.href = 'tel:+91 6363894617')}
            onEmail={() => (window.location.href = 'mailto:Shreyasshsgowda2@gmail.com')}
            onLinkedIn={() => window.open('https://www.linkedin.com/in/Shreyas hs-p-2247aa374', '_blank', 'noopener,noreferrer')}
          />
        </div>
      </Box>
      {isMobile && (
        <MobileNavigation
          activeSection={activeSection}
          onSelect={(id) => scrollToSection(id)}
        />
      )}
    </div>
  );
}

export default App;