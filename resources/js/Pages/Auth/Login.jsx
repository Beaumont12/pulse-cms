/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, TextField, Typography, CircularProgress, Fade, Paper, Alert
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import bgImage from '../../assets/bg.webp';
import mascot from '../../assets/doctorcoby.svg';
import { keyframes } from '@emotion/react';
import quips from '../../assets/coby_quips.json';
import themeSong from '../../assets/Music/PokemonTheme.mp3';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const audioRef = useRef(null);

  const navigate = useNavigate();

  const idleFloat = keyframes`
    0%, 100% {
      transform: translateY(15%) translateX(18vw);
    }
    50% {
      transform: translateY(22%) translateX(18vw);
    }
  `;

  const bubblePop = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `;

  const dialogTexts = Array.isArray(quips) && quips.length > 0 ? quips : [
    "Welcome back doctor! Let’s log in and heal some patients."
  ];

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // optional: lower volume
        audioRef.current.play().catch((err) => {
          console.warn('[DEBUG] Audio play failed:', err);
        });
      }
      window.removeEventListener('click', playAudio); // only play once
    };
  
    window.addEventListener('click', playAudio);
  
    return () => window.removeEventListener('click', playAudio);
  }, []);  

  useEffect(() => {
    const currentText = dialogTexts[currentDialogIndex];
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;

    const textInterval = setInterval(() => {
      setDisplayedText(currentText.slice(0, i + 1));
      i++;
      if (i === currentText.length) {
        clearInterval(textInterval);
        setIsTyping(false);
      }
    }, 40);

    return () => clearInterval(textInterval);
  }, [currentDialogIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const fadeOutAudio = () => {
    if (!audioRef.current) return;
  
    let volume = audioRef.current.volume;
    const fadeInterval = setInterval(() => {
      if (volume > 0.01) {
        volume -= 0.02;
        audioRef.current.volume = volume;
      } else {
        clearInterval(fadeInterval);
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // reset to beginning if needed
      }
    }, 60); // smoother fade over ~3 seconds
  };  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('[DEBUG] Attempting sign-in with:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      console.log('[DEBUG] Sign-in successful. UID:', uid);

      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      console.log('[DEBUG] Token stored in localStorage:', token);

      const roleRef = ref(db, `users/${uid}/role`);
      const roleSnap = await get(roleRef);
      console.log('[DEBUG] Role snapshot exists:', roleSnap.exists());
      console.log('[DEBUG] Role snapshot value:', roleSnap.val());

      const role = roleSnap.exists() ? roleSnap.val() : null;

      switch (role) {
        case 'super_admin':
          setSuccess('Login successful! Redirecting...');
          fadeOutAudio();
          setTimeout(() => {
            setSuccess('');
            navigate('/superadmin/dashboard');
          }, 2000);
          break;
        case 'admin':
          setSuccess('Login successful! Redirecting...');
          fadeOutAudio();
          setTimeout(() => {
            setSuccess('');
            navigate('/admin/dashboard');
          }, 2000);
          break;
        case 'teacher':
          setSuccess('Login successful! Redirecting...');
          fadeOutAudio();
          setTimeout(() => {
            setSuccess('');
            navigate('/teacher/dashboard');
          }, 2000);
          break;
        case 'student':
          setSuccess('Login successful! Redirecting...');
          fadeOutAudio();
          setTimeout(() => {
            setSuccess('');
            navigate('/student/game');
          }, 2000);
          break;
        default:
          setError('No role assigned. Please contact admin.');
          setDisplayedText("Hmm... I couldn't detect your role. You might want to page IT for this one!");
          console.warn('[DEBUG] No role found for user:', uid);
      }      
    } catch (err) {
      console.error('[DEBUG] Login error:', err);
      const errorCode = err.code;
      const errorMessage = err.message;
      let friendlyMessage = '';

      switch (errorCode) {
        case 'auth/invalid-email':
          friendlyMessage = "Invalid email format. Double-check that address, doc!";
          break;
        case 'auth/user-not-found':
          friendlyMessage = "I couldn’t find you in the system. Are you registered, doctor?";
          break;
        case 'auth/wrong-password':
          friendlyMessage = "Wrong password! Let’s scrub in again with the correct credentials.";
          break;
        case 'auth/too-many-requests':
          friendlyMessage = "Too many attempts! Let’s take a break and try again later.";
          break;
        default:
          friendlyMessage = `Login failed. Something went wrong during diagnosis. (${errorCode || 'unknown error'})`;
      }

      setError(friendlyMessage);
      setDisplayedText(friendlyMessage);
      console.warn('[DEBUG] Firebase error code:', errorCode);
      console.warn('[DEBUG] Firebase error message:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <audio ref={audioRef} src={themeSong} loop hidden />

    {success && (
      <Fade in={Boolean(success)}>
        <Alert
          severity="success"
          sx={{
            position: 'fixed',
            top: { xs: 20, md: 32 },
            right: { xs: 20, md: 40 },
            zIndex: 9999,
            bgcolor: '#FAFAFF',
            color: '#450001',
            border: '1px solid #660200',
            px: 3,
            py: 1.5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            borderRadius: 2,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {success}
        </Alert>
      </Fade>
    )}
    <Fade in={fadeIn} timeout={600}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          width: '100vw',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          overflow: 'hidden',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1400px',
          }}
        >
          {/* Coby + Dialog */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-end' },
              overflow: 'visible',
              width: '100%',
              maxHeight: '100vh',
              position: 'relative',
              mb: { xs: 2, md: 0 },
            }}
          >
            {/* Speech Bubble */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '20px', sm: '40px', md: 'auto' },
                bottom: { xs: 'auto', md: '230px' },
                left: { xs: '50%', md: 'calc(50% - 160px)' },
                transform: { xs: 'translateX(-50%)', md: 'none' },
                bgcolor: '#FAFAFF',
                px: { xs: 1.5, sm: 2, md: 3 },
                py: { xs: 0.5, sm: 1.5, md: 2 },
                borderRadius: '12px',
                boxShadow: '4px 4px 0 #450001',
                width: { xs: '60%', sm: 'auto' },
                maxWidth: { xs: 160, sm: 400, md: 420 },
                color: '#450001',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                lineHeight: 1.5,
                zIndex: 3,
                animation: `${bubblePop} 0.6s ease-out forwards`,
                border: '2px solid #660200',
                fontFamily: 'monospace',
                backgroundImage: 'repeating-linear-gradient(45deg, #FAFAFF, #FAFAFF 10px, #fff 10px, #fff 20px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: { xs: '100%', md: '50%' },
                  left: { xs: '50%', md: 'auto' },
                  right: { xs: 'auto', md: '-20px' },
                  transform: { xs: 'translateX(-50%)', md: 'translateY(-50%)' },
                  borderLeft: { xs: '10px solid transparent', md: 'none' },
                  borderRight: { xs: '10px solid transparent', md: 'none' },
                  borderTop: { xs: '10px solid #660200', md: 'none' },
                  borderBottom: { xs: 'none', md: '10px solid transparent' },
                  borderTopColor: { xs: '#660200', md: 'transparent' },
                  borderLeftColor: { md: '#660200' },
                  zIndex: 1,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: { xs: '100%', md: '50%' },
                  left: { xs: '50%', md: 'auto' },
                  right: { xs: 'auto', md: '-18px' },
                  transform: { xs: 'translateX(-50%)', md: 'translateY(-50%)' },
                  borderLeft: { xs: '8px solid transparent', md: 'none' },
                  borderRight: { xs: '8px solid transparent', md: 'none' },
                  borderTop: { xs: '8px solid #FAFAFF', md: 'none' },
                  borderBottom: { xs: 'none', md: '8px solid transparent' },
                  borderTopColor: { xs: '#FAFAFF', md: 'transparent' },
                  borderLeftColor: { md: '#FAFAFF' },
                  zIndex: 2,
                },
              }}
            >
              {displayedText}
              <Box
                component="button"
                onClick={() => {
                  if (!isTyping) {
                    let nextIndex;
                    do {
                      nextIndex = Math.floor(Math.random() * dialogTexts.length);
                    } while (nextIndex === currentDialogIndex);
                    setCurrentDialogIndex(nextIndex);
                    setIsTyping(true);
                  }
                }}
                sx={{
                  mt: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#660200',
                  fontSize: '0.75rem',
                  cursor: isTyping ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  opacity: isTyping ? 0.3 : 1,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                →
              </Box>
            </Box>

            <img
              src={mascot}
              alt="Doctor Coby"
              css={{
                height: 'auto',
                maxHeight: '100vh',
                objectFit: 'contain',
                animation: `${idleFloat} 3.5s ease-in-out infinite`,
                marginLeft: 0,
                '@media (max-width: 640px)': {
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto',
                  display: 'block',
                },
                '@media (min-width: 641px) and (max-width: 1024px)': {
                  width: '110%',
                  marginLeft: '8vw',
                },
                '@media (min-width: 1025px) and (max-width: 1440px)': {
                  width: '130%',
                  marginLeft: '5vw',
                },
                '@media (min-width: 1441px)': {
                  width: '150%',
                  marginLeft: '-100px',
                },
              }}
            />
          </Box>

          {/* Login Form */}
          <Paper
            elevation={6}
            sx={{
              flex: 1,
              width: '100%',
              maxWidth: { xs: '95%', sm: 500, md: 600, lg: 650, xl: 700 },
              p: { xs: 2, sm: 3, md: 4, lg: 5 },
              borderRadius: 6,
              bgcolor: '#FAFAFF',
              zIndex: 3,
              mt: { xs: -6, sm: -4, md: 0 },
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              mx: 'auto'
            }}
          >
            <Box mb={3} display="flex" justifyContent="center">
              <img src={logo} alt="Pulse Logo" style={{ width: 120 }} />
            </Box>

            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              mb={2}
              color="#450001"
              sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' } }}
            >
              PULSE: A Medical Odyssey
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  input: { color: '#450001' },
                  '& .MuiInputLabel-root': {
                    color: '#660200',
                    fontWeight: 600,
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  input: { color: '#450001' },
                  '& .MuiInputLabel-root': {
                    color: '#660200',
                    fontWeight: 600,
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  fontSize: '0.95rem',
                  bgcolor: '#450001',
                  '&:hover': { bgcolor: '#660200' }
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'LOG IN'}
              </Button>
            </form>

            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              mt={3}
              color="#666"
              fontStyle="italic"
            >
              Only authorized users may access the system.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Fade>
    </>
  );
}
