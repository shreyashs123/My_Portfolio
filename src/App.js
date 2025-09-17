import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import Drawer from './components/Drawer';
import About from './components/about';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectSDM from './components/ProjectSDM';
import Contact from './components/Contact';
import MobileNavigation from './components/MobileNavigation';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCustomTheme } from './contexts/ThemeContext';

function App() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [isAvatarOpen, setIsAvatarOpen] = React.useState(false);
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
            <Avatar 
              src="/shreyas1.jpg" 
              alt="Shreyas hs" 
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              onClick={() => setIsAvatarOpen(true)}
            />
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
          profile={{ name: 'Shreyas hs', role: 'Frontend Developer', avatarUrl: '/shreyas1.jpg' }}
          width={320}
          mobileOpen={false}
          onClose={() => {}}
          onAvatarClick={() => setIsAvatarOpen(true)}
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
            onLinkedIn={() => window.open('https://www.linkedin.com/in/shreyas-h-s-gowda-418025380/', '_blank', 'noopener,noreferrer')}
          />
        </div>
        {isMobile && (
          <Box sx={{
            mt: 2,
            borderTop: 1,
            borderColor: 'divider',
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Shreyas hs
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="inherit" component="a" href="https://github.com/shreyashs123" target="_blank" rel="noopener noreferrer" aria-label="github">
                <GitHubIcon />
              </IconButton>
              <IconButton size="small" color="inherit" component="a" href="https://www.linkedin.com/in/shreyas-h-s-gowda-418025380/" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
              <IconButton size="small" color="inherit" component="a" href="mailto:shreyashsgowda2@gmail.com" aria-label="email">
                <MailOutlineIcon />
              </IconButton>
              <IconButton size="small" color="inherit" component="a" href="https://wa.me/6363894617" target="_blank" rel="noopener noreferrer" aria-label="whatsapp">
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
      {isMobile && (
        <MobileNavigation
          activeSection={activeSection}
          onSelect={(id) => scrollToSection(id)}
        />
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        fullScreen={isMobile}
        aria-labelledby="avatar-preview"
      >
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <IconButton aria-label="close" onClick={() => setIsAvatarOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: isMobile ? '100vh' : '80vh' }}>
            <Box
              component="img"
              src="/shreyas1.jpg"
              alt="Shreyas hs"
              sx={{ maxWidth: '95vw', maxHeight: isMobile ? '95vh' : '78vh', objectFit: 'contain' }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;