import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Drawer from './components/Drawer';
import About from './components/about';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectSDM from './components/ProjectSDM';
import Contact from './components/Contact';
import MobileNavigation from './components/MobileNavigation';
import { useCustomTheme } from './contexts/ThemeContext';

function App() {
  const [activeSection, setActiveSection] = React.useState('home');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDarkMode, toggleTheme } = useCustomTheme();

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* Mobile Header (profile + role + theme) */}
      {isMobile && (
        <AppBar position="fixed" color="default" elevation={1}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="/hs.jpg" alt="Shreyas hs" sx={{ width: 40, height: 40 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
                Shreyas hs
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Frontend Developer
              </Typography>
            </Box>
            <IconButton onClick={toggleTheme} aria-label="toggle theme" color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer (desktop only) */}
      {!isMobile && (
        <Drawer
          onSelect={(id) => scrollToSection(id)}
          activeSection={activeSection}
          profile={{ name: 'Shreyas hs', role: 'Frontend Developer', avatarUrl: '/hs.jpg' }}
          width={320}
          mobileOpen={false}
          onClose={() => {}}
          isMobile={false}
        />
      )}
      
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : '320px',
        paddingTop: isMobile ? 8 : 0,
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