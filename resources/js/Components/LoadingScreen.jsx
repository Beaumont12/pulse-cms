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
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      const token = localStorage.getItem('authToken');
      console.log('[DEBUG] LoadingScreen mounted. Token:', token);

      try {
        await Promise.all([
          preloadImage(logo),
          preloadImage(bgImage),
          new Promise((resolve) => setTimeout(resolve, 1000)), // Smooth UX
        ]);

        // Animate exit
        setTimeout(() => setShow(false), 2200);

        // Proceed to app
        setTimeout(() => {
          console.log('[DEBUG] Triggering onLoaded after assets loaded and animations done');
          onLoaded();
        }, 2600);

      } catch (error) {
        console.error('[ERROR] Failed to load assets:', error);
        setMessage('Error loading assets. Loading anyway...');
        setShowAlert(true);

        // Still allow app to load after delay
        setTimeout(() => {
          onLoaded();
        }, 3000);
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
        {/* 🔄 Loading Logo with Spinner */}
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

        {/* ⚠️ Error Message */}
        {showAlert && (
          <Alert
            severity="error"
            sx={{
              position: 'absolute',
              bottom: 20,
              zIndex: 999,
              backgroundColor: '#FFF5F5',
              color: '#8E0000',
              border: '1px solid #C12923',
            }}
          >
            {message}
          </Alert>
        )}
      </Box>
    </Fade>
  );
}
