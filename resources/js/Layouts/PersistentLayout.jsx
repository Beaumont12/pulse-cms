import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './../Components/Sidebar';
import AppRoutes from './../routes';
import logo from './../assets/logo.svg';

const SIDEBAR_WIDTH_EXPANDED = 300;
const SIDEBAR_WIDTH_COLLAPSED = 80;

export default function PersistentLayout() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {/* ✅ Fixed Top AppBar */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: '#FAFAFF',
          color: '#450001',
          px: 2,
          py: 1,
          borderBottom: '1px solid #E0E0E0',
          zIndex: 1300,
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => setExpanded(prev => !prev)} sx={{ color: '#450001' }}>
              <MenuIcon />
            </IconButton>
            <Box component="img" src={logo} alt="Pulse Logo" sx={{ height: 40 }} />
            {!isMobile && (
              <Typography variant="h6" fontWeight="bold" ml={1}>
                Pulse
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Sidebar + Main Content wrapper */}
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar placed after AppBar, no need for top offset */}
        <Box sx={{ mt: '64px', position: 'fixed', top: 0, zIndex: 1200 }}>
          <Sidebar expanded={expanded} onToggle={() => setExpanded(prev => !prev)} />
        </Box>

        {/* Main content shifts based on sidebar width */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: '64px', // same height as AppBar
            ml: {
              xs: 0,
              md: expanded ? `${SIDEBAR_WIDTH_EXPANDED}px` : `${SIDEBAR_WIDTH_COLLAPSED}px`,
            },
            transition: 'margin 0.3s ease-in-out',
            backgroundColor: '#F9F9FC',
            width: '100%',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <AnimatePresence mode="wait">
            <AppRoutes location={location} key={location.pathname} />
          </AnimatePresence>
        </Box>
      </Box>
    </>
  );
}
