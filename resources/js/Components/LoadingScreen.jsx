import { useEffect, useState } from 'react';
import { Box, CircularProgress, Fade, Alert } from '@mui/material';
import logo from '../assets/logo.svg';
import bgImage from '../assets/bg.webp';

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}

export default function LoadingScreen({ onLoaded }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      const token = localStorage.getItem('authToken');
      console.log('[DEBUG] LoadingScreen mounted. Token:', token);

      try {
        // Wait for image assets to be loaded
        await Promise.all([
          preloadImage(logo),
          preloadImage(bgImage),
          new Promise((resolve) => setTimeout(resolve, 1000)), // Add delay for UX smoothness
        ]);

        setTimeout(() => setShow(false), 2200);
        setTimeout(() => {
          console.log('[DEBUG] Triggering onLoaded after assets loaded and animations done');
          onLoaded();
        }, 2600);

      } catch (error) {
        console.error('[ERROR] Failed to load assets:', error);
        setMessage('Error loading assets. Please refresh.');
        setShowAlert(true);
      }
    };

    loadAssets();
  }, [onLoaded]);

  return (
    <Fade in={show} timeout={600} appear unmountOnExit>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: 'relative', width: 200, height: 200, zIndex: 2 }}>
          <CircularProgress
            size={200}
            thickness={2}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#450001',
              animationDuration: '1.4s',
            }}
          />
          <img
            src={logo}
            alt="Pulse Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
}
